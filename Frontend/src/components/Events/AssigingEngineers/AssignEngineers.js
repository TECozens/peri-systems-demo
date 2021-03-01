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
import EngineerSelection from "./EngineerSelection";

const AssignEngineers = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const selectedDesignEngineerId = useRef(
        props.project.engineers.designer_id
    );
    const selectedDesignCheckerId = useRef(props.project.engineers.designer_id);

    async function handleSubmit() {
        let updatedProject;
        if (
            props.project.engineers.designer_id !==
            selectedDesignEngineerId.current
        ) {
            await ProjectService.updateProjectDesignEngineer(
                props.project._id,
                selectedDesignEngineerId.current
            ).then((project) => {
                updatedProject = project;
            });
        }

        if (
            props.project.engineers.design_checker_id !==
            selectedDesignCheckerId.current
        ) {
            await ProjectService.updateProjectDesignChecker(
                props.project._id,
                selectedDesignCheckerId.current
            ).then((project) => {
                updatedProject = project;
            });
        }

        onClose();

        if (updatedProject !== undefined) {
            props.updateParent(updatedProject);
        }
    }

    function handleClose() {
        onClose();
    }

    function handleDesignEngineerSelection(selectedID) {
        selectedDesignEngineerId.current = selectedID;
    }

    function handleDesignCheckerSelection(selectedID) {
        selectedDesignCheckerId.current = selectedID;
    }

    return (
        <div key={"assign_engineer_modal"}>
            <Button
                m={2}
                border="2px"
                color="brand.background"
                bg="brand.grey"
                borderColor="brand.pink"
                _hover={{
                    bg: "brand.pink",
                    borderColor: "brand.grey",
                }}
                onClick={onOpen}
            >
                Assign Engineers
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assigning engineers to projects</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="left">
                            <EngineerSelection
                                type={"Design Engineer"}
                                onChange={handleDesignEngineerSelection}
                                currentEngineer={
                                    props.project.engineers.designer_id
                                }
                            />
                            <EngineerSelection
                                type={"Design Checker"}
                                onChange={handleDesignCheckerSelection}
                                currentEngineer={
                                    props.project.engineers.design_checker_id
                                }
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
