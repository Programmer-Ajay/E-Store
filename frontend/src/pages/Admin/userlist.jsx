import { useGetAllUsersQuery,useDeleteUserMutation,useUpdateUserMutation } from "../../redux/api/usersApiSlice.js"
import { useState ,useEffect } from "react";
import { FaCheck, FaTimes, FaUserEdit, FaEye, FaPen,FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";
const Userslist = () => {
     const [deleteUser]=useDeleteUserMutation()
    const [updateUser]=useUpdateUserMutation()

        const {data,isLoading,refetch,error}=useGetAllUsersQuery()
       const users=data?.data?.users
    console.log("data:",data?.data?.users) // this will gives us array of users

  const [showPopup, setShowPopup] = useState(false);
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [isAdmin,setIsAdmin]=useState(false)
  const [selectedUser,setSelectedUser]=useState(null)
  const[showUserInput,setShowUserInput]=useState(false)
  const[showEmailInput,setShowEmailInput]=useState(false)

  // whenever the components mounts the refetch the data
  useEffect(()=>{
    refetch()
  },[refetch])
  
  const deleteHandler=async(id)=>{
    // console.log("id::",id)
       if(window.confirm("Are you sure want to delete"))
    try {
        await deleteUser(id).unwrap()
        refetch()  // refetch the data
        toast.success("user is deleted !!!")
    } catch (error) {
       console.log("ERR::",error?.data?.message) 
       toast.error(error?.data?.message || error.error)
    }
  }
 const cancelHandler=()=>{
    setShowPopup(false),
    setSelectedUser(null)
    setUsername("")
    setEmail("")
    setShowEmailInput(false)
    setShowUserInput(false)
    setIsAdmin(false)
  }

  const updateHandler=async(id)=>{
      const updatedData={id:selectedUser._id}
       if(showUserInput) updatedData.username=username
       if(showEmailInput) updatedData.email=email
     updatedData.isAdmin=isAdmin
       console.log("Updated user Object",updatedData)

     try {
         await updateUser(updatedData).unwrap()
          
         refetch()
         toast.success("user updated 😀")
    } catch (error) {
      console.log("ERR::",error?.data?.message) 
       toast.error(error?.data?.message || error.error)  
    }
       cancelHandler() // reset everything

  }

 

  return ( 

    <div className="min-h-screen p-4 mt-17  md:px-10 ">
      <AdminMenu/>

      <h1 className="text-white text-5xl font-bold mb-6 text-center">Users</h1>
      {isLoading ?<Loader /> :
         (<>
        {
         users?.map((user)=>(

      <div className=" bg-gray-800 p-4 rounded-xl shadow-md flex flex-col lg:flex-row justify-between items-start text-white gap-3 mb-3 w-full" key={user._id}>
       
        <div className=" flex flex-col md:flex-row  lg:w-[70%]  md:justify-between   md:items-center  w-[100%]  px-5">
          <p className="text-lg font-semibold">
            <span className="text-gray-400 mr-1">u_id:</span>{user._id}</p>
           <div >
          <p className="text-md font-semibold md:text-center">{user.username}</p>

          <p className="text-sm text-gray-200">{user.email}</p>
          </div>

          <p className="text-sm text-gray-400 flex items-center gap-2">
            Admin:
            {user.isAdmin ? (
              <FaCheck className="text-green-400" />
            ) : (
              <FaTimes className="text-red-400" />
            )}
          </p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto justify-end ">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2">
            <FaEye /> Details
          </button>
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            onClick={() =>{ setShowPopup(true)
                          setSelectedUser(user)
                          setUsername(user.username)
                          setEmail(user.email)
                          setShowEmailInput(false)
                          setShowUserInput(false)
            }
            }
          >
            <FaPen /> Update
          </button>

          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2" onClick={()=>deleteHandler(user._id)}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
      ))
        } 

    </>)
    }


      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full  bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#2a2a40] p-6 rounded-lg w-[90%] max-w-md text-white relative">

            <h2 className="text-xl font-bold mb-4">Update User</h2>

            {!showUserInput ? (
              <button
                className="text-sm underline mb-2 block"
                onClick={(e) =>
                  setShowUserInput(true)
                }
              >
                Update Username
              </button>
            ) : (
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter new username"
                className="w-full p-2 mb-3 rounded-md bg-[#1e1e2f] border border-gray-500"
              />
            )}

            {!showEmailInput ? (
              <button
                className="text-sm underline mb-2"
                onClick={() =>
                  setShowEmailInput(true)
                }
              >
                Update Email
              </button>
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter new email"
                className="w-full p-2 mb-3 rounded-md bg-[#1e1e2f] border border-gray-500"
              />
            )}

            <div className="flex items-center mb-4 gap-2">
              <input
                 id="check"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)
                }
              />
              <label htmlFor="check">Make Admin</label>
            </div>

            <div className="flex justify-end gap-2">

              <button
                onClick={cancelHandler }
                className="px-4 py-2 bg-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateHandler}
                className="px-4 py-2 bg-blue-600 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>     
  );
};








export default Userslist