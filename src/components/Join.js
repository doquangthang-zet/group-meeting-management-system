import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/groupSlice'
import { selectUser } from "../redux/slices/userSlice";
import {Input, 
        InputGroup, 
        InputLeftElement,
        Table,
        Thead,
        Tbody,
        Tr,
        Th,
        Td,
        TableContainer,
        Button,
        Box} from '@chakra-ui/react';
import {HiOutlineSearch} from 'react-icons/hi';
import { MdGroupAdd} from "react-icons/md";
import CreateGroup from "./CreateGroup";
import { useDisclosure } from "@chakra-ui/react";


const Join = () => {
    const count = useSelector((state) => state.group.value)
    const {user} = useSelector(selectUser)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
          <div>
            <InputGroup m='2em'>
              <InputLeftElement pointerEvents='none' children={<HiOutlineSearch color='gray.300'/>} />
              <Input variant='outline' placeholder="Search" width='100em'/>
            </InputGroup>
          </div>
          <TableContainer m='2em' borderRadius='20px'>
            <Table variant='simple'>
              <Thead bg='#A27083' >
                <Tr >
                  <Th color='white' textAlign="center">Name</Th>
                  <Th color='white' textAlign="center">Members</Th>
                  <Th color='white' textAlign="center">Date</Th>
                  <Th color='white' textAlign="center">Time</Th>
                  <Th color='white' textAlign="center">Location</Th>
                  <Th color='white' textAlign="center">Action</Th>
                </Tr>
              </Thead>
              <Tbody background='white' >
                <Tr>
                  <Td textAlign="center">BI</Td>
                  <Td textAlign="center">3</Td>
                  <Td textAlign="center">23/4/2023</Td>
                  <Td textAlign="center">3:00 PM</Td>
                  <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
                  <Td textAlign="center"><Button variant='ghost' colorScheme="green"> Join </Button></Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">BI</Td>
                  <Td textAlign="center">3</Td>
                  <Td textAlign="center">23/4/2023</Td>
                  <Td textAlign="center">3:00 PM</Td>
                  <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
                  <Td textAlign="center"><Button variant='ghost' colorScheme="green">Join</Button></Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">BI</Td>
                  <Td textAlign="center">3</Td>
                  <Td textAlign="center">23/4/2023</Td>
                  <Td textAlign="center">3:00 PM</Td>
                  <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
                  <Td textAlign="center"><Button variant='ghost' colorScheme="green">Join</Button></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button leftIcon={<MdGroupAdd color='#E48181'/>} onClick={onOpen} color='#E48181' boxShadow="2xl" float='right' mr='2em' background='white' borderRadius='15' size='md'>
            Create Group
          </Button>
          <CreateGroup isOpen={isOpen} onClose={onClose} />
        </div>
      )
}

export default Join;