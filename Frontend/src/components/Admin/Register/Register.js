import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    HStack
} from "@chakra-ui/layout";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useBreakpointValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-async";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/users.service";
import { SeparatedHeading } from "../../Util/SeparatedHeading/SeparatedHeading";
import "./Register.scss";
import PageSection from "./UserCount/PageSection";
import UserTable from "./UserTable/UserTable";

const getData = ({ props }) => {
    return UserService.getUsers(props.userSearch, props.page);
}

const Register = () => {
    const [userSearch, setUserSearch] = useState("");
    const [maxPage, setMaxPage] = useState();
    const [page, setPage] = useState(1);
    const [onLastPage, setOnLastPage] = useState(false);
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });
    const [searchParams, setSearchParams] = useState({ page, userSearch });
    const [users, setUsers] = useState([]);

    const showUserCount = useBreakpointValue({ base: false, md: true });
    const { data, error, isLoading } = useAsync({
        promiseFn: getData,
        watch: searchParams,
        props: { userSearch, page },
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const createUser = async () => {
        onClose();
        let user = { ...values, roles: [], password: "passwordDefault" };
        const res = await AuthService.register(
            user.firstname,
            user.lastname,
            user.email,
            user.password,
            []
        );
        if (res.status === 200) {
            setPage(1);
            setUserSearch(user.firstname)
        }
    };

    const updateUser = async (email, newUserValues) => {
        const res = await AuthService.updateUser(
            email,
            newUserValues.firstname,
            newUserValues.lastname,
            newUserValues.email
        );
        if (res.status === 200) {
            setUsers(
                users.map((user) => {
                    if (user.email === email) {
                        user.firstname = newUserValues.firstname;
                        user.lastname = newUserValues.lastname;
                        user.email = newUserValues.email;
                    }
                    return user;
                })
            );
            setUserSearch(newUserValues.firstname)
        }
    };

    const deleteUser = async (email) => {
        const res = await AuthService.deleteUser(email);
        if (res.status === 200) {
            await setUsers(users.filter((user) => user.email !== email));
        }
    };

    useEffect(() => {
        if (users.length <= 0 && page !== 1) {
            setPage(1);
        }
    }, [users]);

    useEffect(() => {
        if (data) {
            setUsers(data.data);
            if (data.maxPages) {
                setMaxPage(data.maxPages);
            }
        }
    }, [data]);

    useEffect(() => setSearchParams({ page, userSearch }), [page, userSearch]);

    useEffect(() => setPage(1), [userSearch]);

    // Handlers
    const handleUserInputChange = (event) => {
        setUserSearch(event.target.value);
    };

    const handleChange = ({ target }) => {
        setValues({ ...values, [target.name]: target.value });
    };

    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <SeparatedHeading primary='Users' secondary='Manage Employees' />
            <Flex direction="column">
                <Box mb={2}>
                    <HStack>
                        <Button colorScheme="yellow" onClick={onOpen}>
                            Create User
                        </Button>
                        <InputGroup>
                            <InputLeftElement children={<SearchIcon />} />
                            <Input
                                autoFocus={true}
                                value={userSearch}
                                onChange={handleUserInputChange}
                                placeholder="Search users by name or email"
                                bg={"white"}
                            />
                        </InputGroup>
                    </HStack>
                </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Edit user profile
                                        </ModalHeader>
                        <ModalBody p={6}>
                            <FormControl>
                                <FormLabel>
                                    First Name
                                                </FormLabel>
                                <Input
                                    value={values.firstname}
                                    onChange={handleChange}
                                    name="firstname"
                                    placeholder="First Name"
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Last name</FormLabel>
                                <Input
                                    value={values.lastname}
                                    onChange={handleChange}
                                    name="lastname"
                                    placeholder="Last name"
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="Email"
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="yellow"
                                mr={3}
                                onClick={createUser}
                            >
                                Create
                            </Button>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <UserTable
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                    isLoading={isLoading}
                    users={users}
                />
                {users.length > 0 ?
                    <PageSection
                        variant='simple'
                        onLastPage={onLastPage}
                        isLoading={isLoading}
                        page={page}
                        setPage={setPage}
                        maxPage={maxPage}
                    /> :
                    <></>
                }
            </Flex>
        </Container>
    );
};

export default Register;
