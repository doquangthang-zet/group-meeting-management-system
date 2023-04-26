import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/groupSlice'
import { selectUser } from "../redux/slices/userSlice";
import {
	Button,
	Box,
	Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from '@chakra-ui/react'
import { HiOutlineUserGroup, HiOutlineSearch} from "react-icons/hi";
import { MdGroupAdd} from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import CreateGroup from "./CreateGroup";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const navigateToJoin = () => {
    navigate('/join')
  }
  const navigateToGroupDetails = () => {
    navigate('/groupDetails/GSXTWDPcgBRMEhfVJATg9')
  }
  return (
    <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto"> 
        <Heading
          color="#A27083"
          textAlign="center"
          fontSize='2xl'
      >
          Group
      </Heading>
    {/* <Divider orientation='horizontal' /> */}
    <VStack>
      <InputGroup mt="10px" mb="10px">
        <InputLeftElement
          pointerEvents='none'
          children={<HiOutlineSearch color='gray.300' />}
        />
        <Input placeholder='Search...' />
      </InputGroup>
        <Table variant='simple' size="lg">
          <Thead bg="#A27083">
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Members</Th>
              <Th color="white">Date</Th>
              <Th color="white">Time</Th>
              <Th color="white">Location</Th>
              <Th color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr onClick={() => navigateToGroupDetails()}>
              <Td>Cloud Computing</Td>
              <Td>3</Td>
              <Td >25/4/2023</Td>
              <Td>3:00PM</Td>
              <Td>RMIT</Td>
              <Td ><Button
                variant='ghost' colorScheme="red">
                  Leave
                </Button></Td>
            </Tr>
            <Tr>
              <Td>Cloud Computing</Td>
              <Td>3</Td>
              <Td >25/4/2023</Td>
              <Td>3:00PM</Td>
              <Td>RMIT</Td>
              <Td ><Button
                variant='ghost' colorScheme="red">
                  Leave
                </Button></Td>
            </Tr>
            <Tr>
              <Td>Cloud Computing</Td>
              <Td>3</Td>
              <Td >25/4/2023</Td>
              <Td>3:00PM</Td>
              <Td>RMIT</Td>
              <Td ><Button
                variant='ghost' colorScheme="red">
                  Leave
                </Button></Td>
            </Tr>
          </Tbody>
        </Table>
      <Flex w="100%" justify="space-between">
          <Button leftIcon={<HiOutlineUserGroup />} onClick={navigateToJoin} boxShadow="2xl" bg="whiteAlpha.900" variant='solid' color="#A27083">
            Join Group
          </Button>
          
          <Box>
            <Button onClick={onOpen} leftIcon={<MdGroupAdd />} boxShadow="2xl" bg="whiteAlpha.900" variant='solid' color="#A27083">
              Create Group
            </Button>
            <CreateGroup isOpen={isOpen} onClose={onClose} />
          </Box>
      </Flex>
    </VStack>
    </Box>
    )
}

export default Group