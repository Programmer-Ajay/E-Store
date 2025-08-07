import  {FaTimes} from "react-icons/fa"

const Model=({
    isOpen ,
    onClose,
    children
})=>{
    return <>
     {isOpen &&(
        <div className="fixed inset-0 flex items-center justify-center z-50">

             <div className="bg-[#2a2a40] p-6 rounded-lg w-[90%] max-w-md text-white relative">
                <button className="absolute top-2 right-2 focus:outline-none " onClick={onClose}> <FaTimes size={24}/></button>
              <div className=" mb-6">
              {children}

              </div>
             </div>
        </div>
     )}
    </>
}


export default Model