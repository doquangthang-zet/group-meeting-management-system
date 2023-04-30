import {
	Box, Button,
	Divider, Text,
	Heading,
	Input,
	HStack,
    Spacer,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createGroupAsync } from '../redux/slices/groupSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const STATUS_IDLE = 0
const STATUS_CREATING = 1

const CreateGroup = () => {
    const [status, setStatus] = useState(STATUS_IDLE)
    const [name, setName] = useState("");
    const [date, setDate] = useState("")
    const[time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const {user} = useSelector(selectUser)
    const dispatch = useDispatch();
    const groupID = nanoid();
    const groupNuserID = nanoid();
    const userID = user.sub;
    const toast = useToast()
    const navigate = useNavigate()

    const handleAdd = async() => {
        if(name === ""){
            toast({
                title: "Missing Name",
                description: "Please enter a name for this group",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        if(date === ""){
            toast({
                title: "Missing date",
                description: "Please enter a meeting date for this group",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        if(time === ""){
            toast({
                title: "Missing time",
                description: "Please enter meeting time for this group",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        if(location === ""){
            toast({
                title: "Missing location",
                description: "Please enter a meeting location for this group",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        try{
            setStatus(STATUS_CREATING)
            dispatch(createGroupAsync({groupID, date, name, userID, location, time, groupNuserID}))
            setStatus(STATUS_IDLE)
            toast({
                title: "Success",
                description: "Your group is successfully created!",
                status: "success",
                duration: 4000,
                isClosable: true,
              })
        } catch(e){
            toast({
                title: "Unexpected Error",
                description: "There is an error when creating new group. Please try again in a few minutes.",
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }
    }
        
  
    return(
    <Box w='90%' mt='1em' p='1em' ml="auto" mr="auto" bg="white" borderRadius="1em">
        <Heading
        color="#A27083"
        textAlign="center"
        fontSize='2xl'
        >
        Create Group
        </Heading>
        <HStack mt="10px" mb="10px" justify="space-between">
            <Text
                fontWeight="bold"
                color="#A27083"
            >
                Group Information
            </Text>
            {/* <Spacer/> */}
            <Button
                mt="30px"
                color="white"
                bg="#A27083"
                loadingText="Creating group"
                onClick={() => handleAdd()}
            >
                Create
            </Button>
        </HStack>
        <Divider />
        <Box mt="30px">
            <HStack mt="10px">
                <Text fontWeight="medium" w="40%">Name</Text>
                    <Input
                        type='text'
                        w={{base: "100%", sm: "70%"}}
                        borderColor="black"
                        maxH="35px"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </HStack>
                <HStack mt="30px">
                    <Text fontWeight="medium" w="40%">Date</Text>
                    <Input
                        type='date'
                        w={{base: "100%", sm: "70%"}}
                        borderColor="black"
                        maxH="35px"
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                    />
                </HStack>
                <HStack mt="30px">
                    <Text fontWeight="medium" w="40%">Time</Text>
                    <Input
                        type='text'
                        w={{base: "100%", sm: "70%"}}
                        borderColor="black"
                        maxH="35px"
                        value={time} 
                        onChange={(e) => setTime(e.target.value)}
                    />
                </HStack>
                <HStack mt="30px">
                    <Text fontWeight="medium" w="40%">Location</Text>
                    <Input
                        type='text'
                        w={{base: "100%", sm: "70%"}}
                        borderColor="black"
                        maxH="35px"
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </HStack>
        </Box>
    </Box>

    )
}

export default CreateGroup