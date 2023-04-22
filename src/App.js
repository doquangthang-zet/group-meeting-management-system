import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { Button, Grid, GridItem, HStack, Input, Stack, Text, useDisclosure } from '@chakra-ui/react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Group from './components/Group'
import User from './components/User'
import { useRef } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Authentication from './pages/AuthenticationPage/Authentication';
import Home2 from './pages/HomePage/Home2'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/userSlice';
import Home3 from './pages/HomePage/Home3';

function App() {
  const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
    }, [])
  const menuBtnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [id, setId] = useState()
  //   const [host, setHost] = useState()
  //   const [location, setLocation] = useState()
  //   const [groupName, setGroupName] = useState()
  //   const API = ' https://1f4rcj5abe.execute-api.ap-southeast-1.amazonaws.com/dev/groupnuser';
  //   const fetchData = () => {
  //     fetch(API)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res)
  //       })
  //   }

  //   useEffect(() => {
  //     const res = getGroupbyId('123')
  //     res.then(val => console.log("RES",val.Item))
  //     fetchData()
  //   }, [])

  //   const handleAdd = async() => {
  //     const data = JSON.stringify({
  //         id: id,
  //         host: host,
  //         location: location,
  //         memberlist: [],
  //         groupname: groupName,
  //     })
  //     await createGroup(data)
  // }

  // const handleUpdate = () => {
  //   const data = JSON.stringify({id:'123', host : host, location: location , memberlist:[]})
  //   updateGroup(data)
  // }

  // const handleDelete = () =>{
  //   deleteGroupNUser("jkasjd1j2k1j") 
  // }

  return (
    <BrowserRouter>
      <Grid
        templateAreas={`"header header" "nav main"`}
        gridTemplateColumns={{ base: "0px 1fr", md: '200px 1fr', lg: '250px 1fr' }}
      >
        <GridItem area={'header'}>
          <Header menuBtnRef={menuBtnRef} onOpen={onOpen} />
        </GridItem>
        <GridItem
          pt="50px" pb="100px"
          pl={{ base: "0px", md: "20px" }}
          pr={{ base: "0px", md: "20px" }}
          mr="10px"
          boxShadow={{ base: "none", md: "none" }}
          bg='#ffffff'
          area={'nav'} >
          <Navbar menuBtnRef={menuBtnRef} isOpen={isOpen} onClose={onClose} />
        </GridItem>
        <GridItem area={'main'}>
          <Routes>
            <Route path="/group" element={<Group />} />
            <Route path="/user" element={<User />} />
            <Route path="/" element={<Authentication />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/home3" element={<Home3 />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
