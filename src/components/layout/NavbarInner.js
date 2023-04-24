import React from 'react'
import Proptypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom'
import {
	Tag, TagLeftIcon, TagLabel, VStack,
		Box, Image, Avatar, Flex, Spacer, Text, Icon, HStack, Button,
		Show,
} from '@chakra-ui/react'
import {
    MdGroups,
	MdOutlineSettings,
    MdNotificationsNone,
	MdLogout,
} from "react-icons/md";
import { GoListUnordered } from 'react-icons/go'
import { FaChalkboardTeacher } from "react-icons/fa";
import {GrGroup} from "react-icons/gr"
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';


const NavbarInner = ({ display, mr, mt }) => {
	const { route, signOut } = useAuthenticator((context) => [
		context.route,
		context.signOut
	]);

	const navigate = useNavigate();
	function logOut() {
		signOut();
		navigate('/login');
	}

	const {user} = useSelector(selectUser)
	return (
		<VStack spacing="20px" align='stretch' mr={mr} mt={mt} display={display}>
			<NavLink to="/" className="full-width not-active">
				<Tag bg="inherit" color="inherit"
					w="100%"
					p="15px"
					textAlign="left"
					borderRadius="10px"
				>
                    {/* <TagLeftIcon boxSize='20px' as={MdGroups} /> */}
					<TagLabel fontWeight="bold">Home</TagLabel>
				</Tag>
			</NavLink>
			<NavLink to="/notifications" className="full-width not-active">
				<Tag bg="inherit" color="inherit"
					p="15px"
					w="100%"
					textAlign="left"
					borderRadius="10px"
				>
					{/* <TagLeftIcon boxSize='20px' as={MdNotificationsNone} /> */}
					<TagLabel fontWeight="bold">Notifications</TagLabel>
				</Tag>
			</NavLink>
			
			
			<Box className="full-width not-active my-nav-btn" onClick={logOut}>
			{/* <Box className="full-width not-active my-nav-btn" onClick={signOut}> */}
				<Tag bg="inherit" color="inherit"
					w="100%"
					p="15px"
					textAlign="left"
					borderRadius="10px"
				>
                    {/* <TagLeftIcon boxSize='20px' as={MdLogout} /> */}
					<TagLabel fontWeight="bold">Logout</TagLabel>
				</Tag>
			</Box>

			{route == 'authenticated' ? 
				<HStack gap='2'>
					<Avatar
						display={{ base: "none", md: "block" }}
						name={'s'}
						size='sm'
						ml='1em'
					/>
					<VStack spacing="2px" align='stretch'
						display={{ base: "none", md: "block" }}
					>
						{/* <Text fontSize="md" fontWeight="bold" textAlign="center">{user.email.slice(0,8)}</Text> */}
						<Text fontSize="sm" textAlign="left">{user.email}</Text>
					</VStack>
				</HStack>
				:<HStack></HStack>}
		</VStack>
	)
}

NavbarInner.propTypes = {
	display: Proptypes.object,
	mr: Proptypes.string,
	mt: Proptypes.string,
}

export default NavbarInner
