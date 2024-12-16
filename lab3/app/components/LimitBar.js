'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function LimitBar(){

    const searchParams = useSearchParams()
    const urlPath = usePathname()
    const {replace} = useRouter()

    const handleLimit = (limit) => {
        const params = new URLSearchParams(searchParams)
        if (limit===0) params.set("limit",20)
        else if (limit) params.set("limit",limit)
        else params.delete("limit")
        
        replace(`${urlPath}?${params.toString()}`)
    }

    return (<>
        <input
       type="text"
       placeholder="Limit"
       id="limitbar"
       defaultValue={searchParams.get("limit")?.toString()}
       onInput={(e) => {
        if (e.target.value>1000){
            e.target.value=1000;
            handleLimit(1000)
        }
        else{
            handleLimit(e.target.value)
        }
    }} // handleSearch(e.target.value)
   />
    </>)
}