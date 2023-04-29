import React, { useEffect, useState } from "react";
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
  Flex,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdGroupAdd } from "react-icons/md";
import CreateGroup from "./CreateGroup";
import { useDisclosure } from "@chakra-ui/react";
import { groupAPI, groupNUserAPI } from "../dynamoDB";


const Join = () => {
  const count = useSelector((state) => state.group.value)
  const [grpData, setGrpData] = useState([])
  const { user } = useSelector(selectUser)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fetchGroupData = async () => {
    const response = await fetch (groupAPI)
    const currentResponse = await fetch(groupNUserAPI)
    try {
      const responseJson = await response.json()
      const currentJson = await currentResponse.json()
      const newCurrent = currentJson.Items.filter((item) => item.userid !== user.sub).map(value => value.groupid)
      const result = responseJson.Items.filter((item) => newCurrent.includes(item.id))
      setGrpData(result)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchGroupData()
  }, [])
  // const fetchGroupData = async () => {
  //   const response = await fetch(groupAPI)
  //   const currentResponse = await fetch(groupNUserAPI)
  //   try {
  //     const responseJson = await response.json()
  //     const currentJson = await currentResponse.json()
  //     const newCurrent = currentJson.Items.filter((item) => item.userid === user.sub).map(value => value.groupid)
  //     const result = responseJson.Items.filter((item) => !newCurrent.includes(item.id))
  //     console.log(newCurrent)
  //     setGrpData(result)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // useEffect(() => {
  //   fetchGroupData()
  // }, [])
  

  const handleCreateRequest = (data) => {
    console.log("ID",data)
  }

  return (
    <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
      <Heading
        color="#A27083"
        textAlign="center"
        fontSize='2xl'
      >
        Join Group
      </Heading>
      {/* <Divider orientation='horizontal' /> */}
      <VStack w='100%'>
        <InputGroup mt="10px" mb="10px">
          <InputLeftElement
            pointerEvents='none'
            children={<HiOutlineSearch color='gray.300' />}
          />
          <Input placeholder='Search...' />
        </InputGroup>
        <Table variant='simple' size="lg">
          <Thead bg="#A27083">
            <Tr >
              <Th color='white' textAlign="center">Name</Th>
              {/* <Th color='white' textAlign="center">Members</Th> */}
              <Th color='white' textAlign="center">Date</Th>
              <Th color='white' textAlign="center">Time</Th>
              <Th color='white' textAlign="center">Location</Th>
              <Th color='white' textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody background='white'>
            {grpData.map((item) => (
              <Tr key={item.id}>
                <Td textAlign="center">{item.groupname}</Td>
                {/* <Td textAlign="center">3</Td> */}
                <Td textAlign="center">{item.date}</Td>
                <Td textAlign="center">{item.time}</Td>
                <Td textAlign="center">{item.location}</Td>
                <Td textAlign="center"><Button variant='ghost' colorScheme="green" onClick={() => handleCreateRequest([item.id, item.host])}>Join</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex w='100%'>
          <Button leftIcon={<MdGroupAdd color='#E48181' />} mt='1' float='right' onClick={onOpen} color='#E48181' FlexShadow="2xl" background='white' borderRadius='10' size='md' alignItems='center'>
            Create Group
          </Button>
          <CreateGroup isOpen={isOpen} onClose={onClose} />
        </Flex>
      </VStack>
    </Box >
  )
}
