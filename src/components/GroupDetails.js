import { Box, Button, Flex, HStack, Heading, Icon, StackDivider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getGroupbyId, getAllGroupNUser, getAllUser } from "../dynamoDB";
import { GrUpdate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";


const GroupDetails = () => {
    const navigate = useNavigate();
    let params = useParams();
    const [currentGroup, setCurrentGroup] = useState([]);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    const { user } = useSelector(selectUser)
    const dispatch = useDispatch();

    const navigateToGroupUpdate = (groupid) => {
        navigate(`/groupDetails/update/${groupid}`)
    }

    useEffect(() => {
        getGroupbyId(params.groupid).then((res) => {
            setCurrentGroup(res)
        })
        
        getAllGroupNUser().then((res) => {
            setGroups(res)
        });

        getAllUser().then((res) => {
            setUsers(res)
            // console.log(res)
        })
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
                    {currentGroup.Item ? currentGroup.Item.groupname : "Group's Name"}
                </Heading>

                <VStack
                    align="stretch"
                    spacing="20px"
                    mt='2'
                >
                    <Box
                        p={{base:"2", md:"3"}}
                        bg="white"
                        borderRadius="xl"
                        border='1px'
                        borderColor='#A27083'
                    >
                        <Text>
                            Date: {currentGroup.Item && currentGroup.Item.date}
                        </Text>
                    </Box>
                    <Box
                        p={{base:"2", md:"3"}}
                        bg="white"
                        borderRadius="xl"
                        border='1px'
                        borderColor='#A27083'
                    >
                        <Text>
                            Time: {currentGroup.Item && currentGroup.Item.time}
                        </Text>
                    </Box>
                    <Box
                        p={{base:"2", md:"3"}}
                        bg="white"
                        borderRadius="xl"
                        border='1px'
                        borderColor='#A27083'
                    >
                        <Text>
                            Meeting Location: {currentGroup.Item && currentGroup.Item.location}
                        </Text>
                    </Box>
                    <VStack
                        align="stretch"
                        spacing='20px'
                        p={{base:"2", md:"3"}}
                        bg="white"
                        borderRadius="xl"
                    >
                        <Heading fontSize='lg' textAlign={{base:"center", md:"start"}}>
                            Members
                        </Heading>
                        <TableContainer>
                            <Table size="md">
                                <Thead bg="#A27083">
                                    <Tr>
                                        <Th color='white' pl="2" pt="4" pb="4">Name</Th>
                                        <Th color='white' pl="2" pt="4" pb="4">Role</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {groups && groups.Items?.filter((g) => 
                                        g.groupid == params.groupid
                                    ).map((group) => (
                                        <Tr key={group.id}>
                                            <Td pl="2" pt="4" pb="4">
                                                {
                                                    users?.Items?.filter((user) => user.id == group.userid)
                                                    .map((u) => (u.username))
                                                }
                                            </Td>
                                            <Td pl="2" pt="4" pb="4">{group.role == "host" ? "Admin" : "Member"}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                    
                    {groups && groups.Items?.filter((g) => 
                        g.groupid === params.groupid && g.userid === user.sub && g.role === "host"
                    ).map((gr) => 
                        <Flex w="100%" justify={{base: "center", md: "space-between"}}>
                            <Button leftIcon={<GrUpdate />} onClick={() => navigateToGroupUpdate(currentGroup.Item.id)} boxShadow="2xl" bg="whiteAlpha.900" variant='solid' color="#A27083">
                                Update Group
                            </Button>
                        </Flex>
                    )} 
                </VStack>
            </VStack>
        </Box>
    )
}

export default GroupDetails