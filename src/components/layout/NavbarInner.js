import React from 'react'
import Proptypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
	Tag, TagLeftIcon, TagLabel, VStack, Box,
} from '@chakra-ui/react'
import {
    MdGroups,
	MdOutlineSettings,
	MdLogout,
} from "react-icons/md";
import { GoListUnordered } from 'react-icons/go'
import { FaChalkboardTeacher } from "react-icons/fa";
import {GrGroup} from "react-icons/gr"



const NavbarInner = ({ display, mr, mt }) => {
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
			<NavLink to="/group" className="full-width not-active">
				<Tag bg="inherit" color="inherit"
					p="15px"
					w="100%"
					textAlign="left"
					borderRadius="10px"
				>
					
					<TagLabel fontWeight="bold">Add</TagLabel>
				</Tag>
			</NavLink>
			
			<Box className="full-width not-active my-nav-btn">
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
