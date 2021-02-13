import React from 'react'
import './App.css';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
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

const theme = extendTheme({colors})
const isAuthenticated = AuthService.isUserAuthenticated()

function App() {


  //TODO dashboard needs to redirect unauthenticated users
  return (
      <Router>
        <ChakraProvider theme={theme}>
        <PeriNavbar/>
          <Switch>
            <Route exact path="/">
              {isAuthenticated ? <Redirect to="/Dashboard" /> : <Redirect to="/Login"/>}
            </Route>
            <Private exact authed={isAuthenticated} component={Dashboard} path="/dashboard"/>
            <Route exact path="/Login" component={Login}/>

          </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
