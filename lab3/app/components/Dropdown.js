'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Dropdown(){
    const searchParams = useSearchParams()
    const urlPath = usePathname()
    const {replace} = useRouter()

    const types = [
        'bug',      'dark',   'dragon',
        'electric', 'fairy',  'fighting',
        'fire',     'flying', 'ghost',
        'grass',    'ground', 'ice',
        'normal',   'poison', 'psychic',
        'rock',     'steel',  'stellar',
        'unknown',  'water'
      ]
      
    const handleType = (type) => {
        
        const params = new URLSearchParams(searchParams)
        if (type==="Type") params.delete('type')
        else if (type) params.set("type",type)
        else params.delete("type")
        
        replace(`${urlPath}?${params.toString()}`)
    }
    const defaultValue = new URLSearchParams(searchParams).get("type")
    
    return (<>
        <select id="dropdown" defaultValue={defaultValue?defaultValue:"Type"} onChange={(event) => {handleType(event.target.options[event.target.selectedIndex].innerHTML)}}>
            <option value="Type" key="0">Type</option>
            {types.map((el,i) => <option key={i+1}>{el}</option>) }
        </select>
</>)
}