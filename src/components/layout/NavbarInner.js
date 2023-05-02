import React from 'react'
import Proptypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom'
import {
	Tag, TagLeftIcon, TagLabel, VStack, Box,
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
import Notifications from '../notif_request/Notifications';



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
	return (
		<VStack spacing="20px" align='stretch' mr={mr} mt={mt} display={display}>
			<NavLink to="/" className="full-width not-active">
				<Tag bg="inherit" color="inherit"
					w="100%"
					p="15px"
					textAlign="left"
					borderRadius="10px"
				>
                    <TagLeftIcon boxSize='20px' as={MdGroups} />
					<TagLabel fontWeight="bold">Group</TagLabel>
				</Tag>
			</NavLink>
			<NavLink to="/notifications" className="full-width not-active">
				<Tag bg="inherit" color="inherit"
					p="15px"
					w="100%"
					textAlign="left"
					borderRadius="10px"
				>
					<TagLeftIcon boxSize='20px' as={MdNotificationsNone} />
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
                    <TagLeftIcon boxSize='20px' as={MdLogout} />
					<TagLabel fontWeight="bold">Logout</TagLabel>
				</Tag>
			</Box>
		</VStack>
	)
}

NavbarInner.propTypes = {
	display: Proptypes.object,
	mr: Proptypes.string,
	mt: Proptypes.string,
}

export default NavbarInner