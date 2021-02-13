import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Spacer } from "@chakra-ui/react";
import { ReactComponent as ReactLogo } from "../icons/Pericon.svg";
import ".././App.css";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";

const PeriNavbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Box bg="brand.background" boxShadow="lg">
      <Flex alignItems="center" justifyContent="center">
        <Box ml="15%">
          <ReactLogo className="Logo" />
        </Box>
        <Spacer />
        <Box mr="10%">
          {currentUser ? (
            <div>
              <Menu>
                <MenuButton
                  mr={10}
                  as={Button}
                  bg="brand.accents"
                  color="brand.primary"
                >
                  Menu
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Access">
                    <MenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>

              <Button bg="brand.accents" color="brand.primary">
                <a href="/Login" onClick={logOut}>
                  LogOut
                </a>
              </Button>
            </div>
          ) : (
            <Button bg="brand.secondary" color="brand.primary">
              <Link to={"/Login"}>Login</Link>
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default PeriNavbar;
