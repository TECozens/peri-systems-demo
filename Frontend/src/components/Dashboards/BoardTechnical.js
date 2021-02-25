import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Spacer,
} from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/layout";
import ProjectService from "../../services/project.service";
import AuthService from "../../services/auth.service";
import { Search2Icon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AssignEngineers from "./AssigingEngineers/AssignEngineers";
import ProjectView from "../Project/ProjectView";
import UpdateStatus from "./UpdateStatus";
import UserService from "../../services/users.service";

const BoardTechnical = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let unfilteredProjects = useRef();
    const [projects, setProjects] = useState([]);
    let filters = useRef({});
    let statusOptions = useRef();
    let count = 0;
    const designersNameAndId = useRef({});

    const getProjectsSetStatusOptionsAndFilterIfNeeded = useCallback(() => {
        ProjectService.getTechnicalProjects(authenticatedUser.id).then(
            (projects) => {
                unfilteredProjects.current = projects;
                getUniqueStatusFromProjects();
                getDesignersNameAndId().then(() => {
                    setProjects(projects);
                    if (Object.keys(filters.current).length > 0) {
                        filterProjects();
                    }
                });
            }
        );
    }, [authenticatedUser.id, designersNameAndId]);

    useEffect(() => {
        getProjectsSetStatusOptionsAndFilterIfNeeded();
    }, [getProjectsSetStatusOptionsAndFilterIfNeeded]);

    function displayProjects() {
        if (
            projects.length >= 1 &&
            Object.keys(designersNameAndId.current).length > 0
        ) {
            return projects.map((data) => (
                <Tr key={data.name}>
                    <Td>{data.number}</Td>
                    <Td>{data.name}</Td>
                    <Td>{data.client}</Td>
                    <Td>{new Date(data.date_required).toLocaleDateString()}</Td>
                    <Td>
                        {designersNameAndId.current[data.engineers.designer_id]}
                    </Td>
                    <Td>
                        {
                            designersNameAndId.current[
                                data.engineers.design_checker_id
                            ]
                        }
                    </Td>
                    <Td>{data.status[data.status.length - 1].value}</Td>
                    <Td isNumeric>
                        <UpdateStatus
                            count={count}
                            projectStatus={
                                data.status[data.status.length - 1].value
                            }
                            projectId={data._id}
                            updateParent={
                                getProjectsSetStatusOptionsAndFilterIfNeeded
                            }
                        >
                            <Button width="full" colorScheme={"green"}>
                                Update Status
                            </Button>
                        </UpdateStatus>
                        <AssignEngineers
                            updateParent={
                                getProjectsSetStatusOptionsAndFilterIfNeeded
                            }
                            project={data}
                        />
                        <ProjectView project={data} />
                    </Td>
                </Tr>
            ));
        } else {
            return (
                <Tr>
                    <Th />
                    <Th />
                    <Th />
                    <Th> No projects</Th>
                    <Th />
                    <Th />
                    <Th />
                    <Th />
                </Tr>
            );
        }
    }

    async function getDesignersNameAndId() {
        return Promise.all(
            unfilteredProjects.current.map(async (project) => {
                let designEngineerId = project.engineers.designer_id;
                let designCheckerId = project.engineers.design_checker_id;
                await UserService.getUserByID(designEngineerId)
                    .then((user) => {
                        designersNameAndId.current[designEngineerId] =
                            user.firstname + " " + user.lastname;
                    })
                    .then(
                        await UserService.getUserByID(designCheckerId).then(
                            (user) => {
                                designersNameAndId.current[designCheckerId] =
                                    user.firstname + " " + user.lastname;
                            }
                        )
                    );
            })
        );
    }

    //Filter
    function filterProjects() {
        let displayedProjects = unfilteredProjects.current;

        for (const [key, value] of Object.entries(filters.current)) {
            if (key === "name") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.name.toLowerCase().includes(value.toLowerCase())
                );
            }
            if (key === "number") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.number.includes(value)
                );
            }
            if (key === "client") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.client.toLowerCase().includes(value.toLowerCase())
                );
            }
            if (key === "from_date") {
                displayedProjects = displayedProjects.filter(
                    (project) =>
                        Date.parse(project.date_required) >= Date.parse(value)
                );
            }
            if (key === "to_date") {
                displayedProjects = displayedProjects.filter(
                    (project) =>
                        Date.parse(project.date_required) <= Date.parse(value)
                );
            }
            if (key === "status") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.status[project.status.length - 1].value
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            }
        }

        setProjects(displayedProjects);
    }

    function handleChange(event) {
        let inputChanged = event.target.name;
        let value = event.target.value;

        if (inputChanged === "project_name") {
            filters.current.name = value;
        } else if (inputChanged === "project_number") {
            filters.current.number = value;
        } else if (inputChanged === "project_client") {
            filters.current.client = value;
        } else if (inputChanged === "project_status") {
            filters.current.status = value;
        }

        filterProjects();
    }

    function handleDate(event) {
        if (this.name === "from_date") {
            filters.current.from_date = new Date(event);
        }
        if (this.name === "to_date") {
            filters.current.to_date = new Date(event);
        }

        filterProjects();
    }

    function handleKeyPress(event) {
        // checking if the key pressed is a letter and if so it prevents the
        // letter from being typed in
        let key = event.keyCode || event.which;
        key = String.fromCharCode(key);

        let regex = /[0-9]|\./;
        if (!regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    }

    function clearFilters() {
        //resetting filter values
        filters.current.name = "";
        filters.current.number = "";
        filters.current.client = "";
        filters.current.from_date = "";
        filters.current.to_date = "";
        filters.current.status = "";

        setProjects(unfilteredProjects.current);
    }

    function getUniqueStatusFromProjects() {
        statusOptions.current = unfilteredProjects.current
            .map((project) => project.status[project.status.length - 1].value)
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    function createSelectionOptions() {
        if (statusOptions.current !== undefined) {
            return statusOptions.current.map((aStatus) => (
                <option key={count++} value={aStatus}>
                    {aStatus}
                </option>
            ));
        }
    }

    return (
        <div>
            <Box m="10px">
                <Heading>Welcome back {authenticatedUser.firstname}!</Heading>
            </Box>
            <HStack m="10px">
                <InputGroup size="sm" w="50%">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_number"
                        value={filters.current.number}
                        placeholder="Number"
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                    />
                </InputGroup>
                <InputGroup size="sm" w="90%">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_name"
                        onChange={handleChange}
                        placeholder="Project Name"
                        value={filters.current.name}
                    />
                </InputGroup>
                <InputGroup size="sm" w="90%">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_client"
                        value={filters.current.client}
                        onChange={handleChange}
                        placeholder="Client"
                    />
                </InputGroup>

                <InputGroup size="sm" w={"210%"}>
                    <Text color={"brand.accents"}> Date Required from </Text>
                    <Spacer />
                    <DatePicker
                        name="from_date"
                        placeholderText="choose a date"
                        selected={filters.current.from_date}
                        onSelect={handleDate}
                        dateFormat={"dd/MM/yyyy"}
                    />
                    <Text color={"brand.accents"}> to </Text>
                    <Spacer />
                    <DatePicker
                        name="to_date"
                        placeholderText="choose a date"
                        selected={filters.current.to_date}
                        onSelect={handleDate}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </InputGroup>

                <Select
                    w="70%"
                    size="sm"
                    placeholder="Select a status"
                    name="project_status"
                    onChange={handleChange}
                    value={filters.current.status}
                >
                    {createSelectionOptions()}
                </Select>
                <Button
                    size="sm"
                    w="20%"
                    colorScheme="red"
                    onClick={clearFilters}
                >
                    Clear All
                </Button>
            </HStack>
            <Box m="10px">
                <Table
                    variant="simple"
                    size="md"
                    borderWidth="2px"
                    borderColor="#463E39"
                    borderRadius="mg"
                    bg="brand.background"
                >
                    <Thead bg="brand.tertiary">
                        <Tr color="#463E39">
                            <Th>
                                <Text fontSize="lg">Number </Text>
                            </Th>
                            <Th w="17%">
                                <Text fontSize="lg">Name </Text>
                            </Th>
                            <Th w="17%">
                                <Text fontSize="lg">Client</Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Date Required</Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Design Engineer</Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Design Checker</Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Status</Text>
                            </Th>
                            <Th />
                        </Tr>
                    </Thead>
                    <Tbody>{displayProjects()}</Tbody>
                </Table>
            </Box>
        </div>
    );
};

export default BoardTechnical;
//TODO refactor code
