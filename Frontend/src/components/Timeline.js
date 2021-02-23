import React, {useEffect, useRef, useState} from "react";
import ProjectService from "../services/project.service";
import circle_outline from "../icons/outline_circle.png"
import red_tick from "../icons/red_tick.png";
import in_progress from "../icons/inprogress_icon.png";
import cross_circle from "../icons/cross_circle.png"
import gray_line from "../icons/grey_line.png";
import "../style/timeline.css";
import AuthService from "../services/auth.service";
import {Grid, GridItem, Box, Text, Center } from "@chakra-ui/react";


const Timeline = (props) => {
    const { projectId } = props.match.params;
    let aProject = useRef();
    const [projects, setProjects] = useState();
    const allProjectStages = ["Design Pending", "Preliminary Design Ongoing", "Preliminary Design Complete", "Awaiting Customer Approval",
        "Detailed Design Pending", "Detailed Design Ongoing", "Design Complete", "Project Complete"]



    useEffect(() => {
        ProjectService.getProjectByID(projectId).then((projects) => {
            aProject.current = projects;
            setProjects(aProject.current)
            console.log("project");
            console.log(aProject.current);
        });
    }, []);



    let logoWidth = 68;
    let logoHeight = 64;
    let timeTextSize = "xs"
    let statusTextSize = "sm"

    function isStatusComplete (index) {
        if (typeof projects !== 'undefined') {
            if (index === projects.status.length) {
                return (
                    <div>
                        <img src={in_progress} alt="Logo" width={logoWidth} height={logoHeight}/>
                        <b> <Text fontSize={statusTextSize}>{allProjectStages[index]}</Text> </b>
                        <Text fontSize={timeTextSize}>In progress...</Text>
                    </div>
                );
            }
            if (index >= projects.status.length) {
                    return (
                        <div>
                            <img src={circle_outline} alt="Logo" width={logoWidth} height={logoHeight}/>
                            <b><Text fontSize={statusTextSize}>{allProjectStages[index]}</Text></b>
                            <Text fontSize={timeTextSize}>Waiting...</Text>
                        </div>
                    );
                }
            let j;
            for (j = 0 ; j < projects.status.length; j++) {
                if (projects.status[j].value.indexOf(allProjectStages[index]) > -1) {
                    let i;
                    let date = projects.status[index].time_set;
                    let dateAndTime = date.substring(0, date.length - 8);
                    let dateToDisplay = date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
                    let minute = date.slice(14, 16);
                    let hour = date.slice(11, 13);
                    let meridiem;
                    if (hour > 12) {
                        meridiem = "PM"
                        hour = hour - 12;
                    } else if (hour < 12) {
                        meridiem = "AM"
                    } else if (hour === 12) {
                        meridiem = "PM"
                    }
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width={logoWidth} height={logoHeight}/>
                            <b> <Text fontSize={statusTextSize}>{allProjectStages[index]}</Text> </b>
                            <Text fontSize={timeTextSize}>Date: {dateToDisplay}</Text>
                            <Text fontSize={timeTextSize}>Time: {hour}:{minute} {meridiem}</Text>
                        </div>
                    );
                }
            }
            if (projects.status[index].value === "Project Cancelled") {
                let date = projects.status[index].time_set;
                let dateAndTime = date.substring(0, date.length - 8);
                let dateToDisplay = date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
                let minute = date.slice(14, 16);
                let hour = date.slice(11, 13);
                let meridiem;
                if (hour > 12) {
                    meridiem = "PM"
                    hour = hour - 12;
                } else if (hour < 12) {
                    meridiem = "AM"
                } else if (hour === 12) {
                    meridiem = "PM"
                }
                return (
                    <div>
                        <img src={cross_circle} alt="Logo" width={logoWidth} height={logoHeight}/>
                        <b> <Text fontSize={statusTextSize}>{allProjectStages[index]}</Text> </b>
                        <Text fontSize={timeTextSize}>Date: {dateToDisplay}</Text>
                        <Text fontSize={timeTextSize}>Time: {hour}:{minute} {meridiem}</Text>
                    </div>
                );
            }
            else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width={logoWidth} height={logoHeight}/>
                            <b><Text fontSize={statusTextSize}>{allProjectStages[index]}</Text></b>
                        </div>
                    );
                }
        } else {
            return (
                <div>Project Not Found</div>
            );
        }
    }

    function displayStatus() {
        if (typeof projects !== 'undefined') {
            if (projects.status.length < 9) {
                return (
                    <div>
                        <div className="line"></div>
                        <Grid templateColumns="repeat(12, 1fr)" gap={0}>
                            <Box w="100%"> {isStatusComplete(0)}</Box>
                            <Box w="100%"> {isStatusComplete(1)}</Box>
                            <Box w="100%"> {isStatusComplete(2)}</Box>
                            <Box w="100%"> {isStatusComplete(3)}</Box>
                            <Box w="100%"> {isStatusComplete(4)}</Box>
                            <Box w="100%"> {isStatusComplete(5)}</Box>
                            <Box w="100%"> {isStatusComplete(6)}</Box>
                            <Box w="100%"> {isStatusComplete(7)}</Box>
                        </Grid>
                    </div>

                );
            }
            return (
                <div>
                    {projects.status.map(status => (
                        <p>{status.value}</p>
                    ))}

                    {/*{projects.status[0].}*/}
                </div>
            )
        } else {
            return (
                <div>
                    <h1>project does not exist</h1>
                </div>
            )
        }
    }



    return (
        <div>
            <div className="line"></div>
            <Grid templateColumns="repeat(12, 1fr)" gap={0}>
                <Box w="100%"> {isStatusComplete(0)}</Box>
                <Box w="100%"> {isStatusComplete(1)}</Box>
                <Box w="100%"> {isStatusComplete(2)}</Box>
                <Box w="100%"> {isStatusComplete(3)}</Box>
                <Box w="100%"> {isStatusComplete(4)}</Box>
                <Box w="100%"> {isStatusComplete(5)}</Box>
                <Box w="100%"> {isStatusComplete(6)}</Box>
                <Box w="100%"> {isStatusComplete(7)}</Box>
        </Grid>
        </div>

    );
};


export default Timeline;