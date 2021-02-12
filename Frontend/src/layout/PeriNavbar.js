import React, {useEffect, useState} from "react";
import { Box, Heading, Flex, Button, Spacer } from "@chakra-ui/react";
import {ReactComponent as ReactLogo} from "../icons/Pericon.svg";
import '.././App.css';
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";


const PeriNavbar = () => {
    const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showDesignerBoard, setShowDesignerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowTechnicalBoard(user.roles.includes("ROLE_TECHNICAL"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowDesignerBoard(user.roles.includes("ROLE_DESIGNER"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
    <Box bg="brand.background" boxShadow="lg">
        <Flex alignItems="center" justifyContent="center">
            <Box ml="15%">
                <ReactLogo className="Logo"/>
            </Box>
            <Spacer/>
            <Box mr="10%">
            {currentUser ? (

                    <Button bg="brand.secondary" color="brand.background">
                        <a href="/Login" onClick={logOut}>
                            LogOut
                        </a>
                    </Button>

            ) : (

                    <Button bg="brand.secondary" color="brand.background">
                        <Link to={"/Login"}>
                            Login
                        </Link>
                    </Button>

            )}
            </Box>

        </Flex>

    </Box>
    )

};

export default PeriNavbar;