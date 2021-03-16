import React, { useEffect, useState } from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import ProjectList from "../../Project/ProjectList";
import { SeparatedHeading } from "../../Util/SeparatedHeading/SeparatedHeading";
import { ProjectsCompletedBarChart } from "./ProjectsCompletedBarChart";
import { ProjectsProgressPieChart } from "./ProjectsProgressPieChart";

const Report = (props) => {
    let projects = props.location.state.projects;
    const [projectsDueThisWeek, setProjectsDueThisWeek] = useState([]);
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

    function getProjectsCompletedOnTime(isOnTime) {
        let operation = " < ";
        if (isOnTime) {
            operation = " > ";
        }
        return projects
            ? projects.filter(
                  (project) =>
                      project.status.value === "Project Complete" &&
                      eval(
                          new Date(project.status.time_set).getDate() +
                              operation +
                              new Date(project.date_required).getDate()
                      )
              )
            : [];
    }

    function getProjectsDueBetweenDates(dateCommencing, dateEnding) {
        return projects.filter((project) => {
            let dateRequired = new Date(project.date_required);
            return dateRequired >= dateCommencing && dateRequired < dateEnding;
        });
    }

    function getFirstAndLastDayOfWeek(aDate) {
        let datePassed = new Date(aDate);
        let firstDayOfTheWeek = datePassed.getDate() - datePassed.getDay();
        let lastDayOfTheWeek = firstDayOfTheWeek + 6;

        return [
            new Date(datePassed.setDate(firstDayOfTheWeek)),
            new Date(datePassed.setDate(lastDayOfTheWeek)),
        ];
    }

    function getProjectsWithUnassignedEngineers() {
        return projects.filter(
            (project) =>
                project.engineers.design_checker_id == null ||
                project.engineers.designer_id == null
        );
    }

    function groupProjectsByStatus() {
        return projects.reduce(function (r, a) {
            r[a.status.value] = r[a.status.value] || [];
            r[a.status.value].push(a);
            return r;
        }, Object.create(null));
    }

    useEffect(() => {
        let todayDate = new Date();
        let inAWeekDate = new Date().setDate(todayDate.getDate() + 6);
        let [beginningThisWeek, endThisWeek] = getFirstAndLastDayOfWeek(
            todayDate
        );
        let [beginningNextWeek, endNextWeek] = getFirstAndLastDayOfWeek(
            inAWeekDate
        );

        setProjectsCompletedOnTime(getProjectsCompletedOnTime(true));
        setProjectsNotCompletedOnTime(getProjectsCompletedOnTime(false));
        setProjectsDueThisWeek(
            getProjectsDueBetweenDates(beginningThisWeek, endThisWeek)
        );
        setProjectsDueNextWeek(
            getProjectsDueBetweenDates(beginningNextWeek, endNextWeek)
        );
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
                    <Heading size="md">Projects Progress</Heading>
                    <ProjectsProgressPieChart data={groupProjectsByStatus()} />
                    <Heading size="md">Total Completed Projects</Heading>
                    <Text m={5}>
                        You have completed{" "}
                        {projects
                            ? projectsCompletedOnTime.length +
                              projectsNotCompletedOnTime.length
                            : ""}{" "}
                        projects
                    </Text>
                    <ProjectsCompletedBarChart
                        data={[
                            projectsCompletedOnTime.length,
                            projectsNotCompletedOnTime.length,
                        ]}
                    />
                    <Heading size="md">Projects Due This Week</Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsDueThisWeek"}
                                projectsToDisplay={projectsDueThisWeek}
                                count={100}
                                projectBreakpoint={"sm"}
                                inReport={true}
                            />
                        ) : (
                            ""
                        )}
                    </Box>
                    <Heading size="md">Projects Due Next Week</Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsDueNextWeek"}
                                projectsToDisplay={projectsDueNextWeek}
                                count={100}
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
