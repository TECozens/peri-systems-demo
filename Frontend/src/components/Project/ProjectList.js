import React, { useContext, useEffect, useRef, useState } from "react";
import * as UI from "@chakra-ui/react";
import projectContext from "../../context/project/projectsContext";
import Project from "./ProjectView";
import ProjectService from "../../services/project.service";
import { Td, Tr } from "@chakra-ui/table";
import UpdateStatus from "../Events/UpdateStatus";
import { Button } from "@chakra-ui/react";
import ProjectView from "./ProjectView";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";

const ProjectList = (props) => {
    let count = props.count;

    const displayAssignButtonIfTechnicalLead = (project) => {
        if (props.authenticatedRole === "ROLE_TECHNICAL") {
            return (
                <AssignEngineers
                    updateParent={console.log("updateProjectSection")}
                    project={project}
                />
            );
        }
    };

    if (props.projectsToDisplay.length > 0) {
        return (
            <>
                {props.projectsToDisplay.map((project) => (
                    <Tr key={project.name}>
                        <Td>{project.number}</Td>
                        <Td>{project.name}</Td>
                        <Td>{project.client}</Td>
                        <Td>
                            {new Date(
                                project.date_required
                            ).toLocaleDateString()}
                        </Td>
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
                                <Button width="full" colorScheme={"green"}>
                                    Update Status
                                </Button>
                            </UpdateStatus>
                            {displayAssignButtonIfTechnicalLead(project)}
                            <ProjectView project={project} />
                        </Td>
                    </Tr>
                ))}
            </>
        );
    } else {
        return <p>No projects available</p>;
    }
};

export default ProjectList;
