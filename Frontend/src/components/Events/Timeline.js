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
    let previousStatusArray = [];

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

    function getAllPreviousStatuses() {
        let i
        let tempStatusArray = [];
        if (typeof projects !== "undefined") {
            let lastStatusIndex = allProjectStages.lastIndexOf(projects.status.value) - 1;
            for (i = 0; i <= lastStatusIndex; i++) {
                tempStatusArray.push(allProjectStages[i]);
            }
            previousStatusArray = tempStatusArray;
        }
    }



    // TODO: Redo Current in Progress Status
    function isStatusComplete(index) {
        let date;
        let minute;
        let hour;
        let meridiem;
        let dateToDisplay;
        let line;
        if (index !== 7) {
            line = "line"
        }
        if (typeof projects !== "undefined") {
            retrieveProjectStatusArray();
            getAllPreviousStatuses();
            let lastIndex = allProjectStages.lastIndexOf(projects.status.value);
            let currentStatusIndex = statusArray.lastIndexOf(allProjectStages[index]);
            //COMPLETED
            if (index < lastIndex) {
                if (statusArray.includes(allProjectStages[index])) {
                    date = new Date(
                        projects.status_history[currentStatusIndex].time_set
                    );
                     dateToDisplay = date.toLocaleDateString();
                     minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
                     hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
                    if (hour > 12) {
                        meridiem = "PM";
                        hour = hour - 12;
                    } else if (hour < 12) {
                        meridiem = "AM";
                    } else if (hour === 12) {
                        meridiem = "PM";
                    }
                } else {
                    dateToDisplay = "Unknown"
                    hour = "Unknown"
                }
                return (
                    <div className={line}>
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
                )
                // CURRENT STATUS
            } else if (lastIndex === index) {
                if (index === 2 || index === 6 ||index === 7) {
                    date = new Date(projects.status.time_set);
                    dateToDisplay = date.toLocaleDateString();
                    minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
                    hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
                    if (hour > 12) {
                        meridiem = "PM";
                        hour = hour - 12;
                    } else if (hour < 12) {
                        meridiem = "AM";
                    } else if (hour === 12) {
                        meridiem = "PM";
                    }
                    return (
                        <div className={line}>
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
                    )
                }
                return (
                    <div className={line}>
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
            // NOT DONE STATUS
            else if (
                index >= lastIndex ||
                statusArray.lastIndexOf(allProjectStages[index]) === -1
            ) {
                return (
                    <div className={line}>
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
        }
    }

    return (
        <Box
            bg="brand.background"
            // className="line"
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
