import React from 'react'
import { Box } from "@chakra-ui/react"


const ExampleComponent = () => {
    return (
        <div>
            <Box bg="brand.primary" w="100%" p={4} color="black">
                <h1>Example Component</h1>
            </Box>
            <Box bg="brand.secondary" w="100%" p={4} color="black">
                <h1>Example Component</h1>
            </Box>
            <Box bg="brand.tertiary" w="100%" p={4} color="black">
                <h1>Example Component</h1>
            </Box>
            <Box bg="brand.accents" w="100%" p={4} color="black">
                <h1>Example Component</h1>
            </Box>
        </div>
    )
}

export default ExampleComponent
