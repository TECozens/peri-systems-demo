import {
    Box,
    Heading,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    Progress
} from "@chakra-ui/react";
import React from "react";
import { SeparatedHeading } from "../../../Util/SeparatedHeading/SeparatedHeading";
import UserTableRow from "./UserTableRow/UserTableRow";

const UserTable = (props) => {
    const breakpoint = useBreakpointValue({ base: "sm", lg: "md", xl: "lg" });

    if (!props.isLoading) {
        if (props.users.length <= 0) {
            return (
                <Box mt={4}>
                    <SeparatedHeading primary='No Results Found' secondary='Not with this query at least' />
                </Box>
            )
        } else {
            return (
                <Table variant="simple" colorScheme="red" size={breakpoint}>
                    <Thead>
                        <Tr>
                            <Th> Name </Th>
                            <Th> Email </Th>
                            <Th> </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.users.map((user) => (
                            <UserTableRow
                                updateUser={props.updateUser}
                                deleteUser={props.deleteUser}
                                key={user._id}
                                user={user}
                            />
                        ))}
                    </Tbody>
                </Table>
            );
        }

    } else {
        return (
            <Progress size="xs" isIndeterminate />
        );
    }
};

export default UserTable;
