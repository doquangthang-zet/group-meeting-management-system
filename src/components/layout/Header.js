import React from 'react'
import {
	Link
} from "react-router-dom";
import Proptypes from 'prop-types'
import {
	Box, Image, Avatar, Flex, Spacer ,
	VStack, Text, Icon, HStack, Button,
	Show,
} from '@chakra-ui/react'
import { MdMenu } from "react-icons/md";

import logo from "../../images/rmit_logo.svg"


const Header = ({ menuBtnRef, onOpen }) => {
	// const {user, isAuthenticated} = useSelector(selectUser)
	// const role = user.role === USER_ROLE_STUDENT ? "Student" : "Technician"

	return (
		<Box
			bg="#A27083"
			color="white"
			p={{base: "10px", md: "15px", lg: "20px"}}
			pl={{base: "10px", md: "40px", lg: "60px"}}
			pr={{base: "10px", md: "30px", lg: "50px"}}
			w="100%"
		>
			<Flex gap={{base: 1, md: 5}}>
				<Button
					display={{base: "block", md: "none"}}
					ref={menuBtnRef}
					variant="ghost"
					colorScheme="white"
					onClick={onOpen}
					p="0px"
				>
					<Icon as={MdMenu} w="30px" h="30px"/>
				</Button>
				
				<HStack w='65%'>
				<Link to="/">
					<Image src={logo} alt="RMIT Logo" w={{base: "70px", md: "100px"}}/>
				</Link>
				{/* <Text
					display={{base: "none", sm: "inline"}}
					fontSize={{sm: "md", md: "lg", lg: "lg"}}
					fontWeight="bold"
					textAlign="right"
                    w='100%'
					// mt={{base: "9px", md: "8px", lg: "7px"}}
					ml={{base: "10px", md: 0}}
				>
					<Link to="/">ONLINE BORROWING SYSTEM</Link>
				</Text> */}
				<Text
					display={{base: "inline", sm: "none"}}
					fontSize="md"
					fontWeight="bold"
					textAlign="left"
					ml="10px"
				>
					<Link to="/">OB SYSTEM</Link>
				</Text>
				</HStack>
				<Spacer />

					<HStack gap='2'>
						<Avatar
							display={{base: "none", md: "block"}}
							name= 'Sang Nguyen'
                            size='md'
						/>
						<VStack spacing="2px" align='stretch'
							display={{base: "none", md: "block"}}
						>
							<Text fontSize="md" fontWeight="bold" textAlign="center">Hula</Text>
                            <Text fontSize="sm" textAlign="left">s3878340@rmit.edu.vn</Text>
						</VStack>
					</HStack>
			</Flex>
		</Box>
	)
}

Header.propTypes = {
	menuBtnRef: Proptypes.object,
	onOpen: Proptypes.func,
}

export default Header
