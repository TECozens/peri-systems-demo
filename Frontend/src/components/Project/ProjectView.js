import React from "react";
import {Link} from "react-router-dom";
import {Button, useBreakpointValue} from "@chakra-ui/react";
import UpdateStatus from "../Events/UpdateStatus";

const ProjectView = (props) => {
    const projectId = props.project._id;
    const projectBreakpoint = useBreakpointValue({base: "sm", lg: "md"})


    return (
        <Link
            to={{
                pathname: "/Timeline/" + projectId,
                state: {project: props.project},
            }}
        >
            <Button
                m={2}
                border="2px"
                size={projectBreakpoint}
                width="full"
                color="brand.background"
                bg="brand.grey" borderColor="brand.pink"
                _hover={{bg: "brand.pink", borderColor: "brand.grey"}}>
                View
            </Button>
        </Link>
    );
};

export default ProjectView;
