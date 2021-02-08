import React from "react";
import { Box, Heading } from "@chakra-ui/react"
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import {Flex, Grid, Text} from "@chakra-ui/layout";
import '.././App.css';


const Login = () => {
    const [Email, setEmail] = React.useState("");
    const [passWord, setPassWord] = React.useState("");

    return (
        <div>
            <Grid width="full" align="center" justifyContent="center">
                <Box my={30} color="brand.txtColP" bg="brand.background" p={8} maxWidth="780px" borderWidth={1} boxShadow="md">
                    <Box textAlign="center">
                        <Heading>Sign into your <span className="PERI">PERI</span> Dashboard</Heading>
                    </Box>

                    <Box my={15} textAlign="left">
                        <form>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input borderRadius={5} type="email" id="email" name="email" placeholder="yourEmail@peri.ltd" />
                            </FormControl>

                            <FormControl mt={6}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" id="password" name="password" placeholder="*******" />
                            </FormControl>

                            <Button bg="brand.secondary" color="brand.background" width="full" mt={4} type="submit">
                                Sign In
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
        </div>
    );
};

export default Login;