import React from "react";
import { Box, Heading } from "@chakra-ui/react"
import {ReactComponent as ReactLogo} from "../icons/Pericon.svg"
import '.././App.css';


const PeriNavbar = () => {

    return (
    <div>
        <Box bg="brand.background" boxShadow="lg">
            <ReactLogo className="Logo"/>
        </Box>
    </div>
    )

};

export default PeriNavbar;