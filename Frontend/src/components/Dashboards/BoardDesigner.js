import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/layout";
import getProjects from "../../services/project.service";
import AuthService from "../../services/auth.service";

const BoardDesigner = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects(authenticatedUser.id).then((projects) =>
            setProjects(projects)
        );
    }, []);

    function displayProjects() {
        if (projects.length >= 1) {
            return projects.map((data) => (
                <Tr>
                    <Td>{data.number}</Td>
                    <Td>{data.name}</Td>
                    <Td>{data.client}</Td>
                    <Td>{new Date(data.date_required).toLocaleDateString()}</Td>
                    <Td>{data.status[data.status.length - 1].value}</Td>
                </Tr>
            ));
        } else {
            return (
                <Tr>
                    <Th />
                    <Th />
                    <Th> No projects</Th>
                    <Th />
                    <Th />
                </Tr>
            );
        }
    }

    return (
        <div>
            <Box m="10px">
                <Heading>Welcome back {authenticatedUser.firstname}!</Heading>
            </Box>
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
                            <Th>
                                <Text fontSize="lg">Name </Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Client</Text>
                            </Th>
                            <Th>
                                <Text fontSize="lg">Date Required</Text>
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
