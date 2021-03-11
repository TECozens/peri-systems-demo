import React from "react";
import ProjectsSection from "../Project/ProjectsSection";
import { Container } from "@chakra-ui/layout";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "../Events/Report/Report";

const DesignerBoard = () => {
    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <ProjectsSection />
        </Container>
    );
};

export default DesignerBoard;
