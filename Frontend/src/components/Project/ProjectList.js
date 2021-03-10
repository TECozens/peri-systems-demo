import React, {useEffect, useState} from "react";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import {Text} from "@chakra-ui/layout";
import ModalTest from "../Events/ModalTest/ModalTest";

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
                size={props.projectBreakpoint}
                bg="brand.background"
                boxShadow="dark-lg"
            >
                <Thead>
                    <Tr>
                        <Th bg="brand.pink">
                            <Text
                                color="brand.background"
                                fontSize={props.projectBreakpoint}
                            >
                                Number{" "}
                            </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text
                                color="brand.background"
                                fontSize={props.projectBreakpoint}
                            >
                                Name{" "}
                            </Text>
                        </Th>
                        {props.projectBreakpoint !== "sm" ? (
                            <>
                                <Th bg="brand.pink">
                                    <Text
                                        color="brand.background"
                                        fontSize={props.projectBreakpoint}
                                    >
                                        Client
                                    </Text>
                                </Th>
                                <Th bg="brand.pink">
                                    <Text
                                        color="brand.background"
                                        fontSize={props.projectBreakpoint}
                                    >
                                        Date Required
                                    </Text>
                                </Th>
                                <Th bg="brand.pink">
                                    <Text
                                        color="brand.background"
                                        fontSize={props.projectBreakpoint}
                                    >
                                        Design Engineer
                                    </Text>
                                </Th>
                                <Th bg="brand.pink">
                                    <Text
                                        color="brand.background"
                                        fontSize={props.projectBreakpoint}
                                    >
                                        Design Checker
                                    </Text>
                                </Th>
                            </>
                        ) : (
                            <></>
                        )}
                        <Th bg="brand.pink">
                            <Text
                                color="brand.background"
                                fontSize={props.projectBreakpoint}
                            >
                                Status
                            </Text>
                        </Th>
                        <Th bg="brand.pink"/>
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

                            {props.projectBreakpoint !== "sm" ? (
                                <>
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
                                </>
                            ) : (
                                <></>
                            )}
                            <Td>{project.status.value}</Td>
                            <Td isNumeric>
                                <UpdateStatus
                                    count={count}
                                    projectStatus={project.status.value}
                                    projectId={project._id}
                                    updateParent={props.updateParent}
                                />

                                {props.authenticatedRole.includes(
                                    "ROLE_TECHNICAL"
                                ) && (
                                    <div>
                                        <AssignEngineers
                                            updateParent={props.updateParent}
                                            project={project}
                                        />
                                        <ModalTest />
                                    </div>
                                    )}
                                    <ProjectView project={project} />
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
