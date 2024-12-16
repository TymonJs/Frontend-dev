'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Dropdown({list,name}){
    const searchParams = useSearchParams()
    const urlPath = usePathname()
    const {replace} = useRouter()
    
    const handleChange = (el) => {
        
        const params = new URLSearchParams(searchParams)
        if (el===name) params.delete(name)
        else if (el) params.set(name,el)
        else params.delete(name)
        
        replace(`${urlPath}?${params.toString()}`)
    }
    const defaultValue = new URLSearchParams(searchParams).get(name)
    
    return (<>
        <select id="dropdown" defaultValue={defaultValue?defaultValue:name} onChange={(event) => {handleChange(event.target.options[event.target.selectedIndex].innerHTML)}}>
            <option key="0">{name}</option>
            {list.map((el,i) => <option key={i+1}>{el}</option>) }
        </select>
</>)
}