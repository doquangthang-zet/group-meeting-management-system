import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

export default function Home3() {
    const currentUser = useSelector((state) => state.user)

    return (
        <main>
            <h1>Hello {currentUser && currentUser.nickname} - {currentUser && currentUser.email}</h1>

            <button onClick={() => console.log(currentUser)}>Sign out</button>
        </main>
    )
}