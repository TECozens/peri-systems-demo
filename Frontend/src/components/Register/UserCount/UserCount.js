import {Flex, GridItem, Heading} from "@chakra-ui/layout";
import React from "react";
import Register from "../Register";

const UserCount = props => {
  return (
      <Flex direction='column' h='200px' w='100%' py={3} px={3}>
        <Heading size={'md'}>Page</Heading>
        <Heading size={'3xl'}>{props.filteredUsers.length}</Heading>
      </Flex>
  )
}

export default UserCount;