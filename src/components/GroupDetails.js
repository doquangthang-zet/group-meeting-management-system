import { Box, HStack, Heading, Icon, StackDivider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { MdNotifications } from "react-icons/md"


const GroupDetails = () => {
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
                    Group's Name
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
                            Date: 23/4/2023
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
                            Time: 2:00PM
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
                            Meeting Location: The coffee house Tran Hung Dao
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
                                    <Tr>
                                        <Td pl="2" pt="4" pb="4">May Tran</Td>
                                        <Td pl="2" pt="4" pb="4">Admin</Td>
                                    </Tr>
                                    <Tr>
                                        <Td pl="2" pt="4" pb="4">Hula</Td>
                                        <Td pl="2" pt="4" pb="4">Member</Td>
                                    </Tr>
                                    <Tr>
                                        <Td pl="2" pt="4" pb="4">Han</Td>
                                        <Td pl="2" pt="4" pb="4">Member</Td>
                                    </Tr>
                                    <Tr>
                                        <Td pl="2" pt="4" pb="4">Thang</Td>
                                        <Td pl="2" pt="4" pb="4">Member</Td>
                                    </Tr>
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