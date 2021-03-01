import React, {useContext, useEffect, useRef, useState} from "react";
import {Td, Tr, Tbody, Thead, Th, Table, Tfoot} from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import {Button} from "@chakra-ui/react";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import {Flex, Box, Text, Spacer} from "@chakra-ui/layout";
import {useBreakpoint, useBreakpointValue} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ProjectList = (props) => {
    let count = props.count;
    const projectBreakpoint = useBreakpointValue({base: "sm", lg: "md"})
    const resultsPerPage = 10
    const [currPage, setCurrPage] = useState(1)
    const tableSizing = useBreakpoint("")

    useEffect(() => {

    },[currPage])


    if (props.projectsToDisplay.length > 0) {
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
                    {props.projectsToDisplay.map((project) => (
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
                                    updateParent={console.log(
                                        "update parent function"
                                    )}
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
                                    updateParent={console.log("updateProjectSection")}
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
