import { Box, Flex, Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth.service";
import ProjectFilteringService from "../../services/project.filtering.service";
import PageSection from "../Admin/Register/UserCount/PageSection";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";

const ProjectsSection = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let allEngineerProjects = useRef();
    const [projectsDisplayed, setProjectsDisplayed] = useState([]);
    const projectBreakpoint = useBreakpointValue({ base: "sm", lg: "md" });
    const [page, setPage] = useState(1)
    let [maxPage, setMaxPage] = useState(1);
    let count = 0;

    const getProjects = useCallback(() => {
        ProjectFilteringService.getProjectsByEngineerIDAndFilter(
            authenticatedUser.id,
            null,
            page
        ).then(({data, maxPage}) => {
            allEngineerProjects.current = data;
            setProjectDisplayedToAllEngineerProjects();
            setMaxPage(maxPage)
        });
    }, [authenticatedUser.id, page]);

    const setProjectDisplayedToAllEngineerProjects = () => {
        setProjectsDisplayed(allEngineerProjects.current);
    };

    const updateUnfilteredProjects = (projectUpdated) => {
        let indexOfItemToUpdate = allEngineerProjects.current.findIndex(
            (x) => x._id === projectUpdated._id
        );
        allEngineerProjects.current[indexOfItemToUpdate] = projectUpdated;
        setProjectsDisplayed([...allEngineerProjects.current]);
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
                        setMaxPage={setMaxPage}
                        page={page}
                        count={count}
                        authenticatedId={authenticatedUser.id}
                        projectsDisplayed={projectsDisplayed}
                        setProjectsParent={setProjectsDisplayed}
                        setProjectDisplayedToAllEngineerProjects={
                            setProjectDisplayedToAllEngineerProjects
                        }
                        projectBreakpoint={projectBreakpoint}
                    />
                </Box>

                <Box height="auto" width="auto" m={0} bg="brand.background">
                    <ProjectList
                        projectsToDisplay={projectsDisplayed}
                        count={count}
                        authenticatedRole={authenticatedUser.roles}
                        updateParent={updateUnfilteredProjects}
                        projectBreakpoint={projectBreakpoint}
                    />
                </Box>

                <PageSection page={page} setPage={setPage} maxPage={maxPage} variant='simple' />
            </Box>
        </Flex>
    );
};

export default ProjectsSection;
