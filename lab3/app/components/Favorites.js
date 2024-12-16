'use client'
import dynamic from "next/dynamic";
const PokemonList = dynamic(() => import("./PokemonList"),{ssr:false})
import { useState, useEffect } from "react";

export default  function Favorites({res}){
    

    const [favs,setFavs] = useState([])
    const [list,setList] = useState([]

    )
    useEffect(() => {
        const temp = localStorage.getItem("favorites")
        if (temp) setFavs(temp)
        window.addEventListener("storageUpdate",() => {
            setFavs(localStorage.getItem("favorites"))
        })
        
    },[])

    useEffect(() => {
        
        
        setList((favs.length>0)?
            res.filter((e,i) => {
                const parts = e.url.split("/");
                const id = parts[parts.length - 2];     
                return favs.split(",").includes(id)
            })
        :[])
    },[favs])

    return <PokemonList res={list} unheart={false}/>
    
    
    
}