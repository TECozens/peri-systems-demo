import React from "react";
import { Link } from "react-router-dom";
import { Button, MenuItem, useBreakpointValue } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProjectView = (props) => {
    const projectId = props.project._id;
    const projectBreakpoint = useBreakpointValue({ base: "sm", lg: "md" });

    return (
        <Link to={"/project/" + projectId}>
            <MenuItem icon={<ViewIcon />}>
                View
            </MenuItem>
        </Link>
    );
};

export default ProjectView;
