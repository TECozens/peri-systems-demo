import {IconButton, Menu, MenuButton, MenuItem, MenuList, Modal} from "@chakra-ui/react";
import {ChevronDownIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";
import {Td, Tr} from "@chakra-ui/table";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button
} from "@chakra-ui/react"
import {useDisclosure} from "@chakra-ui/hooks";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import UserService from "../../../../services/users.service";

const UserTableRow = ({user}) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const [
    values,
    setValues
  ] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password
  })

  const handleChange = ({target}) => {
    setValues({...values, [target.name]: target.value })
  }

  return (
    <Tr key={user.id}>
      <Td>{`${user.firstname} ${user.lastname}`}</Td>
      <Td>{user.email}</Td>
      <Td>
        <Menu placement='bottom-end'>
          <MenuButton as={IconButton} size='sm' colorScheme='red' icon={<ChevronDownIcon w={6} h={6} color='white'/>} />
          <MenuList>
            <MenuItem onClick={onOpen} icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Td>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit user profile</ModalHeader>
          <ModalBody p={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input name='firstname' value={values.firstname} onChange={handleChange} placeholder='First Name' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input name='lastname' value={values.lastname} onChange={handleChange} placeholder="Last name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input name='email' value={values.email} onChange={handleChange} placeholder="Email" />
            </FormControl>
            {/*<FormControl mt={4}>*/}
            {/*  <FormLabel>Password</FormLabel>*/}
            {/*  <Input name='password' value={values.password} onChange={handleChange} placeholder="Password" />*/}
            {/*</FormControl>*/}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Tr>
  )
}

export default UserTableRow;