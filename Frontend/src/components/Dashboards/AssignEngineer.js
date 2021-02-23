import React, { useCallback, useEffect, useState, useRef } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import UsersService from "../../services/users.service";
import ProjectService from "../../services/project.service";

const AssignEngineer = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [allDesigners, setAllDesigners] = useState([]);
    const checkedDesigners = useRef();

    useEffect(() => {
        getAndSetDesigners();
    });

    function handleSubmit() {
        ProjectService.updateProjectEngineers(
            props.project_id,
            checkedDesigners.current
        ).then(onClose);
    }

    function handleClose() {
        onClose();
    }

    const getAndSetDesigners = useCallback(() => {
        UsersService.getDesignerRoleID().then((idRetrieved) => {
            if (idRetrieved !== undefined) {
                UsersService.getUsersWithRoleID(idRetrieved).then((data) => {
                    setAllDesigners(data);
                });
            }
        });
    }, []);

    function createDesignEngineerSelectionOptions() {
        if (allDesigners !== undefined) {
            return allDesigners.map((aDesigner) => (
                <option size={"md"} value={aDesigner._id}>
                    {aDesigner.firstname + " " + aDesigner.lastname}
                </option>
            ));
        }
    }

    function handleDesignerSelection(event) {
        checkedDesigners.current = event.target.value;
    }

    return (
        <div>
            <Button onClick={onOpen}>Assign engineer</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assigning engineers to projects</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="left">
                            <Text>Design Engineer:</Text>
                            <Select
                                w="70%"
                                size="sm"
                                placeholder="Select an engineer"
                                name="design_engineers"
                                onChange={handleDesignerSelection}
                            >
                                {createDesignEngineerSelectionOptions()}
                            </Select>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <HStack w={"100%"}>
                            <Button
                                w={"100%"}
                                colorScheme="red"
                                mr={3}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                w={"100%"}
                                colorScheme="green"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AssignEngineer;