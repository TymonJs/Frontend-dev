
import Favorites from "../components/Favorites";
import {getPokemonList, getPokemonListByType} from "../public/getList"

export default async function FavoritesPage({searchParams}){
    const temp =  await searchParams
    
    const {sort=""} = temp

    
    return <Favorites sort={sort}/>
        {/* <PokemonDetails /> */}
        {/* <PokemonList query={search} limit={limit} type={type}/> */}
    
}