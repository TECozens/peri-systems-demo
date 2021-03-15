import React, { useEffect, useState } from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import ProjectList from "../../Project/ProjectList";
import AuthService from "../../../services/auth.service";
import { SeparatedHeading } from "../../Util/SeparatedHeading/SeparatedHeading";
import { ProjectsCompletedBarChart } from "./ProjectsCompletedBarChart";

// Create Document Component
const Report = (props) => {
    let projects = props.location.state.projects;
    const [projectsDueNextWeek, setProjectsDueNextWeek] = useState([]);
    const [
        projectsWithUnassignedEngineers,
        setProjectsWithUnassignedEngineers,
    ] = useState([]);
    const [projectsCompletedOnTime, setProjectsCompletedOnTime] = useState([]);
    const [
        projectsNotCompletedOnTime,
        setProjectsNotCompletedOnTime,
    ] = useState([]);

    function getProjectsNotCompletedOnTime() {
        return projects
            ? projects.filter(
                  (project) =>
                      project.status.value === "Project Complete" &&
                      new Date(project.status.time_set) >
                          new Date(project.date_required)
              )
            : [];
    }

    function getProjectsCompletedOnTime() {
        return projects
            ? projects.filter(
                  (project) =>
                      project.status.value === "Project Complete" &&
                      new Date(project.status.time_set) <
                          new Date(project.date_required)
              )
            : [];
    }

    function getProjectsDueNextWeek() {
        return projects.filter((project) => {
            let dateR = new Date(project.date_required);
            let now = new Date();
            let dateW = new Date().setDate(
                now.getDate() + ((7 - now.getDay()) % 7) + 1
            );

            return dateR >= dateW && dateR > now;
        });
    }

    function getProjectsWithUnassignedEngineers() {
        return projects.filter(
            (project) =>
                project.engineers.design_checker_id == null ||
                project.engineers.designer_id == null
        );
    }

    useEffect(() => {
        setProjectsCompletedOnTime(getProjectsCompletedOnTime());
        setProjectsNotCompletedOnTime(getProjectsNotCompletedOnTime());
        setProjectsDueNextWeek(getProjectsDueNextWeek());
        setProjectsWithUnassignedEngineers(
            getProjectsWithUnassignedEngineers()
        );
    }, [projects]);

    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <Box w="100%" h="100%">
                <SeparatedHeading
                    primary="Report"
                    secondary="Your Projects Report"
                />
                <Box p={5} bg={"brand.background"}>
                    <Heading size="md">Total Completed Projects</Heading>
                    <Text
                        m={5}
                        fontSize={props.location.state.projectBreakpoint}
                    >
                        You have completed{" "}
                        {projects
                            ? projects.filter(
                                  (project) =>
                                      project.status.value ===
                                      "Project Complete"
                              ).length
                            : ""}{" "}
                        projects
                    </Text>
                    <ProjectsCompletedBarChart
                        data={[
                            projectsCompletedOnTime.length,
                            projectsNotCompletedOnTime.length,
                        ]}
                    />
                    <Heading size="md">Projects Due Next Week</Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsDueNextWeek"}
                                projectsToDisplay={projectsDueNextWeek}
                                count={100}
                                authenticatedRole={
                                    AuthService.getCurrentUser().roles
                                }
                                updateParent={null}
                                projectBreakpoint={"sm"}
                                inReport={true}
                            />
                        ) : (
                            ""
                        )}
                    </Box>
                    <Heading size="md">
                        Projects With Unassigned Engineers
                    </Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsWithUnassignedEngineers"}
                                projectsToDisplay={
                                    projectsWithUnassignedEngineers
                                }
                                count={100}
                                authenticatedRole={
                                    AuthService.getCurrentUser().roles
                                }
                                updateParent={null}
                                projectBreakpoint={"sm"}
                                inReport={true}
                            />
                        ) : (
                            ""
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Report;
