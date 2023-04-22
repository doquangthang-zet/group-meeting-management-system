import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from '../HomePage/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';


export default function Authentication() {
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
    }, [])

    return (
        <div className='authenticationPage'>
            <h1>Group meeting app</h1>
            <Authenticator loginMechanisms={['email']} signUpAttributes={[
                'nickname',
                'email'
            ]}>
                {({ signOut, user }) => (
                    <Home signOut={signOut} user={user} />
                )}
            </Authenticator>
        </div>
        
    )
}