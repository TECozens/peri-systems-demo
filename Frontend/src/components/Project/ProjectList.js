import React, { useEffect, useRef, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import { Button } from "@chakra-ui/react";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import { Flex, Text } from "@chakra-ui/layout";
import UserService from "../../services/users.service";

const ProjectList = (props) => {
    let count = props.count;
    const [projects, setProjects] = useState([]);
    const designersNameAndId = useRef({});

    const getProjectsDesignEngineersAndDesignCheckers = async (projects) => {
        return Promise.all(
            projects.map(async (project) => {
                let designEngineerId = project.engineers.designer_id;
                let designCheckerId = project.engineers.design_checker_id;
                //getting design engineers
                await UserService.getUserByID(designEngineerId)
                    .then((user) => {
                        let name;
                        if (user !== undefined) {
                            name = user.firstname + " " + user.lastname;
                        } else {
                            name = "Unknown";
                        }
                        designersNameAndId.current[designEngineerId] = name;
                    })
                    //getting design checkers
                    .then(
                        await UserService.getUserByID(designCheckerId).then(
                            (user) => {
                                let name;
                                if (user !== undefined) {
                                    name = user.firstname + " " + user.lastname;
                                } else {
                                    name = "Unknown";
                                }
                                designersNameAndId.current[
                                    designCheckerId
                                ] = name;
                            }
                        )
                    );
            })
        );
    };

    useEffect(() => {
        if (props.projectsToDisplay.length !== 0) {
            getProjectsDesignEngineersAndDesignCheckers(
                props.projectsToDisplay
            ).then(() => setProjects(props.projectsToDisplay));
        }
    }, [props.projectsToDisplay]);

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
                                Status
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
                        <Th bg="brand.pink" />
                    </Tr>
                </Thead>
                <Tbody>
                    {projects.map((project) => (
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
                            <Td>
                                {
                                    designersNameAndId.current[
                                        project.engineers.designer_id
                                    ]
                                }
                            </Td>
                            <Td>
                                {
                                    designersNameAndId.current[
                                        project.engineers.design_checker_id
                                    ]
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
                                            updateParent={props.updateParent}
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
