import PokemonList from "../components/PokemonList"
import Dropdown from "../components/Dropdown"
import Input from "../components/Input"
import LimitBar from "../components/LimitBar"
import { types } from "../consts/consts"


export default async function Pokemons({searchParams}){
    const temp =  await searchParams
    
    const {search="", limit = 20, type=""} = temp

    // if (view=="stats")
    return <div className="container">
        <div id="search">
            <Dropdown list={types} name={"type"}/>
            <Input/>
            <LimitBar/>
        </div>
        <PokemonList query={search} limit={limit} type={type}/>
    </div>
    
}