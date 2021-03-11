import { ChevronDownIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Td, useDisclosure
} from '@chakra-ui/react';
import React, { useEffect } from "react";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import ModalTest from "../Events/ModalTest/ModalTest";
import UpdateStatus from "../Events/UpdateStatus";
import ProjectView from "./ProjectView";



export const ProjectTableRow = ({ count, status_value, _id, updateParent, authenticatedRole, project }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton
                    as={IconButton}
                    size="sm"
                    colorScheme="red"
                    icon={<ChevronDownIcon w={6} h={6} color="white" />}
                />
                <MenuList boxShadow='2xl'>
                    <UpdateStatus
                        count={count}
                        projectStatus={status_value}
                        projectId={_id}
                        updateParent={updateParent}
                    />
                    {authenticatedRole.includes(
                        "ROLE_TECHNICAL"
                    ) && (
                            <div>
                                <ProjectView project={project} />
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
    )
}
