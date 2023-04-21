import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { Button, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { createGroup, updateGroup, getGroupbyId, deleteGroup, deleteGroupNUser } from './dynamoDB';


function App() {
  const [id, setId] = useState()
  const [host, setHost] = useState()
  const [location, setLocation] = useState()
  const [groupName, setGroupName] = useState()
  const API = ' https://1f4rcj5abe.execute-api.ap-southeast-1.amazonaws.com/dev/groupnuser';
  const fetchData = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }

  useEffect(() => {
    const res = getGroupbyId('123')
    res.then(val => console.log("RES",val.Item))
    fetchData()
  }, [])

  const handleAdd = async() => {
    const data = JSON.stringify({
        id: id,
        host: host,
        location: location,
        memberlist: [],
        groupname: groupName,
    })
    await createGroup(data)
}

const handleUpdate = () => {
  const data = JSON.stringify({id:'123', host : host, location: location , memberlist:[]})
  updateGroup(data)
}

const handleDelete = () =>{
  deleteGroupNUser("jkasjd1j2k1j") //Tạm thời để chạy đc cái delete thì trong API phải có dấu / cuối cùng
}


  return (
    <Stack w={{ base: "90%", lg: "62%" }} align='right' spacing='24px' pt="20px">
      <HStack>
        <Text fontWeight='bold' w='30%' maxW="120px">ID</Text>
        <Input type="text" borderColor='gray.400' w='90%' value={id} onChange={(e) => setId(e.target.value)} />
      </HStack>
      <HStack>
        <Text fontWeight='bold' w='30%' maxW="120px">GroupName</Text>
        <Input type="text" borderColor='gray.400' w='90%' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </HStack>

      <HStack>
        <Text fontWeight='bold' w='30%' maxW="120px">Host</Text>
        <Input type="text" borderColor='gray.400' w='90%' value={host} onChange={(e) => setHost(e.target.value)} />
      </HStack>

      <HStack>
        <Text fontWeight='bold' w='30%' maxW="120px">Location</Text>
        <Input type="text" borderColor='gray.400' w='90%' value={location} onChange={(e) => setLocation(e.target.value)} />
      </HStack>
      
      <HStack>
        <Button
          colorScheme='facebook'
          onClick={() => handleUpdate()}
        >
          Save
        </Button>

      </HStack>
      <HStack>
        <Button
          colorScheme='facebook'
          onClick={() => handleDelete()}
        >
          Delete
        </Button>

      </HStack>
    </Stack>
  );
}

export default App;
