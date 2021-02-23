import React from "react";
import * as UI from "@chakra-ui/react";

const ProjectDetails = (props) => {
    const project = props.location.state.project;


    return (
        <UI.Flex>
            <UI.Heading>{project.name}</UI.Heading>
        </UI.Flex>
    )
}

export default ProjectDetails;
