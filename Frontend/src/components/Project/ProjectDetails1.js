import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";

const ProjectDetails1 = (props) => {
    const [project, setProject] = useState();

    useEffect(() => {
        if (props.project !== undefined) {
            setProject(props.project);
        }
    }, [props.project]);

    return (
        <Box p={30}>
            {project ? (
                <>
                    <Box align="center" justify="center">
                        <Heading>{project.name}</Heading>
                        <Heading as="h2" size="lg">
                            (#{project.number})
                        </Heading>
                    </Box>
                    <Heading as="h4" size="md" paddingLeft={20}>
                        Due:
                        {new Date(project.date_required).toLocaleDateString()}
                    </Heading>
                    <Heading as="h4" size="md" paddingLeft={20}>
                        Description: {project.description}
                    </Heading>
                </>
            ) : (
                <> </>
            )}
        </Box>
    );
};

export default ProjectDetails1;
