import React, { useCallback, useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth.service";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import ProjectService from "../../services/project.service";
import { Box, Flex, Text } from "@chakra-ui/layout";
import PageSection from "../Admin/Register/UserCount/PageSection"

const ProjectsSection = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let unfilteredProjects = useRef();
    const [projectsDisplayed, setProjectsDisplayed] = useState([]);
    let count = 0;
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const getProjects = useCallback(() => {
        ProjectService.getProjectsWithDesignEngineersByEngineerID(
            authenticatedUser.id,
            page
        ).then((res) => {
            unfilteredProjects.current = res.projects;
            setProjectsDisplayed(res.projects);
            setMaxPage(res.maxPages)
            console.log("This is it", res.maxPages)
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
        console.log("Updated page", page)
    }, [getProjects, page]);


    return (
        <Flex>
            <Box bg="brand.grey" width="100%" boxShadow="dark-md">
                <Box borderTop="1px" borderBottom="1px" bg="brand.background">
                    <Text textAlign="center" p={2} fontSize="3xl">
                        Available Projects
                    </Text>
                </Box>

                <Box>
                    <PageSection
                        isLoading={false}
                        maxPage={maxPage}
                        setPage={setPage}
                        page={page}
                        onLastPage={false}
                    />
                </Box>

                <Box>
                    <ProjectFilter
                        projectsToFilter={unfilteredProjects.current}
                    />
                </Box>

                <Box height="auto" width="auto"  m={0} bg="brand.background">
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
