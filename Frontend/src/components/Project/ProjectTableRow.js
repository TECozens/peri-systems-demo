import {ChevronDownIcon, DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {RiFolderUploadLine} from "react-icons/ri";

import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Td, useDisclosure
} from '@chakra-ui/react';
import React, {useEffect} from "react";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import ModalTest from "../Events/ModalTest/ModalTest";
import UpdateStatus from "../Events/UpdateStatus";
import ProjectView from "./ProjectView";
import UploadDesign from "../Events/UploadDesign/UploadDesign";


export const ProjectTableRow = ({count, status_value, _id, updateParent, authenticatedRole, project, designer}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton
                    as={IconButton}
                    size="sm"
                    colorScheme="red"
                    icon={<ChevronDownIcon w={6} h={6} color="white"/>}
                />
                <MenuList boxShadow='2xl'>
                    <UpdateStatus
                        count={count}
                        projectStatus={status_value}
                        projectId={_id}
                        updateParent={updateParent}
                    />
                    <ProjectView project={project}/>
                    {authenticatedRole.includes(
                        "ROLE_TECHNICAL"
                    ) && (
                        <div>
                            <AssignEngineers
                                updateParent={updateParent}
                                project={project}
                            />
                            <ModalTest/>
                        </div>
                    )}
                    {authenticatedRole.includes(
                        "ROLE_DESIGNER"
                    ) && (
                        <UploadDesign project={project}/>
                    )}

                </MenuList>
            </Menu>
        </>
    )
}
