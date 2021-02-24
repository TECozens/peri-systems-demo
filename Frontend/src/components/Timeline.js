import React, {useEffect, useRef, useState} from "react";
import ProjectService from "../services/project.service";
import circle_outline from "../icons/outline_circle.png"
import red_tick from "../icons/red_tick.png";
import in_progress from "../icons/inprogress_icon.png";
import cross_circle from "../icons/cross_circle.png"
import gray_line from "../icons/grey_line.png";
import "../style/timeline.css";
import AuthService from "../services/auth.service";
import {Box, Text, Button, Flex} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";


const Timeline = (props) => {
    const {projectId} = props.match.params;
    const project = props.location.state.project;

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

    let statusArray = [];

    function retrieveProjectStatusArray() {
        let i;
        let tempStatusArray = [];
        if (typeof projects !== 'undefined') {
            for (i = 0; i < projects.status.length; i++) {
                tempStatusArray.push(projects.status[i].value);
            }
            statusArray = tempStatusArray;
        }
    }

    // TODO: Redo Current in Progress Status
    function isStatusComplete(index) {
        retrieveProjectStatusArray();
        console.log(statusArray);
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
            if (index >= projects.status.length || statusArray.lastIndexOf(allProjectStages[index]) == -1) {
                return (
                    <div>
                        <img src={circle_outline} alt="Logo" width={logoWidth} height={logoHeight}/>
                        <b><Text fontSize={statusTextSize}>{allProjectStages[index]}</Text></b>
                        <Text fontSize={timeTextSize}>Waiting...</Text>
                    </div>
                );
            }
            if (statusArray.lastIndexOf(allProjectStages[index]) > -1) {
                let currentStatusIndex = statusArray.lastIndexOf(allProjectStages[index]);
                let i;
                let date = projects.status[currentStatusIndex].time_set;
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
                } else if (hour == 12) {
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
            if (statusArray.lastIndexOf("Project Cancelled") > -1) {
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
                } else if (hour == 12) {
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
            } else {
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
        <Box width="100%">
            <Link to={{
                pathname: "/ProjectDetails/" + projectId,
                state: {project: project}
            }}>
                <Button m={10} color="brand.background" bg="brand.pink" size="sm" _hover={{bg: "brand.accents"}}>
                    <CloseIcon/>
                    <Text ml={2}>
                        Close
                    </Text>
                </Button>
            </Link>

            <Box bg="brand.background" className="line" width="80%" m={20} boxShadow="lg">
                {/*<Grid templateColumns="repeat(12, 1fr)" gap={1}>*/}
                <Flex>
                    <Box w="100%"> {isStatusComplete(0)}</Box>
                    <Box mr={5} w="100%"> {isStatusComplete(1)}</Box>
                    <Box w="100%"> {isStatusComplete(2)}</Box>
                    <Box w="100%"> {isStatusComplete(3)}</Box>
                    <Box w="100%"> {isStatusComplete(4)}</Box>
                    <Box w="100%"> {isStatusComplete(5)}</Box>
                    <Box w="100%"> {isStatusComplete(6)}</Box>
                    <Box w="100%"> {isStatusComplete(7)}</Box>
                </Flex>


                {/*</Grid>*/}
            </Box>
        </Box>
    );
};


export default Timeline;