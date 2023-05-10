import { Accordion, AccordionItem, AccordionPanel, Button, Center, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure, Box, AccordionButton, AccordionIcon, Textarea, useToast, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserbyId, updateUser, userAPI } from "../../dynamoDB";
import { useDispatch, useSelector } from "react-redux";
import { USER_IDLE, USER_UPDATE_PENDING, USER_UPDATE_REJECTED, USER_UPDATE_SUCCESS, changeUserUpdateStatus, selectUser, updateUserAsync } from "../../redux/slices/userSlice";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const UpdateForm = () => {
	const { user, userInfoUpdateStatus } = useSelector(selectUser)
	const [name, setName] = useState("")
	const [avatarUrl, setAvatarUrl] = useState()
	const [avatar, setAvatar] = useState()
	console.log("Name", name)
	console.log("STATUS", userInfoUpdateStatus)
	const [gender, setGender] = useState("")
	const [phone, setPhone] = useState("")
	const [description, setDescription] = useState("")
	const [oldUser, setOldUser] = useState([])
	console.log("OLD", oldUser)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const fetchUserData = async (id) => {
		const response = await fetch(userAPI)
		try {
			const data = await response.json()
			const curUser = data.Items.filter((item) => item.id == user.sub)

			setOldUser(curUser)
			setGender(curUser[0].gender)
			setName(curUser[0].username)
			setDescription(curUser[0].description)
			setPhone(curUser[0].phone_number)
		} catch (e) {
			console.log(e)
		}
	}
	console.log(avatar)
	const handleFileUpload = (e) => {
		setAvatar(e.target.files[0])
		// setAvatarUrl("https://avatar-fileupload.s3.ap-southeast-1.amazonaws.com/" + avatar.name)
		console.log(avatar)
	}

	useEffect(() => {
		fetchUserData(user.sub)
	}, [])

	const checkInput = () => {
		if (name.trim() === "") {
			toast({
				title: "Invalid Input",
				description: "Name must not be empty",
				status: "error",
				duration: 4000,
				isClosable: true,
			})
			return false
		}
		return true
	}

	const handleUpdate = () => {
		if (!checkInput()) {
			return
		}
		try {
			const newUser = {
				'id': user.sub,
				'description': description,
				'gender': gender,
				'phone_number': phone,
				'useremail': user.email,
				'username': name
			}
			if (name !== oldUser.username) {
				newUser.username = name
			}
			if (phone !== oldUser.phone_number) {
				newUser.phone_number = phone
			}
			if (gender !== oldUser.gender) {
				newUser.gender = gender
			}
			if (description !== oldUser.description) {
				newUser.description = description
			}
			console.log("NEWUSER", newUser)
			dispatch(updateUserAsync(newUser))
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (userInfoUpdateStatus === USER_UPDATE_SUCCESS) {
			toast({
				title: "Update Success",
				description: "Your information has been updated succesfully",
				status: "success",
				duration: 4000,
				isClosable: true,
			})
			dispatch(changeUserUpdateStatus(USER_IDLE))
		} else if (userInfoUpdateStatus === USER_UPDATE_REJECTED) {
			toast({
				title: "Update Fail",
				description: "Error",
				status: "error",
				duration: 4000,
				isClosable: true,
			})
			dispatch(changeUserUpdateStatus(USER_IDLE))
		}
	}, [userInfoUpdateStatus])


	return (
		<Center w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
			<VStack w='100%' gap={6}>
				<Heading
					color="#A27083"
					textAlign="center"
					fontSize='2xl'
				>
					Update Form
				</Heading>
				<Breadcrumb color='blue'>
					<BreadcrumbItem>
						<BreadcrumbLink href='/profile'>User Info</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink href='#'>{name && name}</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<VStack w='45%'>
					<Accordion w='100%' allowMultiple bg='white'>
						<AccordionItem>
							<h2>
								<AccordionButton _expanded={{ bg: "#A27083", color: "white" }}>
									<Box as="span" flex='1' textAlign='left'>
										Username
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Text as="b">Username</Text>
								<Input
									placeholder="New name"
									value={name}
									onChange={e => setName(e.target.value)}
									borderWidth="1px"
									borderColor="#DBD7F4"
								></Input>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem>
							<h2>
								<AccordionButton _expanded={{ bg: "#A27083", color: "white" }}>
									<Box as="span" flex='1' textAlign='left'>
										Gender
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Text as="b">Gender</Text>
								<Input
									placeholder="Gender"
									value={gender}
									onChange={e => setGender(e.target.value)}
									borderWidth="1px"
									borderColor="#DBD7F4"
								></Input>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem>
							<h2>
								<AccordionButton _expanded={{ bg: "#A27083", color: "white" }}>
									<Box as="span" flex='1' textAlign='left'>
										Phone Number
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Text as="b">Phone Number</Text>
								<Input
									placeholder="New Phone Number"
									value={phone}
									onChange={e => setPhone(e.target.value)}
									borderWidth="1px"
									borderColor="#DBD7F4"
								></Input>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem>
							<h2>
								<AccordionButton _expanded={{ bg: "#A27083", color: "white" }}>
									<Box as="span" flex='1' textAlign='left'>
										Description
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Text as="b">Description</Text>
								<Textarea
									placeholder="Description about yourself"
									value={description}
									onChange={e => setDescription(e.target.value)}
									borderWidth="1px"
									borderColor="#DBD7F4"
								></Textarea>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem>
							<h2>
								<AccordionButton _expanded={{ bg: "#A27083", color: "white" }}>
									<Box as="span" flex='1' textAlign='left'>
										Username
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Text as="b">Profile Picture</Text>
								<Input
									// placeholder="New name"
									// value={name}\
									type="file"
									onChange={e => handleFileUpload(e)}
									borderWidth="1px"
									borderColor="#DBD7F4"
								></Input>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Flex justify={"flex-end"} w='100%' mt='2rem'>
						<Button
							bg='#A27083'
							color='white'
							onClick={handleUpdate}
						>
							Save
						</Button>
					</Flex>
				</VStack>
			</VStack>
		</Center>
	)
}

export default UpdateForm;