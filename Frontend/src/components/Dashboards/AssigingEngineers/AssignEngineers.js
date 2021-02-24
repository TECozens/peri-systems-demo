import React, { useRef } from "react";
import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ProjectService from "../../../services/project.service";
import DesignEngineerSelection from "./DesignEngineerSelection";

const AssignEngineers = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const selectedDesignEngineerId = useRef();

    function handleSubmit() {
        ProjectService.updateProjectEngineers(
            props.project_id,
            selectedDesignEngineerId.current
        ).then(onClose);
    }

    function handleClose() {
        onClose();
    }

    function handleDesignEngineerSelection(event) {
        selectedDesignEngineerId.current = event;
    }

    return (
        <div key={"assign_engineer_modal"}>
            <Button mt={2} onClick={onOpen}>
                Assign engineer
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assigning engineers to projects</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="left">
                            <DesignEngineerSelection
                                onChange={handleDesignEngineerSelection}
                            />
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

export default AssignEngineers;
