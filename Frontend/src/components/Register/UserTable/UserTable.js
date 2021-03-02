import {Button, Table, Tbody, Td, Th, Thead, Tr, Box, Heading, useBreakpointValue, IconButton} from "@chakra-ui/react";
import React from "react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {TableCaption, Tfoot} from "@chakra-ui/table";
import UserTableRow from "./UserTableRow/UserTableRow";

const UserTable = props => {
  const breakpoint = useBreakpointValue({base: 'sm', lg: 'md', xl: 'lg'})

  if (props.filteredUsers.length > 0) {
    return (
      <Table variant="simple" colorScheme="teal" size={breakpoint}>
        <Thead>
          <Tr >
            <Th> Name </Th>
            <Th> Email </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.filteredUsers.map(user =>
            <UserTableRow user={user} />
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