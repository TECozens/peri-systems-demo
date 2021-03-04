import {Table, Tbody, Th, Thead, Tr, Box, Heading, useBreakpointValue} from "@chakra-ui/react";
import React from "react";
import UserTableRow from "./UserTableRow/UserTableRow";
import {TableCaption} from "@chakra-ui/table";
import {Progress} from "@chakra-ui/progress";

const UserTable = props => {
  const breakpoint = useBreakpointValue({base: 'sm', lg: 'md', xl: 'lg'})

  if (props.users.length > 0) {
    return (
      <Table variant="simple" colorScheme="teal" size={breakpoint}>
        <Thead>
          <Tr>
            <Th> Name </Th>
            <Th> Email </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.users.map(user =>
            <UserTableRow updateUser={props.updateUser} deleteUser={props.deleteUser} key={user._id} user={user} />
          )}
        </Tbody>
      </Table>
    )
  } else {
    return (
      <Box py={2} px={3}>
        <Heading>
          No results found
        </Heading>
        <Heading size='md'>
          Try changing the query provided
        </Heading>
      </Box>
    )
  }
}

export default UserTable;