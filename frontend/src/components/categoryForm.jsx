
const CategoryForm =({
    value,
    setValue,
    handleSubmit,
    buttonText="Submit",
    handleDelete
})=>{
  return(
    <div className="mt-10 ">
        <form onSubmit={handleSubmit}>
       <input type="text"
        placeholder="Enter category"
        className="w-[70%] p-3 text-[1.2rem] mb-8 rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />
        <div className="flex justify-between">
         
         <button
         type="submit"
         className="bg-blue-500
         md:text-xl hover:bg-blue-600 text-white py-3 px-7 rounded-lg  focus:outline-none focus:ring-2 focus:ring-opacity-50"
         >{buttonText}</button>

         {handleDelete && (
            <button 
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-7 rounded-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-opacity-50"
            onClick={handleDelete}>
                Delete
            </button>
         )}
        </div>

        </form>

    </div>

        )
}

export default CategoryForm