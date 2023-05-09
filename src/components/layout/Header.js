import React, { useEffect, useState } from 'react'
import {
	Link
} from "react-router-dom";
import Proptypes from 'prop-types'
import {
	Box, Image, Avatar, Flex, Spacer,
	VStack, Text, Icon, HStack, Button,
	Show,
} from '@chakra-ui/react'
import { MdMenu } from "react-icons/md";

import logo from "../../images/rmit_logo.svg"
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { getUserbyId } from '../../dynamoDB';


const Header = ({ menuBtnRef, onOpen }) => {
	const { route } = useAuthenticator((context) => [context.route]);
	const {user, isAuthenticated} = useSelector(selectUser)
	const [userInfo, setUserInfo] = useState({})

	console.log(userInfo.username)

	const fetchUserInfo = (userid) => {
		getUserbyId(userid).then((item) => setUserInfo(item.Item))
	}

	useEffect(() => {
		if(isAuthenticated == 'authenticated'){
			fetchUserInfo(user.sub)
		}
	},[user.sub])
	
	return (
		<Box
			bg="#A27083"
			color="white"
			p={{ base: "10px", md: "15px", lg: "20px" }}
			pl={{ base: "10px", md: "40px", lg: "60px" }}
			pr={{ base: "10px", md: "30px", lg: "50px" }}
			w="100%"
		>
			<Flex gap={{ base: 1, md: 5 }}>
				<Button
					display={{ base: "block", md: "none" }}
					ref={menuBtnRef}
					variant="ghost"
					colorScheme="white"
					onClick={onOpen}
					p="0px"
				>
					<Icon as={MdMenu} w="30px" h="30px" />
				</Button>

				<HStack w='65%'>
					<Link to="/">
						<Image src={logo} alt="RMIT Logo" w={{ base: "70px", md: "100px" }} />
					</Link>


				</HStack>
				<Spacer />

				{route == 'authenticated' ? 
				<HStack gap='2'>
					<Avatar
						display={{ base: "none", md: "block" }}
						name={userInfo ? userInfo.username : 's'}
						size='md'
					/>
					<VStack spacing="2px" align='stretch'
						display={{ base: "none", md: "block" }}
					>
						{userInfo && <Text  fontSize="md" fontWeight="bold" textAlign="left">{userInfo.username}</Text> }
						<Text fontSize="sm" textAlign="left">{user.email}</Text>
					</VStack>
				</HStack>
				:<HStack></HStack>}
			</Flex>
		</Box>
	)
}

Header.propTypes = {
	menuBtnRef: Proptypes.object,
	onOpen: Proptypes.func,
}

export default Header