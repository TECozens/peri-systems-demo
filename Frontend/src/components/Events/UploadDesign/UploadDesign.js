import React, {useCallback} from "react";
import {Button, MenuItem} from "@chakra-ui/react"
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {RiFolderUploadLine} from "react-icons/ri";
import Dropzone from "../Dropzone/Dropzone";
import {Text} from "@chakra-ui/layout";
import {SeparatedHeading} from "../../Util/SeparatedHeading/SeparatedHeading";
import {SiEpel} from "react-icons/all";

const UploadDesign = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    // onDrop function
    const onDrop = useCallback(acceptedFiles => {
        // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
        console.log(acceptedFiles);
    }, []);


    return (
        <>
            <MenuItem onClick={onOpen} icon={<RiFolderUploadLine/>}>
                Upload
            </MenuItem>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader><SeparatedHeading primary={"Upload a Design"}/></ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <SeparatedHeading secondary={"Upload a suitable design for showcase"}/>
                        <Dropzone>
                            onDrop={onDrop} accept
                        </Dropzone>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="yellow" mr={3}>
                            Send
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UploadDesign;