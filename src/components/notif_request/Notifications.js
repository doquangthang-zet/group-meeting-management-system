import React from 'react';
import { Card, CardBody, Text, CardHeader, Heading, IconButton, VStack, Box, Spinner, Center } from "@chakra-ui/react"
import { BsCheck2 } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { createGroupNUser, getUserbyId, notifAPI, updateRequest } from '../../dynamoDB';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
const STATUS_PENDING = 0;
const STATUS_ACCEPTED = 1;
const STATUS_REJECTED = 2;

const Notifications = () => {
    const { user } = useSelector(selectUser)
    const [requestData, setRequestData] = useState([])
    const [userDict, setUserDict] = useState({})
    const [loading, setLoading] = useState(true)


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
            for (let i = 0; i < reflist.length; i++) {
                let senderData = userData[reflist[i].senderid]

                result.push({
                    id: reflist[i].id,
                    senderEmail: senderData.useremail,
                    senderName: senderData.username,
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


    useEffect(() => {
        fetchRequestData()
    }, [])


    //Handle change status (Data = status + notifData)
    const handleChange = async (data) => {
        const {id, groupid, receiverid, senderid} = data.data;
        try{

        }catch(e){
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
            
        }

        

        
    }

    return (
        <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
            {loading ? 
            <Center w='100' mt='10em'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                /> 
            </Center>:
                requestData.map((item, index) => (
                    <Card key={index} m="2em" borderRadius='2xl' size="md" boxShadow='md' p='6' rounded='sm' >
                        <CardHeader>
                            <Heading size="sm" ml="0.5em">{item.senderName}</Heading>
                        </CardHeader>
                        <CardBody mt="-1em">
                            <Text ml="0.5em">{item.senderEmail} wanted to join your group!
                                <IconButton float="right" mr="1em" mt="-1.25em" variant="ghost" icon={<IoMdClose size="2em" color="#E48181" />} onClick={() => handleChange({status: STATUS_REJECTED, data: item})} />
                                <IconButton float={"right"} mt="-1.25em" variant="ghost" icon={<BsCheck2 float="right" size="2em" color="#306643" />} onClick={() => handleChange({status: STATUS_ACCEPTED, data: item})} />
                            </Text>
                        </CardBody>
                    </Card>
                ))
            }
        </Box>
    );
}

export default Notifications;
