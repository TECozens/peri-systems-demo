import React, {useContext} from "react"
import * as UI from "@chakra-ui/react"
import {Link} from "react-router-dom";

const ProjectView = (props) => {
    const projectId = props.project._id;

    return (
        <Link to={{
            pathname: "/ProjectDetails/" + projectId,
            state: {project: props.project}
        }}>
            <UI.Button mt={5} width="full" bg="brand.tertiary">
                View
            </UI.Button>
        </Link>
    )
}

export default ProjectView;