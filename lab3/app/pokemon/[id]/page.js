import PokemonDetails from "@/app/components/PokemonDetails"
import PokemonList from "@/app/components/PokemonList"
import {getPokemonList, getPokemonListByType} from "../../public/getList"

export default async function Pokemon({params,searchParams}){
    const temp = await searchParams
    const id = await params

    const {search="", limit = 20, type="", view=""} = temp
    
    const res = type? await getPokemonListByType(type): await getPokemonList(1000)

    if (view) return <><PokemonDetails id={id.id}/></>
    return <>
        {<PokemonDetails id={id.id} view={view.toLowerCase()}/>}
        <PokemonList query={search} limit={limit} type={type} res={res}/>
    </>
}