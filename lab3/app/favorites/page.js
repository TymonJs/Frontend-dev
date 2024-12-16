
import Favorites from "../components/Favorites";
import {getPokemonList, getPokemonListByType} from "../public/getList"

export default async function FavoritesPage({searchParams}){
    const temp =  await searchParams
    
    const {sort=""} = temp

    const res = await getPokemonList(1000)
    return <Favorites res={res} sort={sort}/>
        {/* <PokemonDetails /> */}
        {/* <PokemonList query={search} limit={limit} type={type}/> */}
    
}