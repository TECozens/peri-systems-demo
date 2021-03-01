import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import UpdateStatus from "../Events/UpdateStatus";

const ProjectView = (props) => {
    const projectId = props.project._id;

    return (
        <Link
            to={{
                pathname: "/Timeline/" + projectId,
                state: {project: props.project},
            }}
        >
            {props.children}
        </Link>
    );
};

export default ProjectView;
