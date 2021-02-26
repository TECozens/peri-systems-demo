import React, {useEffect, useRef, useState} from "react";
import AuthService from "../../services/auth.service";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import ProjectService from "../../services/project.service";
import {Table, Tbody, Th, Thead, Tr} from "@chakra-ui/table";
import {Text, Flex, Box} from "@chakra-ui/layout";

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
        <Flex>
            <Box bg="brand.grey" width="100%" boxShadow="dark-md">
                <Box borderTop="1px" borderBottom="1px" bg="brand.background">
                    <Text textAlign="center" p={2} fontSize="3xl">
                        Available Projects
                    </Text>
                </Box>

                <Box>
                    <ProjectFilter projectsToFilter={unfilteredProjects.current}/>
                </Box>

                <Box borderTopLeftRadius={25} borderBottomRightRadius={25} m={10} bg="brand.background">
                    <ProjectList
                        projectsToDisplay={projectsDisplayed}
                        count={count}
                        authenticatedRole={authenticatedUser.roles}/>
                </Box>
            </Box>
        </Flex>
    );
};

export default ProjectsSection;
