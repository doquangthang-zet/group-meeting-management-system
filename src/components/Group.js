import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/groupSlice'
import { selectUser } from "../redux/slices/userSlice";


const Group = () => {
    const count = useSelector((state) => state.group.value)
    const {user} = useSelector(selectUser)


    return (
        <div>
          <div>
            <span>{user.email}</span>
          
          </div>
        </div>
      )
}

export default Group