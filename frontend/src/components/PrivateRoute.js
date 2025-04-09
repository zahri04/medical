
import React from "react";
import { Navigate , Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.js";

const RoleBasedRoute = ({ AllowedRole }) => {
  
  const { authData } = useAuth();

  // prevent rendering while still state may not be updated
  if(!authData.userProfile ){
    return null;
  }

  if (authData.accessToken && authData.userProfile !=null) {
    const user = authData.userProfile;

    if (user && AllowedRole.includes(user.role?.toLowerCase())) {
      return <Outlet />;
    } else {
      // ❌ Don't use navigate() inside conditional logic like this
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};


const PrivateRoutes=()=>{
const {authData} = useAuth();

return authData.accessToken !==""  ? <Outlet/> : <Navigate to="/login" />;
}



export {RoleBasedRoute,PrivateRoutes};


