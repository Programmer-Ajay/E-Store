import { Navigate,Outlet } from "react-router"
 import { useSelector } from "react-redux"
import Loader from "../../components/Loader"

const AdminRoute=()=>{
// if the user is Admin then only allow
const {userInfo}=useSelector((state)=>state.auth)
const loading=useSelector((state)=>state.auth.loading)

  if(loading){
        return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

return userInfo && userInfo.isAdmin ?(
    <Outlet/>
):(
  <Navigate to="/login" replace />

)
  
}

export default AdminRoute