import React from "react";
import {useDropzone} from "react-dropzone";
import {Box, Text} from "@chakra-ui/layout";
import {ModalBody} from "@chakra-ui/modal";

const Dropzone = ({onDrop, accept}) => {
    // Initializing useDropzone hooks with options
    const {getRootProps, getInputProps, isDragActive} = useDropzone(
        {
            onDrop,
            accept
        });

    // useDropzone hooks exposes two functions called getRootProps and getInputProps
    // and also exposes isDragActive boolean
    return (
        <Box p={20} borderRadius={15} border="1px" borderColor="brand.tertiary" borderStyle={"dashed"} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div>
                {isDragActive ? (
                    <Text  fontSize="xl" className="dropzone-content">Release to drop the files here</Text>
                ) : (
                    <Text fontSize="xl"  className="dropzone-content">
                        Drag & Drop Designs Here
                    </Text>
                )}
            </div>
        </Box>
    )
}

export default Dropzone;