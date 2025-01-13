import PokemonDetails from "@/app/components/PokemonDetails"
import PokemonList from "@/app/components/PokemonList"
import {getPokemonList, getPokemonListByType} from "../../public/getList"
import Dropdown from "@/app/components/Dropdown"
import Input from "@/app/components/Input"
import LimitBar from "@/app/components/LimitBar"
import { types } from "@/app/consts/consts"

export default async function Pokemon({params,searchParams}){
    const temp = await searchParams
    const id = await params

    const {search="", limit = 20, type="", view=""} = temp
    
    const res = type? await getPokemonListByType(type): await getPokemonList(1000)

    if (view) return <div className="container"><PokemonDetails id={id.id}/></div>
    return <div className="container">
        <div id="search">
              <Dropdown list={types} name={"type"}/>
              <Input/>
              <LimitBar/>
          </div>
        {<PokemonDetails id={id.id} view={view.toLowerCase()}/>}
        <PokemonList currId={id.id} query={search} limit={limit} type={type} res={res}/>
    </div>
}