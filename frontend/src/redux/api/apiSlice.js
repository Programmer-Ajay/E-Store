import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constants"

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,
    credentials:"include" //this send the cookie

})

 export const apiSlice=createApi({
    baseQuery,
    
    tagTypes:["User","Product","Order","Category","UserProfile"],
    endpoints:()=>({}),
})
