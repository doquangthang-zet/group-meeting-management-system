import React from 'react'
import Proptypes from 'prop-types'
import {
	Box, Avatar, Text, HStack, VStack,
	Drawer, DrawerBody, DrawerContent,
	DrawerOverlay, DrawerCloseButton,
	Show
} from '@chakra-ui/react'


import NavbarInner from "./NavbarInner"


const Navbar = ({ menuBtnRef, isOpen, onClose }) => {

	return (
		<Box>
			<Show below='md'>
				<Drawer
					isOpen={isOpen}
					placement='left'
					onClose={onClose}
					finalFocusRef={menuBtnRef}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerBody>
							<VStack spacing="20px" align='stretch' mr="20px" mt="30px">
								<HStack>
									<Avatar
										name='Sang Nguyen'
									/>
									<VStack spacing="2px" align='stretch'
									>
										<Text fontSize="md" fontWeight="bold" textAlign="left">Sang Nguyen</Text>
									</VStack>
								</HStack>

								<NavbarInner display={{base: "flex", md: "none"}} mr="0px" mt="30px"/>
							</VStack>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Show>
			<NavbarInner display={{base: "none", md: "flex"}} mr="0px" mt="0px"/>
		</Box>
	)
}

Navbar.propTypes = {
	menuBtnRef: Proptypes.object,
	isOpen: Proptypes.bool,
	onClose: Proptypes.func,
}

export default Navbar
