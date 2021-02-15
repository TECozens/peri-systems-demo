import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/layout";
import getProjects from "../../services/project.service";
import AuthService from "../../services/auth.service";
import { Search2Icon } from "@chakra-ui/icons";

const BoardDesigner = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let unfilteredProjects = useRef();
    const [projects, setProjects] = useState([]);
    let filters = useRef({});

    useEffect(() => {
        getProjects(authenticatedUser.id).then((projects) => {
            unfilteredProjects.current = projects;
            setProjects(unfilteredProjects.current);
        });
    }, []);

    function displayProjects() {
        if (projects.length >= 1) {
            return projects.map((data) => (
                <Tr>
                    <Td>{data.name}</Td>
                    <Td>{data.number}</Td>
                    <Td>------</Td>
                    <Td>{data.status[data.status.length - 1].value}</Td>
                </Tr>
            ));
        } else {
            return (
                <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th> No projects</Th>
                    <Th></Th>
                </Tr>
            );
        }
    }

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

    function handleProjectNameChange(event) {
        filters.current.name = event.target.value;
        filterProjects();
    }

    function handleProjectNumberChange(event) {
        filters.current.number = event.target.value;
        filterProjects();
    }

    function handleTechnicalDeliverableChange() {}

    function handleStatusChange(event) {
        filters.current.status = event.target.value;
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
        filters.current.technicalDeliverable = "";
        filters.current.status = "";

        setProjects(unfilteredProjects.current);
    }

    return (
        <div>
            <Box m="10px">
                <Heading>Welcome back {authenticatedUser.firstname}!</Heading>
            </Box>
            <HStack m="10px">
                <InputGroup size="sm" w={"104%"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        onChange={handleProjectNameChange}
                        placeholder="Project Name"
                        value={filters.current.name}
                    />
                </InputGroup>
                <InputGroup size="sm" w={"50%"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_number"
                        value={filters.current.number}
                        placeholder="Number"
                        onKeyPress={handleKeyPress}
                        onChange={handleProjectNumberChange}
                    />
                </InputGroup>
                <InputGroup size="sm" w={"110%"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="technical_deliverables"
                        value={filters.current.technicalDeliverable}
                        onChange={handleTechnicalDeliverableChange}
                        placeholder="Technical Deliverables"
                    />
                </InputGroup>

                <Select
                    w="70%"
                    size="sm"
                    placeholder="Select a status"
                    onChange={handleStatusChange}
                    value={filters.current.status}
                >
                    <option value="Design Pending">Design Pending</option>
                    <option value="Preliminary Design Ongoing">
                        Preliminary Design Ongoing
                    </option>
                    <option value="Preliminary Design Complete">
                        Preliminary Design Complete
                    </option>
                    <option value="Awaiting Customer Approval">
                        Awaiting Customer Approval
                    </option>
                    <option value="Detailed Design Pending​">
                        Detailed Design Pending​
                    </option>
                    <option value="Detailed Design Ongoing​">
                        Detailed Design Ongoing​
                    </option>
                    <option value="Design Complete">Design Complete​​</option>
                    <option value="Project Complete">Project Complete</option>
                    <option value="Project Cancelled​">
                        Project Cancelled​
                    </option>
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
                                <Text fontSize="lg">Name </Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Number </Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">
                                    Technical Deliverables
                                </Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Status</Text>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>{displayProjects()}</Tbody>
                </Table>
            </Box>
        </div>
    );
};

export default BoardDesigner;
