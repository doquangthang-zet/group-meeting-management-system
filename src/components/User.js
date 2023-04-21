import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { increase, decrease } from '../redux/slices/userSlice'


const User = () => {
    const count = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    return (
        <div>
          <div>
            <button
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
            </button>
          </div>
        </div>
      )
}

export default User