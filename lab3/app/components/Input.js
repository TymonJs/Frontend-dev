'use client'
import "../style.css"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Input(){
    const searchParams = useSearchParams()
    const urlPath = usePathname()
    const {replace} = useRouter()

    const handleSearch = (searchTerm) => {
        const params = new URLSearchParams(searchParams)
        if (searchTerm) params.set("search",searchTerm)
        else params.delete("search")
        
        replace(`${urlPath}?${params.toString()}`)
    }
    
   return <input
       type="text"
       placeholder="Pokemon name"
       id="searchBar"
       defaultValue={searchParams.get("search")?.toString()}
       onInput={(e) => {handleSearch(e.target.value)}}
   />
}