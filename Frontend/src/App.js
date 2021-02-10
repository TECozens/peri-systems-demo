import React from 'react'
import ExampleComponent from './components/ExampleComponent';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import PeriNavbar from "./layout/PeriNavbar";


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

const theme = extendTheme({ colors })




function App() {
  return (
  <ChakraProvider theme={theme}>
      <PeriNavbar/>
      <Router>
          <Switch>
              <Route exact path="/Login" component={Login} />
          </Switch>
      </Router>
  </ChakraProvider>
  );
}

export default App;
