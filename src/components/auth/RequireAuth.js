// RequireAuth.js
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';

export function RequireAuth({ route }) {
  const location = useLocation();
  // const { route } = useAuthenticator((context) => [context.route]);
  // if (route !== 'authenticated') {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  // return children;
  return route == "authenticated" ? (
		<Outlet />
		) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}