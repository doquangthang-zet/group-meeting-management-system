import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'


const User = () => {
    const count = useSelector((state) => {
      
      console.log(state)
      return state.user;
    })
    const dispatch = useDispatch()

    return (
        <div>
          <div>
            {/* <button
              aria-label="Increase"
              onClick={() => dispatch(increase())}
            >
              Increase
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrease"
              onClick={() => dispatch(decrease())}
            >
              Decrease
            </button> */}
          </div>
        </div>
      )
}

export default User