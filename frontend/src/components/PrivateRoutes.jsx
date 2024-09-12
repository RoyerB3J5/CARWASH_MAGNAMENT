import { useAuth } from "../context/authContext";
import {  Navigate, useLocation } from 'react-router-dom';

function PrivateRoutes({ children}) {
  const { userCurrent } = useAuth();
  const location = useLocation();

  return userCurrent
    ? children
    : <Navigate to="/" state={{ from: location }} />;
}
export default PrivateRoutes;