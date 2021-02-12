import isEmail from "validator";
import {Box} from "@chakra-ui/react";

const email = value => {
    if(!isEmail(value)) {
        return (
            <Box classname="alert alert-danger" role="alert">
                This isn't a valid email!
            </Box>
        );
    }
};