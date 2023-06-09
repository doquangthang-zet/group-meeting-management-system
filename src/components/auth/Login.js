// components/Login.js
import { useEffect } from "react";

import { Authenticator, useAuthenticator, View, ThemeProvider,Theme,useTheme, } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from "react-redux";
import { setAuthenticationState, setUser } from "../../redux/slices/userSlice";
import { I18n } from 'aws-amplify';

export function Login() {
  const { tokens } = useTheme();
  
  const theme = {
    name: 'Auth Example Theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.white.value,
          },
          secondary: {
            value: tokens.colors.white.value,
          },
        },
        font: {
          interactive: {
            value: tokens.colors.pink['40'].value,
          },
        },
        brand: {
          primary: {
            '10': tokens.colors.pink['100'],
            '80': tokens.colors.pink['40'],
            '90': tokens.colors.pink['20'],
            '100': tokens.colors.pink['10'],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.pink['40'].value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.pink['80'].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.pink['40'].value,
              },
            },
          },
        },
      },
    },
  };
  I18n.putVocabulariesForLanguage('en', {
    'Create Account': 'Register', // Tab header
    'Create a new account': 'New User', // Header text
    'Confirm Password': 'Confirm your password', // Confirm Password label
    Email: 'Enter your email',
    'Phone Number': 'Enter your phone number',
  });

  const formFields = {
    signUp: {
      username: {
        label: 'Email:',
        placeholder: 'Enter your Email:',
        order: 1,
      },
    },
    signIn: {
      username: {
        label: 'Email:',
        placeholder: 'Enter your Email:',
        order: 1,
      }
    },
  }
  const { route, user } = useAuthenticator((context) => [context.route, context.user]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      dispatch(setUser(user.attributes))
      dispatch(setAuthenticationState(route))
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <View className="auth-wrapper">
       <ThemeProvider theme={theme}>
        <Authenticator formFields={formFields} signUpAttributes={['name','phone_number']}></Authenticator>
       </ThemeProvider>
    </View>
  );
}