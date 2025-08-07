import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";


export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:"POST",
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:"POST",

            })
        }),
        profile:builder.query({
            query:()=>({
                url:`${USERS_URL}/profile`
            }),
            providesTags:["UserProfile"]
            
        }),
        updateProfile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:"PUT",
                body:data
            })
        }),

        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:"POST",
                body:data,

            })
        }),

        loginWithGoogle:builder.mutation({
            query:(data)=>({
             url:`${USERS_URL}/login-with-google`,
             method:"POST",
             body:data,
            })
        }),
       getAllUsers:builder.query({
         query:()=>({
           url:`${USERS_URL}/all-users`, 
         }),
         providesTags:["User"],
         keepUnusedDataFor:7
       }),
       deleteUser:builder.mutation({
        query:(id)=>({
            url:`${USERS_URL}/${id}`,
            method:"DELETE",
        })
       }),
       getUserDetails:builder.query({
        query:(id)=>({
            url:`${USERS_URL}/${id}`
        }),
        keepUnusedDataFor:7
       }),
       updateUser:builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/${data.id}`,
            method:"PUT",
            body:data,
        }),
        invalidatesTags:["User"]
       }),

       addToFav:builder.mutation({
        query:(id)=>({
            url:`${USERS_URL}/favourite/${id}`,
            method:"POST",
        }),
        // invalidatesTags:["UserProfile"]
       }),

       removeFromFav:builder.mutation({
        query:(id)=>({
            url:`${USERS_URL}/favourite/${id}`,
            method:"DELETE"
        }),
        // invalidatesTags:["UserProfile"]
       }),
       AddToCart:builder.mutation({
        query:(id)=>({
            url:`${USERS_URL}/cart/${id}`,
            method:"POST",
            // body:{quantity}
        })
       }),
       removeFromCart:builder.mutation({
        query:(id)=>({
           url:`${USERS_URL}/cart/${id}`,
           method: "DELETE",
        })
       })

    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useProfileQuery,
    useRegisterMutation,
    useLoginWithGoogleMutation,
    useUpdateProfileMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useAddToFavMutation,
    useRemoveFromFavMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation
}=userApiSlice