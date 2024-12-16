
import Favorites from "../components/Favorites";
import {getPokemonList, getPokemonListByType} from "../public/getList"

export default async function FavoritesPage(){
    // const temp =  await searchParams
    
    // const {search="", limit = 20, type=""} = temp

    // if (view=="stats")
    const res = await getPokemonList(1000)
    return <Favorites res={res}/>
        {/* <PokemonDetails /> */}
        {/* <PokemonList query={search} limit={limit} type={type}/> */}
    
}