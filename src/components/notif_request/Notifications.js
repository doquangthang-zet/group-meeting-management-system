import React from 'react';
import { Card, CardBody, Text, CardHeader, Heading, IconButton, VStack, Box, Spinner, Center, useToast, Alert, Divider, Flex } from "@chakra-ui/react"
import { BsCheck2 } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { createGroupNUser, deleteRequest, getGroupbyId, getUserbyId, notifAPI, updateRequest } from '../../dynamoDB';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { GROUP_ADD_MEMBER_SUCCESS, GROUP_DELETE_REQUEST_SUCCESS, GROUP_IDLE, addMemberToGroupAsync, changeGroupStatus, deleteRequestAsync, selectGroup } from '../../redux/slices/groupSlice';
const STATUS_PENDING = 0;
const STATUS_ACCEPTED = 1;
const STATUS_REJECTED = 2;

const Notifications = () => {
    const { user } = useSelector(selectUser)
    const [requestData, setRequestData] = useState([])
    console.log(requestData)
    const { status } = useSelector(selectGroup)
    console.log("STATUS", status)
    const dispatch = useDispatch()
    const [userDict, setUserDict] = useState({})
    const [groupDict, setGroupDict] = useState({})
    const [loading, setLoading] = useState(true)
    const toast = useToast()

    // Get request infos
    const fetchRequestData = async () => {
        const requestResponse = await fetch(notifAPI)
        try {
            const requestJson = await requestResponse.json()
            const data = requestJson.Items.filter((item) => item.receiverid === user.sub && item.status == STATUS_PENDING)
            fetchData(data)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    // Create notif data to display
    const fetchData = async (reflist) => {
        const result = []
        try {
            const userData = await fetchSenderData(reflist)
            const groupData = await fetchGroupData(reflist)
            for (let i = 0; i < reflist.length; i++) {
                let senderData = userData[reflist[i].senderid]
                let grpData = groupData[reflist[i].groupid]
                console.log(grpData)
                result.push({
                    id: reflist[i].id,
                    senderEmail: senderData.useremail,
                    senderName: senderData.username,
                    groupname: grpData.groupname,
                    ...reflist[i]
                })
            }
        } catch (e) {
            console.log(e)
        }

        setRequestData(result)
    }

    //Get sender dict
    const fetchSenderData = async (reflist) => {
        const senderData = { ...userDict }

        for (let i = 0; i < reflist.length; i++) {
            try {
                let id = reflist[i].senderid
                if (id in senderData) {
                    continue
                }

                await getUserbyId(id).then(item => {
                    senderData[id] = item.Item
                })
            } catch (e) {
                console.log(e)
            }
        }
        setUserDict(senderData)
        return senderData
    }

    const fetchGroupData = async (reflist) => {
        const groupData = { ...groupDict }

        for (let i = 0; i < reflist.length; i++) {
            try {
                let id = reflist[i].groupid
                if (id in groupData) {
                    continue
                }

                await getGroupbyId(id).then(item => {
                    groupData[id] = item.Item
                })
            } catch (e) {
                console.log(e)
            }
        }
        setGroupDict(groupData)
        console.log("GROUP DATA", groupData)
        return groupData
    }

    const errorMessage = (message) => {
        Alert.alert(
            "Fail",
            message,
            [{ text: "OK" }],
            { cancelable: true }
        );
    }


    useEffect(() => {
        fetchRequestData()
    }, [])

    useEffect(() => {
        if (status === GROUP_ADD_MEMBER_SUCCESS) {
            toast({
                title: "Add New Member Successfully",
                description: "Succesfully",
                status: "success",
                duration: 4000,
                isClosable: true,
            })
            dispatch(changeGroupStatus(GROUP_IDLE))
        } else if (status === GROUP_DELETE_REQUEST_SUCCESS) {
            toast({
                title: "Rejected Request Successfully",
                description: "Succesfully",
                status: "success",
                duration: 4000,
                isClosable: true,
            })
        }
    }, [status])

    const handleDelete = (id) => {
        dispatch(deleteRequestAsync(id))
    }


    //Handle change status (Data = status + notifData)
    const handleChange = async (data) => {
        const { id, groupid, receiverid, senderid } = data.data;
        try {
            //update request status
            const newRequestInfo = {
                id: id,
                groupid: groupid,
                receiverid: receiverid,
                senderid: senderid,
                status: data.status
            }
            const fRequestInfo = JSON.stringify(newRequestInfo)

            updateRequest(fRequestInfo)


            //Add user to group
            if (data.status === STATUS_ACCEPTED) {
                const addMemberInfo = {
                    groupid: groupid,
                    role: "member",
                    userid: senderid
                }
                dispatch(addMemberToGroupAsync(addMemberInfo))
            } else if (data.status === STATUS_REJECTED) {
                handleDelete(id)
                // deleteRequest(id)
            }
        } catch (e) {
            errorMessage(e.message)
        }
    }


    return (
        <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
            <Heading
                color="#A27083"
                textAlign="center"
                fontSize='2xl'
            >
                Notifications
            </Heading>
            {loading ?
                <Center w='100' mt='10em'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center> :
                requestData.length === 0 ? <Flex w='100' mt='10'><Text>There is no notifications now</Text></Flex>
                :requestData.map((item, index) => (
                    <Card key={index} m="2em" borderRadius='2xl' size="md" boxShadow='md' p='6' rounded='sm' >
                        <CardHeader>
                            <Heading size="sm" ml="0.5em">{item.senderName}</Heading>
                        </CardHeader>
                        <CardBody mt="-1em">
                            <Text ml="0.5em">{item.senderEmail} wanted to join your group {item.groupname}!
                                <IconButton float="right" mr="1em" mt="-1.25em" variant="ghost" icon={<IoMdClose size="2em" color="#E48181" />} onClick={() => handleChange({ status: STATUS_REJECTED, data: item })} />
                                <IconButton float={"right"} mt="-1.25em" variant="ghost" icon={<BsCheck2 float="right" size="2em" color="#306643" />} onClick={() => handleChange({ status: STATUS_ACCEPTED, data: item })} />
                            </Text>
                        </CardBody>
                    </Card>
                ))
            }
        </Box>
    );
}

export default Notifications;
