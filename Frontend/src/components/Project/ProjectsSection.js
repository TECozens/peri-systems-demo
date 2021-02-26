import React, { useEffect, useRef, useState } from "react";
import * as UI from "@chakra-ui/react";
import AuthService from "../../services/auth.service";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import ProjectService from "../../services/project.service";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/layout";

const ProjectsSection = (props) => {
    let authenticatedUser = AuthService.getCurrentUser();
    let unfilteredProjects = useRef();
    const [projectsDisplayed, setProjectsDisplayed] = useState([]);
    let count = 0;

    const getProjects = () => {
        ProjectService.getProjectByEngineerID(authenticatedUser.id).then(
            (projects) => {
                unfilteredProjects.current = projects;
                setProjectsDisplayed(projects);
            }
        );
    };

    useEffect(() => {
        getProjects();
    }, [authenticatedUser.id]);

    return (
        <UI.Flex>
            <ProjectFilter projectsToFilter={unfilteredProjects.current} />
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
                        <Th />
                    </Tr>
                </Thead>
                <Tbody>
                    <ProjectList
                        projectsToDisplay={projectsDisplayed}
                        count={count}
                        authenticatedRole={authenticatedUser.roles}
                    />
                </Tbody>
            </Table>
        </UI.Flex>
    );
};

export default ProjectsSection;
