'use client'
import PokemonDetails from "./PokemonDetails";
import dynamic from "next/dynamic";
// import PokemonList from "./PokemonList";
const PokemonList = dynamic(() => import("./PokemonList"),{ssr:false})
import { useState, useEffect } from "react";

export default  function Favorites(){
    // REFACTOR POKEMONLIST NA NIESYNCHRONICZNE, ŻEBY MÓC DYNAMICZNIE ZAŁADOWAĆ GO TUTAJ
    const [favs,setFavs] = useState("")

    useEffect(() => {
        const temp = localStorage.getItem("favorites")
        if (temp) setFavs(temp)
    })
    // console.log(fav);
    return <PokemonList/>
    // return <PokemonList></PokemonList>
    
    
    
}