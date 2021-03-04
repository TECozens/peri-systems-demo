import AuthService from "../../services/auth.service";
import React, {useEffect, useState} from "react";
import {useAsync} from 'react-async';
import UserService from "../../services/users.service";
import {Box, Container, Flex, Grid, GridItem, VStack} from "@chakra-ui/layout";
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
} from "@chakra-ui/react"
import './Register.scss'
import PageSection from "./UserCount/PageSection";
import UserTable from "./UserTable/UserTable";
import {InputGroup, InputRightElement} from "@chakra-ui/input";
import {SearchIcon} from "@chakra-ui/icons";
import {useDisclosure} from "@chakra-ui/hooks";
import {FormControl, FormLabel} from "@chakra-ui/form-control";

const getData = ({props}) => UserService.example(props.userSearch, props.page)

const Register = props => {
    const [userSearch, setUserSearch] = useState('')
    const showUserCount = useBreakpointValue({base: false, 'md': true})
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(2)
    const [searchParams, setSearchParams] = useState({page, userSearch})
    const [onLastPage, setOnLastPage] = useState(false)
    const [values, setValues]
        = useState({firstname: '', lastname: '', email: ''})
    const {data, error, isLoading}
        = useAsync({
        promiseFn: getData, watch: searchParams, props: {userSearch, page}
    })
    const [users, setUsers] = useState([])
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure()

    const createUser = () => {
        onClose()
        let user = {...values}
        console.log(user)
        user.roles = []
        user.password = 'passwordDefault'
        AuthService.register(user.firstname, user.lastname, user.email, user.password, [])
    }

    const updateUser = async (email, newUserValues) => {
        const res = await AuthService.updateUser(
            email,
            newUserValues.firstname,
            newUserValues.lastname,
            newUserValues.email)
        console.log("update res: ", res)
        console.log(email, newUserValues)
    }

    const deleteUser = async (email) => {
        const res = await AuthService.deleteUser(email)
        if (res.status === 200) {
            setUsers(users.filter(user => user.email !== email))
        }
    }

    useEffect(() => {
        console.log(data)
        if (data) {
            setUsers(data.data)
        }
    }, [data])

    useEffect(() => setSearchParams({page, userSearch}), [page, userSearch])

    useEffect(() => setPage(1), [userSearch])

    const handleUserInputChange = (event) => {
        setUserSearch(event.target.value)
    }

    const handleChange = ({target}) => {
        setValues({...values, [target.name]: target.value})
    }
    // if (isLoading) return "Loading..."
    // if (error) return `Something went wrong: ${error.message}`
    // if (data)
    return (
        <Container maxW="3xl" marginTop={12} marginBottom={12}>
            <Flex direction='column'>

                <Box mb={2}>
                    <Flex>
                        <InputGroup>
                            <Input autoFocus={true} value={userSearch} onChange={handleUserInputChange}
                                   placeholder='Search users by name or email'
                                   bg={'white'}/>
                            <InputRightElement children={<SearchIcon/>}/>
                        </InputGroup>
                    </Flex>
                </Box>

                {/*<Divider mt={4} mb={2} />*/}
                {/*gap={4} templateColumns="repeat(7, 1fr)"*/}
                <Grid templateColumns={showUserCount ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)'} gap={4}>
                    {showUserCount ?

                        <GridItem colSpan={1} mt={6}>
                            <VStack spacing={4}>
                                <Button colorScheme='yellow' onClick={onOpen}>
                                    Create User
                                </Button>
                                <PageSection onLastPage={onLastPage} isLoading={isLoading} page={page}
                                             setPage={setPage}
                                             maxPage={maxPage}/>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay/>
                                    <ModalContent>
                                        <ModalHeader>Edit user profile</ModalHeader>
                                        <ModalBody p={6}>
                                            <FormControl>
                                                <FormLabel>First Name</FormLabel>
                                                <Input value={values.firstname} onChange={handleChange}
                                                       name='firstname'
                                                       placeholder='First Name'/>
                                            </FormControl>
                                            <FormControl mt={4}>
                                                <FormLabel>Last name</FormLabel>
                                                <Input value={values.lastname} onChange={handleChange}
                                                       name='lastname'
                                                       placeholder="Last name"/>
                                            </FormControl>
                                            <FormControl mt={4}>
                                                <FormLabel>Email</FormLabel>
                                                <Input value={values.email} onChange={handleChange} name='email'
                                                       placeholder="Email"/>
                                            </FormControl>
                                            {/*<FormControl mt={4}>*/}
                                            {/*  <FormLabel>Password</FormLabel>*/}
                                            {/*  <Input name='password' value={values.password} onChange={handleChange} placeholder="Password" />*/}
                                            {/*</FormControl>*/}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="yellow" mr={3} onClick={createUser}>
                                                Create
                                            </Button>
                                            <Button onClick={onClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>

                            </VStack>
                        </GridItem>
                        :
                        <></>
                    }
                    <GridItem colSpan={5}>
                        <UserTable updateUser={updateUser} deleteUser={deleteUser} isLoading={isLoading} users={users}/>
                    </GridItem>
                </Grid>
            </Flex>
        </Container>
    )
}

export default Register;