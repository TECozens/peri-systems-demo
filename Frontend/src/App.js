import React from 'react'
import './App.css';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login"
import PeriNavbar from "./layout/PeriNavbar";
import Dashboard from "./components/Dashboard";
import Private from "./components/Private"
import AuthService from "./services/auth.service";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: "#f1f1f1",
    secondary: "#dc0032",
    tertiary: "#ffc300",
    accents: "#554e44",
    background: "white",
    txtColP: "#3F3D56",
  },
  term: {
    open: "green",
    warning: "yellow",
    closed: "red",
  },
}

// TODO change this with new
const USER_ROLES = ['normal', 'technical', 'admin']
const theme = extendTheme({colors})
const isAuthenticated = AuthService.getCurrentUser() !== null

function App() {

  console.log(isAuthenticated)

  //TODO dashboard needs to redirect unauthenticated users
  return (
    <ChakraProvider theme={theme}>
      <PeriNavbar/>
      <Router>
        <Switch>
          <Private exact authed={isAuthenticated} component={Dashboard} path="/dashboard"/>
          <Route exact path="/Login" component={Login}/>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
