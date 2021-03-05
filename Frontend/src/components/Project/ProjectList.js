import React, {useEffect, useRef, useState} from "react";
import {Td, Tr, Tbody, Thead, Th, Table, Tfoot} from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import {Button, useBreakpoint, useBreakpointValue} from "@chakra-ui/react";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import {Flex, Box, Text, Spacer} from "@chakra-ui/layout";

const ProjectList = (props) => {
    let count = props.count;
    const projectBreakpoint = useBreakpointValue({base: "sm", lg: "md"})
    const [currPage, setCurrPage] = useState(1)
    const [projects, setProjects] = useState([]);
    const tableSizing = useBreakpoint("")




    useEffect(() => {
        setProjects(props.projectsToDisplay);
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
            <Table size={projectBreakpoint} bg="brand.background" boxShadow="dark-lg">
                <Thead>
                    <Tr>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize={projectBreakpoint}>Number </Text>
                        </Th>
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize={projectBreakpoint}>Name </Text>
                        </Th>
                        {
                            (projectBreakpoint !== "sm") ?
                                <>
                                    <Th bg="brand.pink">
                                        <Text color="brand.background" fontSize={projectBreakpoint}>Client</Text>
                                    </Th>
                                    <Th bg="brand.pink">
                                        <Text color="brand.background" fontSize={projectBreakpoint}>Date Required</Text>
                                    </Th>
                                </> : (
                                    <>
                                    </>
                                )
                        }
                        <Th bg="brand.pink">
                            <Text color="brand.background" fontSize={projectBreakpoint}>Status</Text>
                        </Th>
                        <Th bg="brand.pink"/>
                    </Tr>
                </Thead>
                <Tbody>
                    {projects.map((project) => (
                        <Tr topBorder="1px" borderColor="#E2DCCD" key={project.name}>
                            <Td>{project.number}</Td>
                            <Td>{project.name}</Td>

                            {
                                (projectBreakpoint !== "sm") ?
                                    <>
                                        <Td>{project.client}</Td>
                                        <Td>
                                            {new Date(
                                                project.date_required
                                            ).toLocaleDateString()}
                                        </Td>
                                    </> : (
                                        <>
                                        </>
                                    )
                            }

                            <Td>
                                {project.status[project.status.length - 1].value}
                            </Td>


                            <Td isNumeric>
                                <UpdateStatus
                                    count={count}
                                    projectStatus={
                                        project.status[project.status.length - 1]
                                            .value
                                    }
                                    projectId={project._id}
                                    updateParent={props.updateParent}
                                />

                                {props.authenticatedRole.includes("ROLE_TECHNICAL") &&
                                <AssignEngineers
                                    updateParent={props.updateParent}
                                    project={project}
                                />
                                }

                                <ProjectView
                                    project={project}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>
        );
    } else {
        return <p>No projects available</p>;
    }
};

export default ProjectList;
