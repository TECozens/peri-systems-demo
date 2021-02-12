import React, { useState, useEffect } from "react";
import {Box} from "@chakra-ui/react";
import UserService from "../../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <Box>
            {content}
        </Box>
    );
};

export default Home;