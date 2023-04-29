import {
	Box, Button,
	Divider, Text,
	Modal, ModalOverlay,
	ModalContent, ModalHeader,
	ModalFooter, ModalBody,
	ModalCloseButton,
	Input,
	HStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createGroupAsync } from '../redux/slices/groupSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useToast } from '@chakra-ui/react';

const STATUS_IDLE = 0
const STATUS_CREATING = 1

const CreateGroup = ({isOpen, onClose}) => {
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

			onClose()
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
    <Modal isOpen={isOpen} onClose={onClose}
    size="xl"
>
    <ModalOverlay />
    <ModalContent
        mr="10px"
        ml="10px"
    >
        <ModalHeader textAlign="center" fontWeight="bold" color="#A27083">Create Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text
                fontWeight="medium"
            >
                Group Information
            </Text>
            <Divider />
            <HStack mt="10px">
                <Text w="30%">Name</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
            </HStack>
            <HStack mt="10px">
                <Text w="30%" >Date</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                />
            </HStack>
            <HStack mt="10px">
                <Text w="30%" >Time</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                />
            </HStack>
            <HStack mt="10px">
                <Text w="30%" >Location</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                />
            </HStack>
        </ModalBody>

        <ModalFooter>
            <HStack w="100%">
                <Box w="50%">
                    <Button
                        variant='outline'
                        color="#A27083"
                        onClick={onClose}
                        w="90%"
                    >
                        Cancel
                    </Button>
                </Box>
                <Box w="50%" textAlign={{base: "right", md: "left"}}>
                    <Button
                        color="white"
                        bg="#A27083"
                        w="90%"
                        loadingText="Creating group"
                        onClick={() => handleAdd()}
                    >
                        Create
                    </Button>
                </Box>
            </HStack>
        </ModalFooter>
    </ModalContent>
</Modal>
    )
}

export default CreateGroup