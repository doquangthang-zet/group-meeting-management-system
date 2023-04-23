// components/Login.js
import { useEffect } from "react";

import { Authenticator, useAuthenticator, View, ThemeProvider,Theme,useTheme, } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

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
  const { route, user } = useAuthenticator((context) => [context.route, context.user]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      dispatch(setUser(user.attributes))
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <View className="auth-wrapper">
       <ThemeProvider theme={theme}>
        <Authenticator></Authenticator>
       </ThemeProvider>
    </View>
  );
}