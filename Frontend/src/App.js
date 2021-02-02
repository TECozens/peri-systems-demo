import React from 'react'
import ExampleComponent from './components/ExampleComponent';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: "#f1f1f1",
    secondary: "#dc0032",
    tertiary: "#ffc300",
    accents: "#554e44",
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
    <ExampleComponent />
  </ChakraProvider>
  );
}

export default App;
