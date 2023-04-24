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
        Button} from '@chakra-ui/react';
import {SearchIcon, AddIcon} from '@chakra-ui/icons';


const Join = () => {
    const count = useSelector((state) => state.group.value)
    const {user} = useSelector(selectUser)


    return (
        <div>
          <div>
            <InputGroup m='2em'>
              <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300'/>} />
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
              <Tbody background='white'>
                <Tr>
                  <Td>BI</Td>
                  <Td>3</Td>
                  <Td>23/4/2023</Td>
                  <Td>3:00 PM</Td>
                  <Td>The Coffee House Tran Hung Dao</Td>
                  <Td color='green'>Join</Td>
                </Tr>
                <Tr>
                  <Td>BI</Td>
                  <Td>3</Td>
                  <Td>23/4/2023</Td>
                  <Td>3:00 PM</Td>
                  <Td>The Coffee House Tran Hung Dao</Td>
                  <Td color='green'>Join</Td>
                </Tr>
                <Tr>
                  <Td>BI</Td>
                  <Td>3</Td>
                  <Td>23/4/2023</Td>
                  <Td>3:00 PM</Td>
                  <Td>The Coffee House Tran Hung Dao</Td>
                  <Td color='green'>Join</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button leftIcon={<AddIcon color='#E48181'/>} color='#E48181' float='right' mr='2em' background='white' borderRadius='15' size='md'>
            Create Group
          </Button>
        </div>
      )
}

export default Join;