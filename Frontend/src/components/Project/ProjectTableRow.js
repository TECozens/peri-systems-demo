import { ChevronDownIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import ModalTest from "../Events/ModalTest/ModalTest";
import UpdateStatus from "../Events/UpdateStatus";
import ProjectView from "./ProjectView";

export const ProjectTableRow = ({
    count,
    status_value,
    _id,
    updateParent,
    authenticatedRole,
    project,
}) => {
    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton
                    as={IconButton}
                    size="sm"
                    colorScheme="red"
                    icon={<ChevronDownIcon w={6} h={6} color="white" />}
                />
                <MenuList boxShadow="2xl">
                    <UpdateStatus
                        count={count}
                        projectStatus={status_value}
                        projectId={_id}
                        updateParent={updateParent}
                    />
                    <ProjectView project={project} />
                    {authenticatedRole.includes("ROLE_TECHNICAL") && (
                        <div>
                            <AssignEngineers
                                updateParent={updateParent}
                                project={project}
                            />
                            <ModalTest />
                        </div>
                    )}
                </MenuList>
            </Menu>
        </>
    );
};
