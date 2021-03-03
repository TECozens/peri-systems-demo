import React, {useContext, useEffect, useRef, useState} from "react";
import {Td, Tr, Tbody, Thead, Th, Table, Tfoot} from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import UpdateStatus from "../Events/UpdateStatus";
import {Button, useBreakpoint, useBreakpointValue} from "@chakra-ui/react";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import {Flex, Box, Text, Spacer} from "@chakra-ui/layout";
import {Link} from "react-router-dom";

const ProjectList = (props) => {
    let count = props.count;
    const projectBreakpoint = useBreakpointValue({base: "sm", lg: "md"})
    const resultsPerPage = 10
    const [currPage, setCurrPage] = useState(1)
    const [projects, setProjects] = useState([]);

    const tableSizing = useBreakpoint("")
    // const projects = props.projectsToDisplay;

    useEffect(() => {

    },[currPage])


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

                                >

                                    <Button
                                        width="full"
                                        size={projectBreakpoint}
                                        m={2}
                                        border="2px"
                                        color="brand.background"
                                        bg="brand.grey"
                                        borderColor="brand.pink"
                                        _hover={{bg: "brand.pink", borderColor: "brand.grey"}}>
                                        Update Status
                                    </Button>
                                </UpdateStatus>

                                {props.authenticatedRole.includes("ROLE_TECHNICAL") &&
                                <AssignEngineers
                                    updateParent={props.updateParent}
                                    project={project}>

                                    <Button
                                        width="full"
                                        m={2}
                                        size={projectBreakpoint}
                                        border="2px"
                                        color="brand.background"
                                        bg="brand.grey"
                                        borderColor="brand.pink"
                                        _hover={{bg: "brand.pink", borderColor: "brand.grey"}}>
                                        Assign Engineers
                                    </Button>
                                </AssignEngineers>
                                }

                                <ProjectView project={project}>
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
                                </ProjectView>
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
