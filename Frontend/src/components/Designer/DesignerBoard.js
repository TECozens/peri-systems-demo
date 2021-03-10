import React from "react";
import ProjectsSection from "../Project/ProjectsSection";
import {Box, Flex, Spacer} from "@chakra-ui/layout";

const DesignerBoard = () => {
    return (
        <Flex p={20}>
            <Box width="full">
                <ProjectsSection />
            </Box>

            <Spacer m={20} />

            <Box bg="brand.background" width="35%"  boxShadow="lg">
                TODO Next Feature: Pending Invites, Requests, Upload Designs
            </Box>
        </Flex>
    );
};

export default DesignerBoard;
