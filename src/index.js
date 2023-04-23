import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './redux/store'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure({
  aws_project_region: 'ap-southeast-1', // (optional) Default region for project
  aws_cognito_region: 'ap-southeast-1', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: 'ap-southeast-1_5YITie9NO', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: '4fss4ed3hsns8dnrkq9e0klvpb', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_mandatory_sign_in: 'enable' // (optional) - Users are not allowed to get the aws credentials unless they are signed in
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Authenticator.Provider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Authenticator.Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
