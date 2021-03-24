import React, { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import Timeline from "../Events/Timeline";
import ProjectService from "../../services/project.service";
import { SeparatedHeading } from "../Util/SeparatedHeading/SeparatedHeading";

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
            <SeparatedHeading primary='Project Details' secondary='Manage or View your Project' />

            <Flex bg={"brand.background"} borderRadius="lg" boxShadow="lg">
                {projectId ? (
                    <>
                        <Box marginBottom={1}>
                            <Box m={10}>
                                {project ?
                                    <Box marginBottom={8}>
                                        <Heading> {project.name}  <Text color='grey'>#{project.number}</Text> </Heading>
                                    </Box>
                                    : <></>}
                                <Timeline project={project} />
                            </Box>
                            {project ? (
                                <>
                                    <Box m={10}>
                                        <Box>
                                            <Heading as="h4" size="md">
                                                Due
                                            </Heading>
                                        p    <Text>
                                                {new Date(
                                                    project.date_required
                                                ).toLocaleDateString()}
                                            </Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                Description
                                            </Heading>
                                            <Text>
                                                {project.description}
                                            </Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                Client
                                            </Heading>
                                            <Text>
                                                {project.client}
                                            </Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                System
                                            </Heading>
                                            <Text>
                                                {project.system}
                                            </Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                Sector
                                            </Heading>
                                            <Text>
                                                {project.sector}
                                            </Text>

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
