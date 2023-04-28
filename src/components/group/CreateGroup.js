import {
	Box, Button,
	Divider, Text,
	Modal, ModalOverlay,
	ModalContent, ModalHeader,
	ModalFooter, ModalBody,
	ModalCloseButton,
	Input,
	HStack,
} from '@chakra-ui/react'


const CreateGroup = ({isOpen, onClose}) => {
  
    return(
    <Modal isOpen={isOpen} onClose={onClose}
    size="xl"
>
    <ModalOverlay />
    <ModalContent
        mr="10px"
        ml="10px"
    >
        <ModalHeader textAlign="center" fontWeight="bold" color="#A27083">Create Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text
                fontWeight="medium"
            >
                Group Information
            </Text>
            <Divider />
            <HStack mt="10px">
                <Text w="30%">Name</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    placeholder="Name"
                />
            </HStack>
            <HStack mt="10px">
                <Text w="30%" >Date</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    placeholder="Date"
                />
            </HStack>
            <HStack mt="10px">
                <Text w="30%" >Time</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    placeholder="Time"
                />
            </HStack>
            <HStack mt="10px">
                <Text w="30%" >Location</Text>
                <Input
                    type='text'
                    w={{base: "100%", sm: "70%"}}
                    borderColor="black"
                    maxH="35px"
                    placeholder="Location"
                />
            </HStack>
        </ModalBody>

        <ModalFooter>
            <HStack w="100%">
                <Box w="50%">
                    <Button
                        variant='outline'
                        color="#A27083"
                        onClick={onClose}
                        w="90%"
                    >
                        Cancel
                    </Button>
                </Box>
                <Box w="50%" textAlign={{base: "right", md: "left"}}>
                    <Button
                        color="white"
                        bg="#A27083"
                        w="90%"
                        loadingText="Creating group"
                    >
                        Create
                    </Button>
                </Box>
            </HStack>
        </ModalFooter>
    </ModalContent>
</Modal>
    )
}

export default CreateGroup