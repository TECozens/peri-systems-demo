import React from "react";
import ProjectsSection from "../Project/ProjectsSection";
import {Box, Container, Flex, Spacer} from "@chakra-ui/layout";

const AdminBoard = () => {
    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
                <ProjectsSection />
{/* 
            <Spacer m={20} />

            <Box bg="brand.background" width="35%"  boxShadow="lg">
                TODO Next Feature: Pending Requests
            </Box> */}
        </Container>
    );
};

export default AdminBoard;
