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
import { deleteGroupNUserAsync } from '../../redux/slices/groupSlice'
import { useDispatch } from 'react-redux'

const LeaveGroup = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const dispatch = useDispatch()

    const handleLeave = (id) => {
      dispatch(deleteGroupNUserAsync(id))
    }
    return(
      <>
    <Button onClick={onOpen}>Leave</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Leave?</ModalHeader>
      <ModalBody>Do you want to leave this group?</ModalBody> 
      <ModalCloseButton />
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          No
        </Button>
        <Button variant='solid' colorScheme="red" onClick={()=> handleLeave(props.id)}>Yes</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
    )
}

export default LeaveGroup
