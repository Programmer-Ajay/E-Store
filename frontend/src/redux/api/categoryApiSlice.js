import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";

const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       
        createCategory:builder.mutation({
            query:(name)=>({
              url:`${CATEGORY_URL}`,
               method:"POST",
               body:{name}
            }),
            invalidatesTags:[{type:"Category",id:"LIST"}],
            // this tells that refetech the full list of category
           
        }),
        getAllCategory:builder.query({
            query:()=>({
                url:`${CATEGORY_URL}/categories`,
                
            }),
            providesTags:(result)=>
                result?.data?
            [...result.data.map(({_id})=>({type:"Category",id:_id})),
             { type: "Category", id: "LIST" }
            ]
            :
            [{type:"Category",id:"LIST"}],

            keepUnusedDataFor:5
        }),
        updateCategory:builder.mutation({
            query:(data)=>({
                url:`${CATEGORY_URL}/${data.id}`,
                method:"PUT",
                body:data

            }),
            invalidatesTags:(result,error,{id})=>[
              {type:"Category",id},  
              {type:"Category",id:"LIST"},  
            ]
            //This tells it: "Refetch this (id)item and the full list after update."

        }),
        deleteCategory:builder.mutation({
            query:(id)=>({
                url:`${CATEGORY_URL}/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:[{type:"Category",id:"LIST"}]

        })
    })
})

export const { 
      useCreateCategoryMutation,
      useGetAllCategoryQuery,
      useUpdateCategoryMutation,
      useDeleteCategoryMutation
}=categoryApiSlice