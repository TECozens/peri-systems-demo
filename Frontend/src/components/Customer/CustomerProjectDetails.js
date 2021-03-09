import React, { useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/layout";
import Timeline from "../Events/Timeline";
import ProjectService from "../../services/project.service";
import ProjectDetails1 from "../Project/ProjectDetails1";

const CustomerProjectDetails = (props) => {
    const projectId = props.match.params.param1;
    const [project, setProject] = useState(props.project);

    useEffect(() => {
        if (projectId !== undefined) {
            ProjectService.getProjectByID(projectId).then((projectReturned) => {
                setProject(projectReturned);
            });
        }
    }, [projectId]);

    return (
        <Flex
            bg={"brand.background"}
            borderRadius="lg"
            w={"fit-content"}
            boxShadow="lg"
        >
            {projectId ? (
                <Box m={10}>
                    <ProjectDetails1 project={project} />
                    <Timeline project={project} />
                </Box>
            ) : (
                <></>
            )}
        </Flex>
    );
};

export default CustomerProjectDetails;
