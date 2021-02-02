import React from 'react'
import ExampleComponent from './components/ExampleComponent';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: "#1a365d",
    secondary: "#153e75",
    accents: "#2a69ac",
    open: "green",
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
