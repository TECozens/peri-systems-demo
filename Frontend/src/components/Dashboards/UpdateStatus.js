import React, { useRef, useState } from "react";
import {
    Button,
    Radio,
    RadioGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import ProjectService from "../../services/project.service";

const UpdateStatus = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [statusSelected, setStatusSelected] = useState(
        props.projectStatus.trim()
    );

    function handleSubmit() {
        ProjectService.updateProjectStatus(props.projectId, statusSelected);
        props.updateParent();
        onClose();
    }

    function handleClose() {
        onClose();
        setStatusSelected(props.projectStatus.trim());
    }

    function createRadioButtons() {
        let statusOptions = [
            "Design Pending",
            "Preliminary Design Ongoing",
            "Preliminary Design Complete​",
            "Awaiting Customer Approval",
            "Detailed Design Pending",
            "Detailed Design Ongoing",
            "Design Complete​​",
            "Project Cancelled​",
        ];

        return statusOptions.map((aStatus) => (
            <Radio value={aStatus}>{aStatus}</Radio>
        ));
    }

    return (
        <div>
            <Button colorScheme={"green"} onClick={onOpen}>
                Update Status
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please select a status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RadioGroup
                            w="100%"
                            size="lg"
                            colorScheme="red"
                            value={statusSelected}
                            onChange={setStatusSelected}
                        >
                            <VStack
                                spacing="1rem"
                                align="left"
                                textAlign={"right"}
                            >
                                {createRadioButtons()}
                            </VStack>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateStatus;
