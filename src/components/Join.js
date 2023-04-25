import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/groupSlice'
import { selectUser } from "../redux/slices/userSlice";
import {
  Input,
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
  Box,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdGroupAdd } from "react-icons/md";
import CreateGroup from "./CreateGroup";
import { useDisclosure } from "@chakra-ui/react";


const Join = () => {
  const count = useSelector((state) => state.group.value)
  const { user } = useSelector(selectUser)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    // <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
    //   <VStack>
    //     <InputGroup  mt="10px" mb="10px">
    //       <InputLeftElement pointerEvents='none' children={<HiOutlineSearch color='gray.300' />} />
    //       <Input variant='outline' placeholder="Search" width='100em' />
    //     </InputGroup>

    //     <TableContainer size="lg">
    //       <Table variant='simple'>
    //         <Thead bg='#A27083' >
    //           <Tr >
    //             <Th color='white' textAlign="center">Name</Th>
    //             <Th color='white' textAlign="center">Members</Th>
    //             <Th color='white' textAlign="center">Date</Th>
    //             <Th color='white' textAlign="center">Time</Th>
    //             <Th color='white' textAlign="center">Location</Th>
    //             <Th color='white' textAlign="center">Action</Th>
    //           </Tr>
    //         </Thead>
    //         <Tbody background='white' >
    //           <Tr>
    //             <Td textAlign="center">BI</Td>
    //             <Td textAlign="center">3</Td>
    //             <Td textAlign="center">23/4/2023</Td>
    //             <Td textAlign="center">3:00 PM</Td>
    //             <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
    //             <Td textAlign="center"><Button variant='ghost' colorScheme="green"> Join </Button></Td>
    //           </Tr>
    //           <Tr>
    //             <Td textAlign="center">BI</Td>
    //             <Td textAlign="center">3</Td>
    //             <Td textAlign="center">23/4/2023</Td>
    //             <Td textAlign="center">3:00 PM</Td>
    //             <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
    //             <Td textAlign="center"><Button variant='ghost' colorScheme="green">Join</Button></Td>
    //           </Tr>
    //           <Tr>
    //             <Td textAlign="center">BI</Td>
    //             <Td textAlign="center">3</Td>
    //             <Td textAlign="center">23/4/2023</Td>
    //             <Td textAlign="center">3:00 PM</Td>
    //             <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
    //             <Td textAlign="center"><Button variant='ghost' colorScheme="green">Join</Button></Td>
    //           </Tr>
    //         </Tbody>
    //       </Table>
    //     </TableContainer>
    //     <Button leftIcon={<MdGroupAdd color='#E48181' />} onClick={onOpen} color='#E48181' boxShadow="2xl" float='right' mr='2em' background='white' borderRadius='15' size='md'>
    //       Create Group
    //     </Button>
    //     <CreateGroup isOpen={isOpen} onClose={onClose} />

    //   </VStack>

    // </Box>
    <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
      <Heading
        color="#A27083"
        textAlign="center"
        fontSize='2xl'
      >
        Join Group
      </Heading>
      {/* <Divider orientation='horizontal' /> */}
      <VStack >
        <InputGroup mt="10px" mb="10px">
          <InputLeftElement
            pointerEvents='none'
            children={<HiOutlineSearch color='gray.300' />}
          />
          <Input placeholder='Search...' />
        </InputGroup>
        <Table variant='simple' size="lg" borderRadius='20'>
          <Thead bg="#A27083">
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
      </VStack>
      <Box>
          <Button leftIcon={<MdGroupAdd color='#E48181' />} float='right' onClick={onOpen} color='#E48181' boxShadow="2xl" mt='1em' background='white' borderRadius='10px' size='md'>
            Create Group
          </Button>
          <CreateGroup isOpen={isOpen} onClose={onClose} />
        </Box>
    </Box >
  )
}

export default Join;