import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import { Flex, Text } from "@chakra-ui/layout";

const ProjectList = (props) => {
    let count = props.count;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (props.projectsToDisplay !== undefined) {
            setProjects(props.projectsToDisplay);
        }
    }, [props.projectsToDisplay]);

    const returnEngineerName = (engineer) => {
        if (engineer !== null) {
            return engineer.firstname + " " + engineer.lastname;
        } else {
            return "Unassigned";
        }
    };

    if (projects.length > 0) {
        return (
            <Table
                flexShrink={10}
                variant="none"
                size="md"
                bg="brand.background"
                borderTopLeftRadius={25}
                borderBottomRightRadius={25}
                boxShadow="dark-lg"
            >
                <Thead>
                    <Tr>
                        <Th bg="brand.pink" borderTopLeftRadius={25}>
                            <Text color="brand.background" fontSize="lg">
                                Number
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize="lg">
                                Name
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize="lg">
                                Client
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize="lg">
                                Date Required
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize="lg">
                                Design Engineer
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize="lg">
                                Design Checker
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize="lg">
                                Status
                            </Text>
                        </Th>

                        <Th bg="brand.pink" />
                    </Tr>
                </Thead>
                <Tbody>
                    {projects.map((project) => (
                        <Tr borderColor="#E2DCCD" key={project.name}>
                            <Td>{project.number}</Td>
                            <Td>{project.name}</Td>
                            <Td>{project.client}</Td>
                            <Td>
                                {new Date(
                                    project.date_required
                                ).toLocaleDateString()}
                            </Td>
                            <Td>
                                {returnEngineerName(
                                    project.engineers.designer_id
                                )}
                            </Td>
                            <Td>
                                {returnEngineerName(
                                    project.engineers.design_checker_id
                                )}
                            </Td>
                            <Td>
                                {
                                    project.status[project.status.length - 1]
                                        .value
                                }
                            </Td>
                            <Td isNumeric>
                                <Flex flexShrink="auto">
                                    <UpdateStatus
                                        count={count}
                                        projectStatus={
                                            project.status[
                                                project.status.length - 1
                                            ].value
                                        }
                                        projectId={project._id}
                                        updateParent={props.updateParent}
                                    />

                                    {props.authenticatedRole.includes(
                                        "ROLE_TECHNICAL"
                                    ) && (
                                        <AssignEngineers
                                            updateParent={props.updateParent}
                                            project={project}
                                        />
                                    )}
                                    <ProjectView project={project} />
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        );
    } else {
        return <p>No projects available</p>;
    }
};

export default ProjectList;
