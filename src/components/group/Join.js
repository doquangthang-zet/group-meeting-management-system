import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { createGroupRequestAsync, decrement, increment, selectGroup } from '../../redux/slices/groupSlice'
import { selectUser } from "../../redux/slices/userSlice";
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
  Icon,
  IconButton,
  useToast,
  Spinner,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdGroupAdd, MdCheckCircle, MdAdd } from "react-icons/md";
import CreateGroup from "./CreateGroup";
import { useDisclosure } from "@chakra-ui/react";
import { createRequest, groupAPI, groupNUserAPI, notifAPI } from "../../dynamoDB";


const Join = () => {
  const count = useSelector((state) => state.group.value)
  const [grpData, setGrpData] = useState([])
  const [_requestSet, setRequestSet] = useState(null)
  const { user } = useSelector(selectUser)
  const { status } = useSelector(selectGroup)
  const [loading, setLoading] = useState(true)
  console.log("Loading", loading)
  const [selectedIndex, setSelectedIndex] = useState([])
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const fetchGroupData = async () => {
    const response = await fetch(groupAPI)
    const currentResponse = await fetch(groupNUserAPI)
    let requestSet = new Set()
    if (_requestSet) {
      requestSet = _requestSet
    } else {
      const requestResponse = await fetch(notifAPI)
      try {
        const requestJson = await requestResponse.json()
        requestSet = requestJson.Items.filter((item) => item.senderid === user.sub).map(value => value.groupid)
        setRequestSet(requestSet)
        console.log("REquest set", requestSet)
      } catch (e) {
        console.log(e)
      }
    }
    try {
      const responseJson = await response.json()
      const currentJson = await currentResponse.json()
      const newCurrent = currentJson.Items.filter((item) => item.userid === user.sub).map(value => value.groupid)
      const result = responseJson.Items.filter((item) => !newCurrent.includes(item.id) && !requestSet.includes(item.id))
      setGrpData(result)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchGroupData()
  }, [])

  const handleCreateRequest = (data, index) => {

    setSelectedIndex(prev => {
      const isInclude = selectedIndex.includes(index)
      if (isInclude) {
        return selectedIndex.filter(item => item !== index)
      } else {
        return [...prev, index]
      }
    })
    const requestData = {
      "senderid": user.sub,
      "receiverid": data[1],
      "groupid": data[0],
      "status": 0,
    }

    dispatch(createGroupRequestAsync(requestData))
    toast({
      title: "Success",
      description: "Your request has been sent!",
      status: "success",
      duration: 4000,
      isClosable: true,
    })

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
            {loading ?
            <Tr>
              <Td colSpan={10}>
                <Stack w='100'>
                  <Skeleton isLoaded={!loading} height='20px' w='100' />
                  <Skeleton isLoaded={!loading} height='20px' w='100' />
                  <Skeleton isLoaded={!loading} height='20px' w='100' />
                  <Skeleton isLoaded={!loading} height='20px' w='100' />
                </Stack>
              </Td>
            </Tr>
              :
              grpData.map((item, index) => (
                <Tr key={index}>
                  <Td textAlign="center">{item.groupname}</Td>
                  {/* <Td textAlign="center">3</Td> */}
                  <Td textAlign="center">{item.date}</Td>
                  <Td textAlign="center">{item.time}</Td>
                  <Td textAlign="center">{item.location}</Td>
                  {!selectedIndex.includes(index) ?
                    <Td textAlign="center"><Button variant='ghost' colorScheme="green" onClick={() => handleCreateRequest([item.id, item.host], index)} >Join</Button></Td>
                    :
                    <Td textAlign="center"><Icon w={6} h={6} color='green.500' as={MdCheckCircle} /></Td>
                  }
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        <Flex w='100%'>
          <Button leftIcon={<MdGroupAdd color='#E48181' />} mt='1' float='right' onClick={onOpen} color='#E48181' background='white' borderRadius='10' size='md' alignItems='center'>
            Create Group
          </Button>
          <CreateGroup isOpen={isOpen} onClose={onClose} />
        </Flex>
      </VStack>
    </Box >
  )
}

export default Join;


