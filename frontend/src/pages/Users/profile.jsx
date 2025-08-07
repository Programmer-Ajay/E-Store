import { useState } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useSelector ,useDispatch} from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useUpdateProfileMutation } from '../../redux/api/usersApiSlice';
import { toast } from 'react-toastify';
 const Profile=() => {

   const {userInfo}=useSelector((state)=>state.auth)
   const dispatch=useDispatch()
   const [updateProfile,{isLoading,isSuccess}]=useUpdateProfileMutation()

  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [username,setUsername]=useState(userInfo?.username || "")
  const [email,setEmail]=useState(userInfo?.email || "")
  const [oldPassword,setOldPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");


  const updateHandler=async()=>{
    const updateData={}

    if(username) updateData.username=username
    if(email) updateData.email=email
    if(changePassword &&oldPassword && newPassword) {
      updateData.oldPassword=oldPassword
      updateData.newPassword=newPassword
    }
    console.log("update Data Object:",updateData)

    try {
       const res=await updateProfile(updateData).unwrap()
      //  console.log("Res:",res?.data?.data)
        dispatch(setCredentials({...res?.data}))
        toast.success("User profile updated successfully")

        setShowModal(false)   // close the popup screen
        setChangePassword(false)  // close the change screen
      setOldPassword('')
       setNewPassword('')
       setEmail('')
       setUsername('')
    } catch (error) {
       console.log("ERROR:",error?.data?.message)
       toast.error(error?.data?.message)  
    }
  }
   

      //  console.log("userInfo::",userInfo)
  return (

    <div className="min-h-screen flex items-center justify-center text-white bg-[linear-gradient(135deg,_#0f0f10_0%,_#0d1a3a_100%)] px-3 ">

      <div className="w-full max-w-md h-[28rem] text-center space-y-4 ">
        <h1 className="text-5xl font-bold mb-8">Profile</h1>
        <FaUserCircle size={80} className=" mx-auto text-gray-300 mb-7" />
        <p className="text-xl font-semibold">{userInfo?.username}</p>
        <p className=" font-semibold mb-15">{userInfo?.email}</p>


        <div className="flex justify-around mt-6 px-0">
          <button
            onClick={() => setShowModal(true)}
            className=" bg-teal-600 hover:bg-teal-700 transition px-4 py-2 rounded-xl shadow-md outline-none"
          >
            Update Profile
          </button>
          <button
            className="bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-xl shadow-md outline-none"
          >
            My Orders
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[linear-gradient(135deg,_#0f0f10_0%,_#0d1a3a_100%)]bg-opacity-60 z-50 ">

          <div className="bg-gray-900 text-white p-6 rounded-2xl w-full max-w-md relative shadow-lg space-y-4 ">

            {/* Close Icon */}
            <button
              onClick={() => {
                setShowModal(false);
                setChangePassword(false);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-semibold text-center">Update Profile</h2>

            <div className="space-y-3">

              <input
                type="text"
                placeholder="Username"
                value={username}
                className="w-full px-4 py-2 bg-[#2a2e3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e)=>{setUsername(e.target.value)}}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="w-full px-4 py-2 bg-[#2a2e3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e)=>{setEmail(e.target.value)}}

              />
            </div>

            {/* Change Password Toggle */}
            <button
              onClick={() => setChangePassword(!changePassword)}
              className="text-sm text-blue-400 hover:underline mt-2"
            >
              {changePassword ? 'Cancel password change' : 'Change Password'}
            </button>

            {/* Conditional Password Fields */}
            {changePassword && (
              <div className="space-y-3 pt-2">

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Old Password"
                    value={oldPassword}
                    className="w-full px-4 py-2 bg-[#2a2e3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={(e)=>setOldPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={newPassword}
                    className="w-full px-4 py-2 bg-[#2a2e3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            )}

            {/* Update Button */}
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition"
            disabled={isLoading}
            onClick={updateHandler}>
              {isLoading? "Updating..." :"Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;