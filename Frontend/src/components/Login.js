import React, {useRef, useState} from "react";
import { Box, Heading, Input, Button, FormControl, FormLabel, Flex } from "@chakra-ui/react"
import '.././App.css';
import {ReactComponent as ReactLogo} from "../icons/Perinfo.svg"
import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import isEmail from 'validator';
import AuthService from "../services/auth.service";

//NOTE Could be Unnecessary
const required = value => {
    if (!value) {
        return (
            <Box className="alert alert-danger" role="alert">
                This field is required *
            </Box>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    //TODO Can Be condensed
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();
        // props.current.validateAll();

        //TODO Change to dashboard later on, Log outputs for issues
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then( () => {
                props.history.push("/dashboard");
                window.location.reload();
            },(error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.message)
                    || error.message || error.toString();

                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            setLoading(false);
        }
    };



    return (
    <Flex justifyContent="center" align="center" width="full" my={30}>
        <Flex align="center" p={8}  borderWidth={1} boxShadow="md" bg="brand.background" maxWidth="75%">
            <Flex flexDir="column">
                <Box>
                    <Heading>Sign into your <span className="PERI">PERI</span> Dashboard</Heading>
                </Box>

                <Box mt="25%">

                    <Form onSubmit={handleLogin} ref={form}>

                        <FormControl>
                            <FormLabel>Email</FormLabel>

                            <Input
                                type="email"
                                id="email"
                                name="email"
                                validations={[required]}
                                onChange={onChangeEmail}
                                placeholder="yourEmail@peri.ltd"
                                borderRadius={15} borderColor="brand.accents" focusBorderColor="brand.secondary" size="lg"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel >Password</FormLabel>

                            <Input
                                type="password"
                                id="password"
                                name="password"
                                validations={[required]}
                                onChange={onChangePassword}
                                placeholder="Enter a password *****"
                                borderRadius={15} borderColor="brand.accents" focusBorderColor="brand.secondary" size="lg"
                            />
                        </FormControl>

                        {message && (
                            <Box mt={15} align="center" width="full" className="alert alert-danger PERI" role="alert">
                                <b>{message}</b>
                            </Box>
                        )}
                        <CheckButton style={{display: "none"}} ref={checkBtn}/>

                        <Button
                            type="submit"
                            _disabled={loading}
                            width="full" bg="brand.accents" color="brand.background" _hover={{ bg: "crimson" }} borderRadius={15}
                            my={10} size="lg"
                        >
                            {loading && (
                                <span>Loading...</span>
                            )}
                            <span>Sign In</span>
                        </Button>


                    </Form>
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