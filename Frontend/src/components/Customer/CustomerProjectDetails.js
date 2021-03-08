import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
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
        <Box width="100%" p={15}>
            {projectId ? (
                <>
                    <ProjectDetails1 project={project} />
                    <Timeline project={project} />
                </>
            ) : (
                <></>
            )}
        </Box>
    );
};

export default CustomerProjectDetails;
