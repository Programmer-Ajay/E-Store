
import { FaTimes } from "react-icons/fa"
import { NavLink } from "react-router"
import { useState } from "react"
import { IoMenu } from "react-icons/io5";
const AdminMenu=()=>{
  
    const [isMenuOpen, setIsMenuOpen]=useState(false)

   const toggleMenu=()=>{
        setIsMenuOpen(!isMenuOpen)
   }

    return(
    <>
    
    <button
        className="fixed top-20 right-5 z-50 bg-gray-800 text-white p-2 rounded-lg"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes  size={23}/> : <IoMenu  size={23}/>}
      </button>
      <div
        className={`fixed top-20 ${
          isMenuOpen ? "right-5" : "-right-50"
        } w-50 text-white z-40 transition-all duration-300`}
      >


      <div className="p-5 flex flex-col   bg-my-gradient bg-opacity-90 backdrop-blur-md shadow-2xl">

    {
        isMenuOpen && (
            <ul className="space-y-5">
         <div>
            <NavLink to="/admin/dashboard" className="hover:text-cyan-400 transition rounded-sm"
        onClick={()=>setIsMenuOpen(false)}
            style={({isActive})=>({
                color:isActive?"greenyellow":"white"
            })}
        >Dashboard</NavLink>
        </div>
         
         <div>
            <NavLink to="/admin/category" className="hover:text-cyan-400 transition rounded-sm"
        onClick={()=>setIsMenuOpen(false)}
            style={({isActive})=>({
                color:isActive?"greenyellow":"white"
            })}
        >Create Category</NavLink>
        </div>

<div>
            <NavLink to="/admin/AddProduct" className="hover:text-cyan-400 transition rounded-sm"
        onClick={()=>setIsMenuOpen(false)}
            style={({isActive})=>({
                color:isActive?"greenyellow":"white"
            })}
        >Create Product</NavLink>
        </div>

<div>
            <NavLink to="/admin/productslist" className="hover:text-cyan-400 transition rounded-sm"
        onClick={()=>setIsMenuOpen(false)}
            style={({isActive})=>({
                color:isActive?"greenyellow":"white"
            })}
        >All Product</NavLink>
        </div>

        <div>
            <NavLink to="/admin/orderslist" className="hover:text-cyan-400 transition rounded-sm"
        onClick={()=>setIsMenuOpen(false)}
            style={({isActive})=>({
                color:isActive?"greenyellow":"white"
            })}
        >Manage Orders</NavLink>
        </div>

        <div>
            <NavLink to="/admin/userslist" className="hover:text-cyan-400 transition rounded-sm"
        onClick={()=>setIsMenuOpen(false)}
            style={({isActive})=>({
                color:isActive?"greenyellow":"white"
            })}
        >Manage Users</NavLink>
        </div>
         </ul>
        )
    }
    
     </div>
     </div>
    
   

    </>
    
    
    )
}
 export default AdminMenu