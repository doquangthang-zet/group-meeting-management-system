import { Box, Button, Flex, HStack, Heading, Icon, Input, StackDivider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getGroupbyId, getAllGroupNUser, getAllUser, groupAPI, groupNUserAPI } from "../../dynamoDB";
import { GrUpdate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { updateGroupAsync } from "../../redux/slices/groupSlice";

const STATUS_IDLE = 0
const STATUS_CREATING = 1

const GroupDetailsUpdate = () => {
    let params = useParams();
    const [status, setStatus] = useState(STATUS_IDLE)
    const [currentGroup, setCurrentGroup] = useState([]);
    const [groupName, setGroupName] = useState("Hello");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const { user } = useSelector(selectUser)

    const groupID = params.groupid;
    const userID = user.sub;
    const toast = useToast()
    const dispatch = useDispatch();

    
    const formatDate = () => {
        const splitted_date = date.split("-")
        const joined_date = splitted_date[2] + "/" + splitted_date[1] + "/" + splitted_date[0]
        return joined_date
    }

    const formated_date = formatDate();


    const fetchGroupData = async () => {
        const response = await fetch(groupAPI)
        try {
          const data = await response.json()
          const curGroup = data.Items.filter((item) => item.id == params.groupid)

          setCurrentGroup(curGroup)
          setGroupName(curGroup[0].groupname)
          setDate(curGroup[0].date)
          setTime(curGroup[0].time)
          setLocation(curGroup[0].location)
        } catch (e) {
          console.log(e)
        }
    }

    const handleUpdate = async() => {
        if(groupName === ""){
            toast({
                title: "Missing Name",
                description: "Name cannot be empty",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        if(date === ""){
            toast({
                title: "Missing date",
                description: "Date cannot be empty",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        if(time === ""){
            toast({
                title: "Missing time",
                description: "Time cannot be empty",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        if(location === ""){
            toast({
                title: "Missing location",
                description: "Location cannot be empty",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
			return
        }
        try{
            setStatus(STATUS_CREATING)
            dispatch(updateGroupAsync({groupID, formated_date, userID, location, time, groupName}))
            setStatus(STATUS_IDLE)
            toast({
                title: "Success",
                description: "Your group is successfully updated!",
                status: "success",
                duration: 4000,
                isClosable: true,
            })
        } catch(e){
            toast({
                title: "Unexpected Error",
                description: "There is an error when updating current group. Please try again in a few minutes.",
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        fetchGroupData();
    }, [])

    return (
        <Box>
            <VStack
                divider={<StackDivider borderColor='#A27083' />}
                spacing="20px"
                m={{base:"12", md:"8"}}
                align="stretch"
            >
                <Heading
                    color="#A27083"
                    textAlign="center"
                    fontSize='2xl'
                >
                    Update Group Information
                </Heading>

                <VStack
                    align="stretch"
                    spacing="20px"
                    mt='2'
                >
                    <HStack mt="30px" justifyContent="space-between">
                        <Text fontWeight="medium" w="max">Name:</Text>
                        <Input
                            type='text'
                            w={{base: "80%", md: "90%"}}
                            p={{base:"2", md:"3"}}
                            bg="white"
                            borderRadius="xl"
                            border='1px'
                            borderColor='#A27083'
                            value={groupName ?? ""} 
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </HStack>
                    <HStack mt="30px" justifyContent="space-between">
                        <Text fontWeight="medium" w="max">Date:</Text>
                        <Input
                            type='date'
                            w={{base: "80%", md: "90%"}}
                            p={{base:"2", md:"3"}}
                            bg="white"
                            borderRadius="xl"
                            border='1px'
                            borderColor='#A27083'
                            value={date ?? ""} 
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </HStack>
                    <HStack mt="30px" justifyContent="space-between">
                        <Text fontWeight="medium" w="max">Time:</Text>
                        <Input
                            type='text'
                            w={{base: "80%", md: "90%"}}
                            p={{base:"2", md:"3"}}
                            bg="white"
                            borderRadius="xl"
                            border='1px'
                            borderColor='#A27083'
                            value={time ?? ""} 
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </HStack>
                    <HStack mt="30px" justifyContent="space-between">
                        <Text fontWeight="medium" w="max">Location:</Text>
                        <Input
                            type='text'
                            w={{base: "80%", md: "90%"}}
                            p={{base:"2", md:"3"}}
                            bg="white"
                            borderRadius="xl"
                            border='1px'
                            borderColor='#A27083'
                            value={location ?? ""} 
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </HStack>
                    
                    <Flex w="100%" justify={{base: "center", md: "space-between"}}>
                        <Button leftIcon={<GrUpdate />} onClick={() => handleUpdate()} boxShadow="2xl" bg="whiteAlpha.900" variant='solid' color="#A27083" border='1px' borderColor='#A27083'>
                            Update!
                        </Button>
                    </Flex>
                </VStack>
            </VStack>
        </Box>
    )
}

export default GroupDetailsUpdate