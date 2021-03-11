import React, {useEffect, useState} from "react";
import {Box, Container, Flex, Heading} from "@chakra-ui/layout";
import Timeline from "../Events/Timeline";
import ProjectService from "../../services/project.service";

const ProjectDetails = (props) => {
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
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <Heading>Project Details</Heading>
            <Heading size="md" mb={4} color="grey">
                Manage or View your Project
            </Heading>

            <Flex bg={"brand.background"} borderRadius="lg" boxShadow="lg">
                {projectId ? (
                    <>
                        <Box marginBottom={5}>
                            <Box m={10}>
                                <Timeline project={project}/>
                            </Box>
                            {project ? (
                                <>
                                    <Box m={10}>
                                        <Box align="center" justify="center">
                                            <Heading>{project.name}</Heading>
                                            <Heading as="h2" size="lg">
                                                (#{project.number})
                                            </Heading>
                                        </Box>
                                        <Box>
                                            <Heading as="h4" size="md" marginBottom={5}>
                                                Due:{" "}
                                                {new Date(
                                                    project.date_required
                                                ).toLocaleDateString()}
                                            </Heading>
                                            <Heading as="h4" size="md">
                                                Description: {project.description}
                                            </Heading>
                                        </Box>
                                    </Box>

                                </>
                            ) : (
                                <> </>
                            )}
                        </Box>
                    </>
                ) : (
                    <></>
                )}
            </Flex>
        </Container>

    );
};

export default ProjectDetails;
