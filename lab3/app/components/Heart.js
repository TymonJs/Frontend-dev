'use client'

import { useState, useEffect } from "react"

export default function Heart({id,list}){
    console.log(id);
    
    const updateFavorites = (e) => {
        
        
        const favs = localStorage.getItem("favorites")

        if (!favs) {
            localStorage.setItem("favorites",id)
            e.target.classList.toggle("favorite")
            return
        }

        const arr = favs.split(",")
        if (arr.includes(id)){
            const f = arr.reduce((acc,c) =>{
                if (c!==id) return [...acc,c]
                return acc
            },[])
            localStorage.setItem("favorites",f.join(","))
            e.target.classList.toggle("favorite")
            return
        }
        
        arr.push(id)
        localStorage.setItem("favorites",arr.join(","))
        e.target.classList.toggle("favorite")
    }
    const [cl,setCl] = useState("")
    useEffect(() => {    
        setCl(localStorage.getItem("favorites").split(",").includes(id)?"favorite":"")
    },[])
  
    
    return <i className={`fa-solid fa-heart heart ${cl}`} onClick={updateFavorites}></i>
}