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
import UploadService from "../../../services/uploadDesign/upload.service"
import request from 'superagent';


const UploadDesign = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [files, setFiles] = useState([])


    const handleUpload = () => {
        files.forEach((file, index) => {
            console.log("sending file:", file)
            let fileData = new FormData();

            fileData.append('name', file)
            fileData.append('foo', 'bar')

            const req = request.post('http://localhost:8081/api/uploadDesign').attach('name', file)
            console.log("Project", props.project._id)
            console.log("Designer", props.project.engineers.designer_id._id)

            req.end(function (err, response) {
                console.log("upload done!!!!!");
            });
        })
    }

    useEffect(() => {
        console.log("Got Files:", files)

    }, [files])

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