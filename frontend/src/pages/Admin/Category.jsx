import CategoryForm from "../../components/categoryForm.jsx"
import Model from "../../components/CategoryModel.jsx"
import { toast } from "react-toastify"
import { useState } from "react"
import { useGetAllCategoryQuery,
         useCreateCategoryMutation,
         useDeleteCategoryMutation,
         useUpdateCategoryMutation,    
 } from "../../redux/api/categoryApiSlice.js"
import AdminMenu from "./AdminMenu.jsx"

const Category=()=>{

 const [name,setName]=useState("")
const [modelVisible,setModelVisible]=useState(false)
const [updatingCategory,setUpdatingCategory]=useState("")
const [selectedCategory,setSelectedCategory]=useState(null)
   const {data:categories}=useGetAllCategoryQuery()

//    console.log("Categories::",categories.data)

  const [createCategory]=useCreateCategoryMutation()
  const[updateCategory]=useUpdateCategoryMutation()
  const [deleteCategory]=useDeleteCategoryMutation()


  const handleCreateCategory =async(e)=>{
     
    e.preventDefault();
    if(!name){
     toast.error("Category name is required")
      return;
    }
    try {
        const res= await createCategory(name).unwrap();
        

         if(res.error){
            toast.error(res.error)
         }
            setName("")
            toast.success(`${res.data.name} is created😀`)
         

    } catch (error) {
        console.log(error?.data?.message)
        toast.error("Creating Category failed try again ")
    }

  }


 const handleDeleteCategory =async()=>{
        // console.log("Deleting Id:",selectedCategory._id)
    try {
        
        const res= await deleteCategory(selectedCategory._id).unwrap()
        console.log("delete res:::",res)

        if(res.error){
         toast.error(res.error)
         return; 
        }
        toast.success(`${res.data.name} is deleted 😔`)
        setSelectedCategory(null)
        setModelVisible(false)

    } catch ( error) 
    {
     console.log(error)
     toast.error(error)   
    }
  }

  const handleUpdateCategory=async(e)=>{
    e.preventDefault();
      console.log("E:",e)
     if(!updatingCategory){
        toast.error("Category name is required");
      return;
     }

     try {
        const res= await updateCategory({id:selectedCategory._id,
            name:updatingCategory
        }).unwrap()
        console.log("Update res:::",res)


        if(res.error){
            toast.error(res.error)
        }
        else{

            toast.success(`${res.data.name} is updated 🙂`)
            setModelVisible(false)
            setUpdatingCategory('')
            setSelectedCategory(null)
        }

        

     } catch (error) {
        console.log(error?.data?.message || error)
     toast.error(error?.data?.message || error)
     }
  }
    return(
        <div className=" min-h-screen mt-25 flex flex-col  px-15">
          <AdminMenu/>

           <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 ">Manage Categories</h1>
         
         <div>
           <CategoryForm
             value={name}
             setValue={setName}
             handleSubmit={handleCreateCategory} />            
         </div>
         <br />
         <hr />
         <div className=" mt-10 flex flex-wrap gap-15">
             {
                categories?.data.map((category)=>(
                  <div key={category?._id}>
                    <button
                    className="
                    bg-teal-600 hover:bg-teal-700 text-white text-xl font-semibold py-4 px-8 rounded-lg  focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    onClick={()=>{
                        setModelVisible(true)
                        setSelectedCategory(category)
                        setUpdatingCategory(category.name)
                    }}>
                        {category.name}
                    </button>
                  </div>  
                ))
             } 
         </div>
       <Model 
        isOpen={modelVisible}
        onClose={()=>setModelVisible(false)}> 
         
         <CategoryForm 
         value={updatingCategory}
         setValue={(value)=>setUpdatingCategory(value)}
         handleSubmit={handleUpdateCategory}
         buttonText="Update"
         handleDelete={handleDeleteCategory}
         />
        
        </Model>
         
        </div>
    )
}

export default Category