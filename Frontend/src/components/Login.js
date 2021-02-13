import React, {useRef, useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input} from "@chakra-ui/react"
import '.././App.css';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import {SimpleGrid} from "@chakra-ui/layout";
import {Image} from "@chakra-ui/image";

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
      AuthService.login(email, password).then(() => {
        setTimeout(() => {
          props.history.push("/Dashboard");
          window.location.reload();
        }, 2000)
      }, (error) => {
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
    <Flex justifyContent="center" align="center" my={30}>
      <Box p={8} boxShadow="sm" borderRadius={8} bg="brand.background" maxWidth={1000} width="100%" mx={20}>
        <Box>
          <Box>
            <Heading textAlign={"center"} mb={0}>Sign into your <span className="PERI">PERI</span> Dashboard</Heading>
          </Box>
        </Box>
        <SimpleGrid minChildWidth="300px" spacing="0px">
          <div className="info-container">
            <Image src="https://thumbs.dreamstime.com/b/people-register-online-set-registration-sign-up-user-interface-users-use-secure-login-password-ui-design-collection-198777651.jpg"/>
          </div>
          <Flex flexDir="column">
            <Box mt={8}>
              <Form onSubmit={handleLogin} ref={form}>

                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    autofocus
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
                  <FormLabel>Password</FormLabel>

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
                  <Box mt={8} align="center" width="full" className="alert alert-danger PERI" role="alert">
                    <b>{message}</b>
                  </Box>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn}/>

                <Flex alignItems="center" mt={8}>
                  <Button
                    type="submit"
                    _disabled={loading}
                    bg="brand.secondary" color="brand.background" _hover={{bg: "crimson"}} borderRadius={8}
                    size="lg" isLoading={loading}
                  >
                    <span>Sign In</span>
                  </Button>
                  <Button ml={4} bg="brand.primary" color="brand.primaryText"
                          _hover={{bg: "brand.primaryHover"}} borderRadius={8} size="lg" _focus={{
                    boxShadow:
                      "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                  }}>Register an account</Button>
                </Flex>
              </Form>
            </Box>
          </Flex>
        </SimpleGrid>
      </Box>

    </Flex>
  );
};

export default Login;