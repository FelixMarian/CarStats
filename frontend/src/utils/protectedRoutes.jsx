import {Outlet, Navigate} from "react-router-dom";

function ProtectedRoutes(){
    const user = sessionStorage.getItem("player_uuid")
    return user!=null ? <Outlet/> : <Navigate to="/login"/>;
}

export default ProtectedRoutes;