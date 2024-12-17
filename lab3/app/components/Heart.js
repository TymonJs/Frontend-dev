'use client'

import { useState, useEffect } from "react"

export default function Heart({id, list,unheart}){
    
    const updateFavorites = (e,unheart) => {
        
        const favs = localStorage.getItem("favorites")

        if (!favs) {
            localStorage.setItem("favorites",id)
        }
        else{
            const arr = favs.split(",")
            if (arr.includes(id)){
                const f = arr.reduce((acc,c) =>{
                    if (c!==id) return [...acc,c]
                    return acc
                },[])
                localStorage.setItem("favorites",f.join(","))
            }
            else{
                arr.push(id)
                localStorage.setItem("favorites",arr.join(","))
            }
        }
            

        if (unheart) e.target.classList.toggle("favorite")
    }
    const [cl,setCl] = useState("")
    useEffect(() => { 
        try{
            setCl(localStorage.getItem("favorites").split(",").includes(id)?"favorite":"")
        }   
        catch{
            localStorage.setItem("favorite","")
        }
        
    },[id])
  
    
    return <i className={`fa-solid fa-heart heart ${cl}`} onClick={(e) => {
        updateFavorites(e,unheart)
        setCl(localStorage.getItem("favorites").split(",").includes(id)?"favorite":"")
        window.dispatchEvent(new Event("storageUpdate"))
        }}>

    </i>
}