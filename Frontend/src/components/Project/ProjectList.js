import React, { useContext, useEffect, useRef, useState } from "react";
import { Td, Tr, Tbody, Thead, Th, Table } from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import { Button } from "@chakra-ui/react";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import { Flex, Box, Text, Spacer } from "@chakra-ui/layout";
import * as UI from "@chakra-ui/react";

const ProjectList = (props) => {
    let count = props.count;

    if (props.projectsToDisplay.length > 0) {
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
                                Status
                            </Text>
                        </Th>
                        <Th bg="brand.pink" />
                    </Tr>
                </Thead>
                <Tbody>
                    {props.projectsToDisplay.map((project) => (
                        <Tr
                            topBorder="1px"
                            borderColor="#E2DCCD"
                            key={project.name}
                        >
                            <Td>{project.number}</Td>
                            <Td>{project.name}</Td>
                            <Td>{project.client}</Td>
                            <Td>
                                {new Date(
                                    project.date_required
                                ).toLocaleDateString()}
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
                                        updateParent={console.log(
                                            "update parent function"
                                        )}
                                    >
                                        <Button
                                            size="md"
                                            m={2}
                                            border="2px"
                                            color="brand.background"
                                            bg="brand.grey"
                                            borderColor="brand.pink"
                                            _hover={{
                                                bg: "brand.pink",
                                                borderColor: "brand.grey",
                                            }}
                                        >
                                            Update Status
                                        </Button>
                                    </UpdateStatus>

                                    {props.authenticatedRole.includes(
                                        "ROLE_TECHNICAL"
                                    ) && (
                                        <AssignEngineers
                                            updateParent={console.log(
                                                "updateProjectSection"
                                            )}
                                            project={project}
                                        >
                                            <Button
                                                m={2}
                                                border="2px"
                                                color="brand.background"
                                                bg="brand.grey"
                                                borderColor="brand.pink"
                                                _hover={{
                                                    bg: "brand.pink",
                                                    borderColor: "brand.grey",
                                                }}
                                            >
                                                Assign Engineers
                                            </Button>
                                        </AssignEngineers>
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
