import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from "../../redux/slices/userSlice";
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
  Stack,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { HiOutlineUserGroup, HiOutlineSearch } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import CreateGroup from "./CreateGroup";
import { Link, useNavigate } from "react-router-dom";
import { fetchGroupData, groupAPI, groupNUserAPI } from "../../dynamoDB";
import { useEffect, useState } from "react";

const Group = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSelector(selectUser)
  const [grpDataTest, setGrpDataTest] = useState([])
  console.log("GRPDATATEST", grpDataTest)
  grpDataTest.map((item) => console.log(item))
  // console.log(user)
  const navigate = useNavigate();
  const navigateToJoin = () => {
    navigate('/join')
  }
  const navigateToCreate = () => {
    navigate('creategroup')
  }
  const [grpData, setGrpData] = useState([])
  const [loading, setLoading] = useState(true)
  console.log(grpData)

  const navigateToGroupDetails = (groupid) => {
    navigate(`/groupDetails/${groupid}`)
  }
  const fetchGroupData = async () => {
    const response = await fetch(groupAPI)
    const currentResponse = await fetch(groupNUserAPI)
    try {
      const newResult = []
      const responseJson = await response.json()
      const currentJson = await currentResponse.json()
      const newCurrent = currentJson.Items.filter((item) => item.userid === user.sub).map(value => value.groupid)
      const newCurrentTest = currentJson.Items.filter((item) => item.userid === user.sub)
      const result = responseJson.Items.filter((item) => newCurrent.includes(item.id))
      
      for(let i = 0; i< result.length; i++){
        let ovrData = {}
        for(let j =0 ; j< newCurrentTest.length; j++){
          if(newCurrentTest[j].groupid === result[i].id){
            ovrData = {
              ...result[i],
              gnuid: newCurrentTest[j].id
            }
            console.log(ovrData)
          }
        }
        newResult.push(ovrData)
      }
      console.log("current", newCurrentTest)
      console.log("newReust", newResult)
      
      setGrpData(result)
      setGrpDataTest(newResult)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchGroupData()
  }, [])

  const handleDelete = (id) => {
    console.log(id)
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
        <Table variant='simple' size="lg" bg='white'>
          <Thead bg="#A27083">
            <Tr>
              <Th textAlign="center" color="white">Name</Th>
              <Th textAlign="center" color="white">Date</Th>
              <Th textAlign="center" color="white">Time</Th>
              <Th textAlign="center" color="white">Location</Th>
              <Th textAlign="center" color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
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
              : grpDataTest.map((group) => (
                <Tr key={group.gnuid}>
                  <Td textDecoration='underline' color= "#A27083" textAlign="center" _hover={{cursor: "pointer"}} onClick={() => navigateToGroupDetails(group.id)}><Link to={`/groupDetails/${group.id}`}>{group.groupname}</Link></Td>
                  <Td textAlign="center" p='0'>{group.date}</Td>
                  <Td  textAlign="center" p='0'>{group.time}</Td>
                  <Td>{group.location}</Td>
                  <Td textAlign="center" ><Button
                    variant='ghost' colorScheme="red" onClick={() => handleDelete(group.gnuid)}>
                    Leave
                  </Button></Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        <Flex w="100%" justify="space-between">
          <Button leftIcon={<HiOutlineUserGroup />} onClick={navigateToJoin} boxShadow="2xl" bg="whiteAlpha.900" variant='solid' color="#A27083">
            Join Group
          </Button>
          <Button leftIcon={<MdGroupAdd />} onClick={navigateToCreate} boxShadow="2xl" bg="whiteAlpha.900" variant='solid' color="#A27083">
            Create Group
          </Button>
        </Flex>
      </VStack>
    </Box>
  )
}

export default Group