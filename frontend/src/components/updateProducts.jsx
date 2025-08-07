import { FaLongArrowAltRight } from "react-icons/fa"
import { MdOutlineEdit } from "react-icons/md"

const ProductUpdateCompo=({
value,
 setValue,
editingField,
setEditngField,
fieldName,
 updateProductHandler,
data,
id
})=>{
    
    const handleUpdate=()=>{
        updateProductHandler(value,id,fieldName);

        setValue("")
        setEditngField(null)
    }

return<>
   {
                      editingField===fieldName? (
                        <div className="flex gap-2 ">
                            {
                                fieldName!=="description"?(<input type="text"
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                            
                          className="rounded-md bg-gray-800 border border-gray-400 h-10 w-1/2 p-2
                               focus:outline-none focus:ring-2  focus:ring-blue-500" />):
                               (
                               <textarea type="text"
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                            
                          className="rounded-md bg-gray-800 border border-gray-400 h-20 w-full p-2
                          text-xl
                               focus:outline-none focus:ring-2  focus:ring-blue-500" />)
                            }
                          


                         <button
                          className={`${fieldName !== "description" ? "px-3" : "px-5"} bg-blue-700 rounded-lg hover:bg-blue-800`}
                          onClick={handleUpdate}
                           >
                            <FaLongArrowAltRight />
                            </button>

                        </div>
                      ):(
                    
              <div className="flex gap-5 items-center">

                 <span className="text-1xl font-semibold mr-1">{data}</span>
                 <button
                  onClick={()=>{ setEditngField(fieldName)
                   setValue(data)
                 }}
                 >    <MdOutlineEdit/>    </button> 
              </div>

                 )
                 }
</>

}

export default ProductUpdateCompo