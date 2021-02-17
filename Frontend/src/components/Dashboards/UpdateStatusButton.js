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

const UpdateStatusButton = (props) => {
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

    return (
        <div>
            <Button onClick={onOpen}>Update Status</Button>
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
                                <Radio value="Design Pending">
                                    Design Pending
                                </Radio>
                                <Radio value="Preliminary Design Ongoing">
                                    Preliminary Design Ongoing
                                </Radio>
                                <Radio value="Preliminary Design Complete">
                                    Preliminary Design Complete​
                                </Radio>
                                <Radio value="Awaiting Customer Approval">
                                    Awaiting Customer Approval
                                </Radio>
                                <Radio value="Detailed Design Pending​">
                                    Detailed Design Pending
                                </Radio>
                                <Radio value="Detailed Design Ongoing​">
                                    Detailed Design Ongoing​
                                </Radio>
                                <Radio value="Design Complete">
                                    Design Complete​​
                                </Radio>
                                <Radio value="Project Complete">
                                    Project Complete
                                </Radio>
                                <Radio value="Project Cancelled​">
                                    Project Cancelled​
                                </Radio>
                            </VStack>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateStatusButton;
