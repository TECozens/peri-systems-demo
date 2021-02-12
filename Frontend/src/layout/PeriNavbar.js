import React, {useEffect, useState} from "react";
import { Box, Heading } from "@chakra-ui/react";
import {ReactComponent as ReactLogo} from "../icons/Pericon.svg";
import '.././App.css';
import AuthService from "../services/auth.service";


const PeriNavbar = () => {
    const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowTechnicalBoard(user.roles.includes("ROLE_TECHNICAL"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
    <div>
        <Box bg="brand.background" boxShadow="lg">
            <ReactLogo className="Logo"/>
        </Box>
    </div>
    )

};

export default PeriNavbar;