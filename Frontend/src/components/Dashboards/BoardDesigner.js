import React, { useState, useEffect } from "react";
import {Box} from "@chakra-ui/react";
import UserService from "../../services/user.service";

const BoardDesigner = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getDesignerBoard().then(
            (response) => {
                console.log("User Service got a Response!", response.data)
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log("There was an Issue with the User Service", _content)
                setContent(_content);
            }
        );
    }, []);

    return (
        <Box>
            <h3>{content}</h3>
        </Box>
    );
};

export default BoardDesigner;