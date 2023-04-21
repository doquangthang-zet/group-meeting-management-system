import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import { useEffect } from 'react';

Amplify.configure({
    aws_project_region: 'ap-southeast-1', // (optional) Default region for project
    aws_cognito_region: 'ap-southeast-1', // (required) - Region where Amazon Cognito project was created
    aws_user_pools_id: 'ap-southeast-1_5YITie9NO', // (optional) -  Amazon Cognito User Pool ID
    aws_user_pools_web_client_id: '4fss4ed3hsns8dnrkq9e0klvpb', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
    aws_mandatory_sign_in: 'enable' // (optional) - Users are not allowed to get the aws credentials unless they are signed in
});

export default function AuthencationPage() {
    const getUserData = async () => {
        const user = Auth.currentAuthenticatedUser();
        console.log(user)
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <Authenticator loginMechanisms={['email']} signUpAttributes={[
            'nickname',
            'email'
        ]}>
            {({ signOut, user }) => (
                <main>
                <h1>Hello {user.attributes.nickname} - {user.attributes.email}</h1>
                <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    )
}