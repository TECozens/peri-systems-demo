import React from 'react'
import {Box, Heading} from "@chakra-ui/react"
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";
import {Flex, Spacer, Text} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/button";


const DesignDashboard = () => {
    let user = "AUser";
    let aProjectName = "AName";
    let aProjectNumber = 123;
    let aTechnicalDeliverable = "ADeliverable";
    let status = "AStatus";

    return (
        <div>
            <Box m="10px">
                <Heading>Welcome back {user}!</Heading>
            </Box>
            <Box m="10px">
                <Table variant="simple" size="md" borderWidth="2px" borderColor="#463E39" borderRadius="mg" bg="brand.background">
                    <Thead bg="brand.tertiary" >
                        <Tr color="#463E39">
                            <Th><Text fontSize="lg">Name </Text></Th>
                            <Th><Text fontSize="lg">Number </Text></Th>
                            <Th><Text fontSize="lg">Technical Deliverables</Text></Th>
                            <Th><Text fontSize="lg">Status</Text></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{aProjectName}</Td>
                            <Td>{aProjectNumber}</Td>
                            <Td>{aTechnicalDeliverable}</Td>
                            <Td>{status}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box >
        </div>
    )
}

export default DesignDashboard
