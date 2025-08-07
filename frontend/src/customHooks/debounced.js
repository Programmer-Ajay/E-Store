
import { useState,useEffect } from "react";

 const useDebounced=(value,delayTime)=>{

    const [debouncedValue,setDebouncedValue]=useState(value)

    useEffect(()=>{
        const timer=setTimeout(()=>setDebouncedValue(value),delayTime)

        return ()=> clearTimeout(timer) // this will run when the components is unmounted

    },[value])
    return debouncedValue
 }

 export default  useDebounced