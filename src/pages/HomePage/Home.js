import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

export default function Home({signOut, user}) {
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
    }, [])

    return (
        <main>
            {/* <h1>Hello {currentUser && currentUser.nickname} - {currentUser && currentUser.email}</h1> */}
            <h1>Hello {user.attributes.nickname} - {user.attributes.email}</h1>
            <button onClick={signOut}>Sign out</button>
        </main>
    )
}