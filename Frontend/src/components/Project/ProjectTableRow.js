import { ChevronDownIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Td, useDisclosure
} from '@chakra-ui/react';
import React, { useEffect } from "react";
import UpdateStatus from "../Events/UpdateStatus";



export const ProjectTableRow = ({count, status_value, _id, updateParent}) => {
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
                <MenuList>
                    <UpdateStatus
                        count={count}
                        projectStatus={status_value}
                        projectId={_id}
                        updateParent={updateParent}
                    />
                    <MenuItem onClick={onOpen} icon={<EditIcon />}>
                        Update Status
                    </MenuItem>
                    <MenuItem onClick={onOpen} icon={<ViewIcon />}>
                        View
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
