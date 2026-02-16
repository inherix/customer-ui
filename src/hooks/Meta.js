import { useEffect } from "react";
export default function useMeta({title}){
    useEffect(()=>{
            document.title=title;
    },[title])
}
