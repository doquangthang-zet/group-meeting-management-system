import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/slices/userSlice"
import { getUserbyId } from "../../dynamoDB"
import { Avatar, Box, Button, ButtonGroup, Center, GridItem, HStack, Heading, Skeleton, Spacer, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
import { Flex, Grid } from "@aws-amplify/ui-react"
import UpdateForm from "./UpdateForm"
import { Link } from "react-router-dom"

const UserProfile = () => {
    const [userData, setUserData] = useState({})
    console.log(userData)
    const { user } = useSelector(selectUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserbyId(user.sub).then((item) => {
            setUserData(item.Item)
            setLoading(false)
        })
    }, [])

    return (
        <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
            <Flex w='100%' mt='1em' ml="auto" mr="auto" alignItems='center' gap='2' bg='red'>
                <Box p='2'>
                    <Heading color='#A27083' size='lg'>User Info</Heading>
                </Box>
                <Spacer/>
                <ButtonGroup gap='2'>
                <Link to={`/updateProfile`}><Button bg='#A27083' color='white'>Update</Button></Link>
                </ButtonGroup>
            </Flex>
            {loading ?
            <Center w='100%' alignItems='left' ml="auto" mr="auto">
                <Stack w='100' bg='white'>
                    <Skeleton isLoaded={!loading} height='20px' w='100' />
                    <Skeleton isLoaded={!loading} height='20px' w='100' />
                    <Skeleton isLoaded={!loading} height='20px' w='100' />
                    <Skeleton isLoaded={!loading} height='20px' w='100' />
                  </Stack>
            </Center>
            :
            <Center w='100%' alignItems='left' ml="auto" mr="auto">
                <HStack w='100%' gap={10} mt='3rem' bg='white'>
                    <VStack w='40%' alignContent='left'>
                        <HStack gap='10px' p='0.75em' alignContent='center'>
                            <Avatar
                                display={{ base: "none", md: "block" }}
                                name={userData.username}
                                size='md'
                            />
                            <VStack spacing="4px" align='stretch'
                                display={{ base: "none", md: "block" }}
                            >
                                <Text fontWeight="bold" textAlign="left" fontSize='18px'>{userData.username}</Text>
                                <Text fontSize="sm" textAlign="left">{userData.useremail}</Text>
                            </VStack>
                        </HStack>
                    </VStack>
                    <VStack w='60%' gap={10} p='2rem'>
                        <HStack w='100%' alignItems='center'>
                            <Text as='b' textColor='#11142D' fontSize='15px' w='35%'>Email</Text>
                            <Text borderRadius='5px' borderColor='gray.400'>{userData.useremail}</Text>
                        </HStack >
                        <HStack w='100%' alignItems='center'>
                            <Text as='b' textColor='#11142D' fontSize='15px' w='35%'> Phone Number</Text>
                            <Text borderRadius='5px' borderColor='gray.400'>{userData.phone_number}</Text>
                        </HStack >
                        <HStack w='100%' alignItems='center'>
                            <Text as='b' textColor='#11142D' fontSize='15px' w='35%'> UserName</Text>
                            <Text borderRadius='5px' borderColor='gray.400'>{userData.username}</Text>
                        </HStack >
                        <HStack w='100%' alignItems='center'>
                            <Text as='b' textColor='#11142D' fontSize='15px' w='35%'>Gender</Text>

                            <Text borderRadius='5px' borderColor='gray.400' >{userData.gender?.length == 0 ? 'N/A' : userData.gender}</Text>

                        </HStack >
                        <HStack w='100%' alignItems='left'>
                            <Text as='b' textColor='#11142D' fontSize='15px' w='35%'>Description</Text>
                            <Text borderRadius='5px' borderColor='gray.400' h="100%" >{userData.description?.length == 0 ? 'N/A' : userData.description}</Text>
                        </HStack >
                    </VStack>
                </HStack>
            </Center>
}
        </Box>
    )
}
export default UserProfile;