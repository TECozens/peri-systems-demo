import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    createStandaloneToast,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import { MenuItem } from "@chakra-ui/react"
import ProjectService from "../../services/project.service";
import { FaEdit } from "react-icons/fa";

const UpdateStatus = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [statusSelected, setStatusSelected] = useState();
    const [projects, setProjects] = useState();
    let aProject = useRef();
    let count = props.count;
    const projectBreakpoint = useBreakpointValue({ base: "sm", lg: "md" });

    useEffect(() => {
        console.log('props.projectId :>> ', props.projectId);
        console.log('props.projectStatus :>> ', props.projectStatus);
        console.log('props.count :>> ', props.count);
        console.log('props.updateParent :>> ', props.updateParent);
    })

    useEffect(() => {
        setStatusSelected(props.projectStatus.trim());
        ProjectService.getProjectByID(props.projectId).then((projects) => {
            aProject.current = projects;
            console.log('aProject.current :>> ', aProject.current);
            setProjects(aProject.current);
            console.log("project is");
            console.log(aProject.current);
        });
    }, [props.projectStatus]);


    function successStatusToast() {
        const toast = createStandaloneToast()
        toast({
            title: "Status Successfully Updated",
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
        })
    }


    function handleSubmit() {
        const toast = createStandaloneToast()
        if (typeof projects !== "undefined") {
            console.log(statusSelected);
            if (statusSelected === "Design Complete" && projects.approved === "APPROVED") {
                ProjectService.updateProjectStatus(props.projectId, statusSelected)
                    .then((updatedProject) => props.updateParent(updatedProject))
                    .then(onClose);

                ProjectService.sendMail(
                    projects.customer.name,
                    projects.customer.email,
                    props.projectId
                ).then(
                    (response) => {
                        console.log("mail sent");
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        console.log("error sending mail");
                    }
                );
                successStatusToast()
                } else if (statusSelected === "Design Complete" && projects.approved === "NONE") {
                    // TODO Update status to pending and toast

                toast({
                    title: "Approval Request Sent",
                    description: "Approval required by design checker before marked as complete.",
                    status: "warning",
                    duration: 6000,
                    position: "top-right",
                    isClosable: true,
                })
                    console.log("NONE")
                } else {
                    ProjectService.updateProjectStatus(props.projectId, statusSelected)
                        .then((updatedProject) => props.updateParent(updatedProject))
                        .then(onClose);
                successStatusToast()
                 }
            }
    }

    function handleClose() {
        onClose();
        setStatusSelected(props.projectStatus.trim());
    }

    function createRadioButtons() {
        let statusOptions = [
            "Design Pending",
            "Preliminary Design Ongoing",
            "Preliminary Design Complete",
            "Awaiting Customer Approval",
            "Detailed Design Pending",
            "Detailed Design Ongoing",
            "Design Complete",
            "Project Complete",
            "Project Cancelled",
        ];

        return statusOptions.map((status) => (
            <Radio key={count++} value={status}>
                {status}
            </Radio>
        ));
    }

    return (
        <div key={count++}>
            <MenuItem
            icon={<FaEdit />}
                onClick={onOpen}
            >
                Update Status
            </MenuItem>

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
