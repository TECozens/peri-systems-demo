import React, { useEffect, useRef, useState } from "react";
import circle_outline from "../../icons/outline_circle.png";
import red_tick from "../../icons/red_tick.png";
import in_progress from "../../icons/inprogress_icon.png";
import cross_circle from "../../icons/cross_circle.png";
import "../../style/timeline.css";
import { Box, Flex, Text } from "@chakra-ui/react";

const Timeline = (props) => {
    let aProject = useRef();
    const [projects, setProjects] = useState();
    const allProjectStages = [
        "Design Pending",
        "Preliminary Design Ongoing",
        "Preliminary Design Complete",
        "Awaiting Customer Approval",
        "Detailed Design Pending",
        "Detailed Design Ongoing",
        "Design Complete",
        "Project Complete",
    ];

    useEffect(() => {
        if (props.project !== undefined) {
            aProject.current = props.project;
            setProjects(aProject.current);
        } else if (props.location !== undefined) {
            aProject.current = props.location.state.project;
            setProjects(aProject.current);
        }
    }, [props.project]);

    let logoWidth = 68;
    let logoHeight = 64;
    let timeTextSize = "xs";
    let statusTextSize = "sm";

    let statusArray = [];

    function retrieveProjectStatusArray() {
        let i;
        let tempStatusArray = [];
        if (typeof projects !== "undefined") {
            for (i = 0; i < projects.status_history.length; i++) {
                tempStatusArray.push(projects.status_history[i].value);
            }
            statusArray = tempStatusArray;
        }
    }

    // TODO: Redo Current in Progress Status
    function isStatusComplete(index) {
        retrieveProjectStatusArray();
        console.log(statusArray);
        if (typeof projects !== "undefined") {
            if (index === projects.status_history.length) {
                return (
                    <div>
                        <img
                            src={in_progress}
                            alt="Logo"
                            width={logoWidth}
                            height={logoHeight}
                        />
                        <b>
                            <Text fontSize={statusTextSize}>
                                {allProjectStages[index]}
                            </Text>
                        </b>
                        <Text fontSize={timeTextSize}>In progress...</Text>
                    </div>
                );
            }
            if (
                index >= projects.status_history.length ||
                statusArray.lastIndexOf(allProjectStages[index]) === -1
            ) {
                return (
                    <div>
                        <img
                            src={circle_outline}
                            alt="Logo"
                            width={logoWidth}
                            height={logoHeight}
                        />
                        <b>
                            <Text fontSize={statusTextSize}>
                                {allProjectStages[index]}
                            </Text>
                        </b>
                        <Text fontSize={timeTextSize}>Waiting...</Text>
                    </div>
                );
            }
            if (statusArray.lastIndexOf(allProjectStages[index]) > -1) {
                let currentStatusIndex = statusArray.lastIndexOf(
                    allProjectStages[index]
                );
                let date = new Date(
                    projects.status_history[currentStatusIndex].time_set
                );
                let dateToDisplay = date.toLocaleDateString();
                let minute =
                    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
                let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
                let meridiem;
                if (hour > 12) {
                    meridiem = "PM";
                    hour = hour - 12;
                } else if (hour < 12) {
                    meridiem = "AM";
                } else if (hour === 12) {
                    meridiem = "PM";
                }
                return (
                    <div>
                        <img
                            src={red_tick}
                            alt="Logo"
                            width={logoWidth}
                            height={logoHeight}
                        />
                        <b>
                            <Text fontSize={statusTextSize}>
                                {allProjectStages[index]}
                            </Text>
                        </b>
                        <Text fontSize={timeTextSize}>
                            Date: {dateToDisplay}
                        </Text>
                        <Text fontSize={timeTextSize}>
                            Time: {hour}:{minute} {meridiem}
                        </Text>
                    </div>
                );
            }
            if (statusArray.lastIndexOf("Project Cancelled") > -1) {
                let date = projects.status_history[index].time_set;
                let dateToDisplay =
                    date.slice(8, 10) +
                    "/" +
                    date.slice(5, 7) +
                    "/" +
                    date.slice(0, 4);
                let minute = date.slice(14, 16);
                let hour = date.slice(11, 13);
                let meridiem;
                if (hour > 12) {
                    meridiem = "PM";
                    hour = hour - 12;
                } else if (hour < 12) {
                    meridiem = "AM";
                } else if (hour === 12) {
                    meridiem = "PM";
                }
                return (
                    <div>
                        <img
                            src={cross_circle}
                            alt="Logo"
                            width={logoWidth}
                            height={logoHeight}
                        />
                        <b>
                            {" "}
                            <Text fontSize={statusTextSize}>
                                {allProjectStages[index]}
                            </Text>{" "}
                        </b>
                        <Text fontSize={timeTextSize}>
                            Date: {dateToDisplay}
                        </Text>
                        <Text fontSize={timeTextSize}>
                            Time: {hour}:{minute} {meridiem}
                        </Text>
                    </div>
                );
            } else {
                return (
                    <div>
                        <img
                            src={red_tick}
                            alt="Logo"
                            width={logoWidth}
                            height={logoHeight}
                        />
                        <b>
                            <Text fontSize={statusTextSize}>
                                {allProjectStages[index]}
                            </Text>
                        </b>
                    </div>
                );
            }
        } else {
            return <div>Project Not Found</div>;
        }
    }

    return (
        <Box
            bg="brand.background"
            className="line"
            width="100%"
            marginBottom={40}
        >
            <Flex>
                <Box w="100%"> {isStatusComplete(0)}</Box>
                <Box w="100%"> {isStatusComplete(1)}</Box>
                <Box w="100%"> {isStatusComplete(2)}</Box>
                <Box w="100%"> {isStatusComplete(3)}</Box>
                <Box w="100%"> {isStatusComplete(4)}</Box>
                <Box w="100%"> {isStatusComplete(5)}</Box>
                <Box w="100%"> {isStatusComplete(6)}</Box>
                <Box w="100%"> {isStatusComplete(7)}</Box>
            </Flex>
        </Box>
        
    );
};

export default Timeline;
