import React from "react";
import { Box, Heading } from "@chakra-ui/react"
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import {Center, Flex, Grid, GridItem, Square, Text, Wrap, WrapItem} from "@chakra-ui/layout";
import '.././App.css';
import {ReactComponent as ReactLogo} from "../icons/Perinfo.svg"
import Axios from "axios";


const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    return (
    <Flex justifyContent="center"
          align="center"
          width="full"
          my={30}
    >
        <Flex align="center" p={8}  borderWidth={1} boxShadow="md" bg="brand.background" maxWidth="75%">
            <Flex flexDir="column">
                <Box>
                    <Heading>Sign into your <span className="PERI">PERI</span> Dashboard</Heading>
                </Box>

                <Box mt="25%">
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input borderRadius={15} borderColor="brand.accents" focusBorderColor="brand.secondary" size="lg"
                               isRequired type="email" id="email" name="email" placeholder="yourEmail@peri.ltd" />
                    </FormControl>

                    <FormControl>
                        <FormLabel >Password</FormLabel>
                        <Input borderRadius={15} borderColor="brand.accents" focusBorderColor="brand.secondary" size="lg"
                            isRequired type="password" id="password" name="password" placeholder="*******" />
                    </FormControl>

                    <Button
                        width="full" bg="brand.accents" color="brand.background" _hover={{ bg: "crimson" }} borderRadius={15}
                        my={10} size="lg" type="submit">
                        Sign In
                    </Button>
                </Box>
            </Flex>


            <Box>
                <ReactLogo className="Info"/>
            </Box>
        </Flex>
    </Flex>
    );
};

export default Login;