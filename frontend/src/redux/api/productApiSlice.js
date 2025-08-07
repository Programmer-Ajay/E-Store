import { apiSlice } from "./apislice.js";
import { PRODUCT_URL } from "../constants.js";



const productApiSlice= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
     
        fetchProducts:builder.query({
            query:({keyword})=>({
                url:`${PRODUCT_URL}`,
                params:{keyword}

            }),
              keepUnusedDataFor:50,
            providesTags:["Products"]
              
        }),
       fetechProductById:builder.query({
          query:(productId)=>({
            url:`${PRODUCT_URL}/${productId}`
          }),
          providesTags:(result,error,productId)=>[
            {type:"Product",id:productId},
          ],
       }),
       getAllProducts:builder.query({
        query:()=>({
            url:`${PRODUCT_URL}/all-products`
        }),
        providesTags:["Products"]
       }),

       createProduct:builder.mutation({
        query:(productData)=>({
            url:`${PRODUCT_URL}`,
            method:"POST",
            body:productData
        }),
        invalidatesTags:["Products"],
       }),

       updateProduct:builder.mutation({
        query:({id,data})=>({
            url:`${PRODUCT_URL}/${id}`,
            method:"PUT",
            body:data,
        }),
       invalidatesTags:(result,error,{productId})=>[
        // incvalide only specific Product 
        {type:"Product",id:productId},

          // Also invalidate the product list cache if needed
        "Products"
       ]
       }),
       deleteProduct:builder.mutation({
        query:(productId)=>({
          url:`${PRODUCT_URL}/${productId}`,
          method:"DELETE",
        }),
        invalidatesTags:["Products"]
       }),

       createReview:builder.mutation({
        query:(data)=>({
            url:`${PRODUCT_URL}/${data.id}/reviews`,
            method:"POST",
            body:data
        }),
        invalidatesTags:(result,error,{id})=>[
          {type:"Product" ,id}, // invalidate specific product
          // "Products"  // optional also invalidate product list
        ],
       }),
       fetchTopProduct:builder.query({
        query:()=>({
          url:`${PRODUCT_URL}//top-products`
        }),
         providesTags:["Products"]
       }),

       filteredProducts:builder.query({
        query:({checked,radio})=>({
          url:`${PRODUCT_URL}/filtered-products`,
          method:"POST",
          body:{checked,radio}

        })
       })

    })
})
export const{
useCreateProductMutation,
useCreateReviewMutation,
useDeleteProductMutation,
useFetchProductsQuery,
useFetechProductByIdQuery,
useGetAllProductsQuery,
useUpdateProductMutation,
useFetchTopProductQuery,
useFilteredProductsQuery,

}=productApiSlice



// note 
// we provide the tag to the specific product id in the fetechby productId so in create review we deal only with on product means we re adding the review to single project so we have to invslidate the specific product so the rtk query only fetech the specific product