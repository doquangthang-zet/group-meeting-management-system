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
import { deleteForHostAsync } from '../../redux/slices/groupSlice'
import { groupNUserAPI } from '../../dynamoDB'
import { useDispatch } from 'react-redux'

const DeleteGroupForHost = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const dispatch = useDispatch()

    const handleDeleteforHost = async(id) => {
        const data = await fetch(groupNUserAPI)
        const list = []
        const dataJson = await data.json()
        const result = dataJson.Items.filter((item) => item.groupid == id)
        result.forEach(element => {
            list.push(element.id)
        });
        // console.log(list)
        dispatch(deleteForHostAsync({id, list}))
      }
    return(
      <>
    <Button variant="ghost" colorScheme="red" onClick={onOpen}>Delete</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Delete?</ModalHeader>
      <ModalBody>Do you want to delete this group?</ModalBody> 
      <ModalBody>Notice: If you delete this group, other members will be automatically removed from the group.</ModalBody>
      <ModalCloseButton />
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          No
        </Button>
        <Button variant='solid' colorScheme="red" onClick={()=> handleDeleteforHost(props.id)}>Yes</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
    )
}

export default DeleteGroupForHost
