import React, { useCallback, useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth.service";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import ProjectService from "../../services/project.service";
import { Box, Flex, Text } from "@chakra-ui/layout";

const ProjectsSection = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let unfilteredProjects = useRef();
    const [projectsDisplayed, setProjectsDisplayed] = useState([]);
    let count = 0;

    const getProjects = useCallback(() => {
        ProjectService.getProjectsWithDesignEngineersByEngineerID(
            authenticatedUser.id
        ).then((projects) => {
            unfilteredProjects.current = projects;
            setProjectsDisplayed(projects);
        });
    }, [authenticatedUser.id]);

    const updateUnfilteredProjects = (projectUpdated) => {
        let indexOfItemToUpdate = unfilteredProjects.current.findIndex(
            (x) => x._id === projectUpdated._id
        );
        unfilteredProjects.current[indexOfItemToUpdate] = projectUpdated;
        setProjectsDisplayed([...unfilteredProjects.current]);
    };

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return (
        <Flex>
            <Box bg="brand.grey" width="100%" boxShadow="dark-md">
                <Box borderTop="1px" borderBottom="1px" bg="brand.background">
                    <Text textAlign="center" p={2} fontSize="3xl">
                        Available Projects
                    </Text>
                </Box>

                <Box>
                    <ProjectFilter
                        count={count}
                        authenticatedId={authenticatedUser.id}
                        projectsDisplayed={projectsDisplayed}
                        setProjectsParent={setProjectsDisplayed}
                    />
                </Box>

                <Box
                    height="auto"
                    width="auto"
                    borderTopLeftRadius={25}
                    borderBottomRightRadius={25}
                    m={10}
                    bg="brand.background"
                >
                    <ProjectList
                        projectsToDisplay={projectsDisplayed}
                        count={count}
                        authenticatedRole={authenticatedUser.roles}
                        updateParent={updateUnfilteredProjects}
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default ProjectsSection;
