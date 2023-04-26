import { Box, HStack, Heading, Icon, StackDivider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md"
import { useParams } from "react-router-dom"
import { getGroupbyId, getAllGroupNUser } from "../dynamoDB";


const GroupDetails = () => {
    let params = useParams();
    const [currentGroup, setCurrentGroup] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroupbyId(params.groupid).then((res) => {
            setCurrentGroup(res)
        })
        
        getAllGroupNUser().then((res) => {
            setGroups(res)
        });
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
                                            <Td pl="2" pt="4" pb="4">{group.userid}</Td>
                                            <Td pl="2" pt="4" pb="4">{group.role == "host" ? "Admin" : "Member"}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default GroupDetails