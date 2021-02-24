import React from "react";
import * as UI from "@chakra-ui/react";
import * as Icon from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import UpdateStatus from "../Dashboards/UpdateStatus";
import ProjectService from "../../services/project.service";

const ProjectDetails = (props) => {
    const project = props.location.state.project;

    return (
        <UI.Box width="100%" p={15}>
            <UI.Flex>
                <UI.Box bg="brand.grey" width="full" m={15} boxShadow="lg">
                    <UI.Box borderTop="1px" borderBottom="1px" bg="brand.background">
                        <UI.Flex alignItems="center">
                            <Link to="/Dashboard">
                                <UI.Button mr={5} ml={5} bg="brand.pink" size="sm" _hover={{bg: "brand.accents"}}>
                                    <Icon.CloseIcon color="brand.background"/>
                                </UI.Button>
                            </Link>

                            <UI.Text textAlign="center" p={2} fontSize="3xl">
                                Project {project.number}
                            </UI.Text>
                        </UI.Flex>

                    </UI.Box>

                    <UI.Box bg="brand.background" mr="25%" borderBottomRightRadius={25}>
                        <UI.Text textAlign="center" fontSize="2xl">Project Name: {project.name}</UI.Text>
                    </UI.Box>

                    <UI.Box bg="brand.pink" m={10} boxShadow="dark-lg" borderBottomLeftRadius={25}
                            borderRightRadius={25}>
                        <UI.Box bg="brand.background" borderBottomRightRadius={25} mr="25%">
                            <UI.Text ml={5}
                                     fontSize="2xl">Status: {project.status[project.status.length - 1].value}</UI.Text>
                            <UI.Text ml={5} fontSize="2xl">Client: {project.client}</UI.Text>
                        </UI.Box>

                        <UI.Box p={10}>
                            <Link to={{
                                pathname: "/Timeline/" + project._id,
                                state: {project: project}
                            }}>
                                <UI.Button width="50%" border="1px" borderColor="brand.background" bg="brand.pink"
                                           color="brand.background" _hover={{bg: "brand.accents"}}>
                                    Project Timeline
                                </UI.Button>
                            </Link>
                            <UI.Spacer/>
                            <UpdateStatus projectStatus={project.status[project.status.length - 1].value}
                                          projectId={project._id}>
                                <UI.Button my={5} width="50%" border="1px" borderColor="brand.background" bg="brand.pink"
                                        color="brand.background" _hover={{bg: "brand.accents"}}>
                                    Update Status
                                </UI.Button>
                            </UpdateStatus>
                        </UI.Box>


                    </UI.Box>
                </UI.Box>

                <UI.Box bg="brand.background" width="full" m={15} boxShadow="lg">
                    TODO Next Feature: Pending Requests
                </UI.Box>

            </UI.Flex>
        </UI.Box>
    )
}

export default ProjectDetails;
