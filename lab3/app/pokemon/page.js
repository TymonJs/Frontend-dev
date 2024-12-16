import PokemonList from "../components/PokemonList"
// import PokemonDetails from "../components/PokemonDetails";
import {getPokemonList, getPokemonListByType} from "../public/getList"


export default async function Pokemons({searchParams}){
    const temp =  await searchParams
    
    const {search="", limit = 20, type=""} = temp

    // if (view=="stats")
    const res = type? await getPokemonListByType(type): await getPokemonList(1000)
    return <>
        {/* <PokemonDetails /> */}
        <PokemonList query={search} limit={limit} type={type} res={res}/>
    </>
    
}