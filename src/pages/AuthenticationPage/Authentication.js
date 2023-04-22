import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from '../HomePage/Home';


export default function Authentication() {
    
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