import{
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const DeleteGroup = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    console.log(props)
    return(
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Delete?</ModalHeader>
      <ModalBody>Do you want to delete this group?</ModalBody> 
      <ModalBody>Notice: If you delete this group, other members will be automatically removed from the group.</ModalBody>
      <ModalCloseButton />
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='solid' colorScheme="red">Delete</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    )
}

export default DeleteGroup

  // <Td ><Button
                    //   variant='ghost' colorScheme="red" onClick={onOpen}>
                    //   Leave
                    // </Button>
                    {/* <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Delete?</ModalHeader>
                        <ModalBody>Do you want to delete this group?</ModalBody> 
                        <ModalBody>Notice: If you delete this group, other members will be automatically removed from the group.</ModalBody>
                        <ModalCloseButton />
                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button variant='solid' colorScheme="red">Delete</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal> */}
                  //   <Button
                  //     variant='ghost' colorScheme="red" onClick={() => {onOpen()}}>
                  //     Check id
                  //   </Button>
                  //   <AlertDialog
                  //     isOpen={isOpen}
                  //     onClose={onClose}
                  // >
                  // <AlertDialogOverlay>
                  //     <AlertDialogContent>
                  //         <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  //             Delete Component Pending
                  //         </AlertDialogHeader>

                  //         <AlertDialogBody>
                  //             Are you sure to delete component? You can&apos;t undo this action afterwards.
                  //         </AlertDialogBody>

                  //         <AlertDialogFooter>
                  //             <Button onClick={onClose}>
                  //             No
                  //             </Button>
                  //             <Button colorScheme='red' id={group.id} onClick={() => handleDeleteforHost(group.id)} ml={3}>
                  //             Yes
                  //             </Button>
                  //         </AlertDialogFooter>
                  //     </AlertDialogContent>
                  //  </AlertDialogOverlay>
                  // </AlertDialog>
                  //   </Td> 