import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box, Button, Heading, HStack, Input, InputGroup, InputLeftElement, Select,} from "@chakra-ui/react";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";
import {Text} from "@chakra-ui/layout";
import ProjectService from "../../services/project.service";
import AuthService from "../../services/auth.service";
import {Search2Icon} from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UpdateStatus from "./UpdateStatus";
import ProjectView from "../Project/ProjectView"

const BoardDesigner = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let unfilteredProjects = useRef();
    const [projects, setProjects] = useState([]);
    let filters = useRef({});
    let statusOptions = useRef();
    let count = 0;

    const getProjectsSetStatusOptionsAndFilterIfNeeded = useCallback(() => {
        ProjectService.getDesignerProjects(authenticatedUser.id).then(
            (projects) => {
                unfilteredProjects.current = projects;
                getUniqueStatusFromProjects();
                setProjects(unfilteredProjects.current);
                if (Object.keys(filters.current).length > 0) {
                    filterProjects();
                }
            }
        );
    }, [authenticatedUser.id]);

    useEffect(() => {
        getProjectsSetStatusOptionsAndFilterIfNeeded();
    }, [getProjectsSetStatusOptionsAndFilterIfNeeded]);

    function displayProjects() {
        if (projects.length >= 1) {
            return projects.map((data) => (
                <Tr key={data.name}>
                    <Td>{data.number}</Td>
                    <Td>{data.name}</Td>
                    <Td>{data.client}</Td>
                    <Td>{new Date(data.date_required).toLocaleDateString()}</Td>
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
                        <ProjectView project={data}/>
                    </Td>
                </Tr>
            ));
        } else {
            return (
                <Tr>
                    <Th/>
                    <Th/>
                    <Th> No projects</Th>
                    <Th/>
                    <Th/>
                    <Th/>
                </Tr>
            );
        }
    }

    function filterProjects() {
        let displayedProjects = unfilteredProjects.current;

        for (const [filterName, filterValue] of Object.entries(
            filters.current
        )) {
            if (filterName === "name") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.name
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())
                );
            }
            if (filterName === "number") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.number.includes(filterValue)
                );
            }
            if (filterName === "client") {
                displayedProjects = displayedProjects.filter((project) =>
                    project.client
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())
                );
            }
            if (filterName === "from_date") {
                displayedProjects = displayedProjects.filter(
                    (project) =>
                        Date.parse(project.date_required) >=
                        Date.parse(filterValue)
                );
            }
            if (filterName === "to_date") {
                displayedProjects = displayedProjects.filter(
                    (project) =>
                        Date.parse(project.date_required) <=
                        Date.parse(filterValue)
                );
            }
            if (filterName === "status") {
                if (filterValue !== "") {
                    displayedProjects = displayedProjects.filter(
                        (project) =>
                            project.status[project.status.length - 1].value ===
                            filterValue
                    );
                }
            }
        }

        setProjects(displayedProjects);
    }

    function handleFilterInputChange(event) {
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

    function handleDateInput(event) {
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
        <div key={count++}>
            <Box m="10px">
                <Heading>Welcome back {authenticatedUser.firstname}!</Heading>
            </Box>
            <HStack m="10px">
                <InputGroup size="sm" w="70%">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300"/>}
                    />
                    <Input
                        name="project_number"
                        value={filters.current.number || ""}
                        placeholder="Project Number"
                        onKeyPress={handleKeyPress}
                        onChange={handleFilterInputChange}
                    />
                </InputGroup>
                <InputGroup size="sm" w="90%">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300"/>}
                    />
                    <Input
                        name="project_name"
                        onChange={handleFilterInputChange}
                        placeholder="Project Name"
                        value={filters.current.name || ""}
                    />
                </InputGroup>
                <InputGroup size="sm" w="90%">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300"/>}
                    />
                    <Input
                        name="project_client"
                        value={filters.current.client || ""}
                        onChange={handleFilterInputChange}
                        placeholder="Client"
                    />
                </InputGroup>

                <InputGroup size="sm" w="180%">
                    <Text color={"brand.accents"}>Date from &nbsp;</Text>
                    <DatePicker
                        name="from_date"
                        placeholderText="Choose a date"
                        selected={filters.current.from_date || ""}
                        onSelect={handleDateInput}
                        dateFormat={"dd/MM/yyyy"}
                    />
                    <Text color={"brand.accents"}>to &nbsp;</Text>
                    <DatePicker
                        name="to_date"
                        placeholderText="Choose a date"
                        selected={filters.current.to_date || ""}
                        onSelect={handleDateInput}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </InputGroup>

                <Select
                    w="70%"
                    size="sm"
                    placeholder="Select a status"
                    name="project_status"
                    onChange={handleFilterInputChange}
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
                                <Text fontSize="lg">Status</Text>
                            </Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>{displayProjects()}</Tbody>
                </Table>
            </Box>
        </div>
    );
};

export default BoardDesigner;
