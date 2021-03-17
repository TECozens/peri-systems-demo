import React from "react";
import {useDropzone} from "react-dropzone";
import {Box, Text} from "@chakra-ui/layout";
import {ModalBody} from "@chakra-ui/modal";
import {formatBytes} from "../UploadDesign/formatBytes"

const Dropzone = ({onDrop, accept}) => {
    // Initializing useDropzone hooks with options
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone(
        {
            onDrop,
            accept
        });



    const files = acceptedFiles.map(file => (
        <Text key={file.path}>
            {file.path} - {formatBytes(file.size)}
        </Text>
    ));


    // useDropzone hooks exposes two functions called getRootProps and getInputProps
    // and also exposes isDragActive boolean
    return (
        <>
        <Box p={20} borderRadius={15} border="1px" borderColor="brand.tertiary" borderStyle={"dashed"} {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
                {isDragActive ? (
                    <Text  fontSize="xl">Release to drop the files here</Text>
                ) : (
                    <Text fontSize="xl">
                        Drag & Drop or Click here to add Files
                    </Text>
                )}

            </div>
        </Box>

        <Box>
            <Text>Files:</Text>
            {files}
        </Box>
        </>
    )
}

export default Dropzone;