//App.js
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { RequireAuth } from './components/auth/RequireAuth';
import { Login } from './components/auth/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Grid, GridItem } from '@chakra-ui/layout';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Group from "./components/group/Group"
import Join from "./components/group/Join"
import CreateGroup from './components/group/CreateGroup';
import Notifications from './components/notif_request/Notifications';
import GroupDetails from './components/group/GroupDetails';
import GroupDetailsUpdate from './components/group/GroupDetailsUpdate';
import UserProfile from './components/setting/UserProfile';
import UpdateForm from './components/setting/UpdateForm';
import GroupNuserInfo from './components/group/groupNuserInfo';
function MyRoutes() {
  const { route } = useAuthenticator((context) => [
    context.route,
  ]);
  const menuBtnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <BrowserRouter>
      <Grid
        templateAreas={`"header header" "nav main"`}
        gridTemplateColumns={{ base: "0px 1fr", md: '200px 1fr', lg: '250px 1fr' }}
      >
        <GridItem area={'header'}>
          <Header menuBtnRef={menuBtnRef} onOpen={onOpen} />
        </GridItem>
        {route == 'authenticated' ?
          <GridItem
            pt="50px" pb="100px"
            pl={{ base: "0px", md: "20px" }}
            pr={{ base: "0px", md: "20px" }}
            mr="10px"
            boxShadow={{ base: "none", md: "none" }}
            bg='#ffffff'
            area={'nav'} >
            <Navbar menuBtnRef={menuBtnRef} isOpen={isOpen} onClose={onClose} />
          </GridItem> : <GridItem></GridItem>}
        <GridItem area='main'>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route element={<RequireAuth route={route} />}>
              <Route path="/">
                {/* <Route index element={<Group />} /> */}
                <Route index element={<Group />} />
                <Route path="/join" element={<Join />}/>
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/creategroup" element={<CreateGroup />} />
                <Route path="/groupdetails/:groupid" element={<GroupDetails />}/>
                <Route path="/groupdetails/update/:groupid" element={<GroupDetailsUpdate />}/>
                <Route path="/memberInfo/:uid" element={<GroupNuserInfo />}/>
                <Route path="/profile" element={<UserProfile />}/>
                <Route path="/updateProfile" element={<UpdateForm />}/>
              </Route>
            </Route>
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;
