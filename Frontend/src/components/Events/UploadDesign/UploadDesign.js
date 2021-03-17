import React, {useCallback, useEffect, useState} from "react";
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

const UploadDesign = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [files, setFiles] = useState([])

    const handleUpload = () => {
        //TODO some Router send files, use "files"
        files.forEach((file) => {
            console.log("sending file:", file)
            
        })
        console.log("Sending Files")

    }

    useEffect(() => {
        console.log("Got Files:", files)

    },[files])

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
                        <SeparatedHeading secondary={"Upload a suitable image for showcase"}/>

                        <Dropzone setFiles={setFiles}/>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="yellow" mr={3} onClick={handleUpload}>
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