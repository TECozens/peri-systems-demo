import React from "react";
import {Box, Heading} from "@chakra-ui/react";
import AuthService from "../services/auth.service";

const Dashboard = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <Box bg="brand.background" m={10} p={20} boxShadow={"dark-lg"}>
            <Heading>
                You've logged in as: {currentUser.email} Your Details are Below
            </Heading>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </Box>
    )
}
export default Dashboard;