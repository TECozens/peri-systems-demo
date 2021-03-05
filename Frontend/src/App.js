import React from 'react'
import './App.css';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./components/Authentication/Login"
import Register from "./components/Admin/Register/Register"
import PeriNavbar from "./layout/PeriNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Private from "./components/Authentication/Private"
import AuthService from "./services/auth.service";
import IsLoggedIn from "./components/Authentication/IsLoggedIn";
import ProjectDetails from "./components/Project/ProjectDetails";
import Timeline from "./components/Events/Timeline";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        primary: "#f1f1f1",
        secondary: "#dc0032",
        tertiary: "#ffc300",
        accents: "#554e44",
        background: "white",
        primaryText: "#3F3D56",
        pink: "#e5445f",
        grey: "rgba(85, 85, 85, 1)",

        // Hover states
        primaryHover: "#caddd2"
    },
    term: {
        open: "green",
        warning: "yellow",
        closed: "red",
    },
};

const theme = extendTheme({colors})
const isAuthenticated = AuthService.isUserAuthenticated()
const isAdmin = AuthService.isAdmin()

function App() {


    //TODO dashboard needs to redirect unauthenticated users
    return (
        <Router>
            <ChakraProvider theme={theme}>
                <PeriNavbar/>
                <Switch>
                    <Route exact path="/">
                        {isAuthenticated ? <Redirect to="/Dashboard"/> : <Redirect to="/Login"/>}
                    </Route>
                    <IsLoggedIn exact authed={isAuthenticated}
                                component={Login} path="/Login"/>
                    <Private exact authed={isAuthenticated}
                             component={Dashboard} path="/Dashboard"/>
                    <Private exact authed={isAdmin}
                             component={Register} path="/Register"/>
                    <Private exact authed={isAuthenticated}
                             component={ProjectDetails} path="/ProjectDetails/:projectId"/>
                    <Private exact authed={isAuthenticated}
                             component={Timeline} path="/Timeline/:projectId"/>
                </Switch>
            </ChakraProvider>
        </Router>
    );
}

export default App;
