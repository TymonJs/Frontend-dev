import PokemonList from "../components/PokemonList"
// import PokemonDetails from "../components/PokemonDetails";

export default async function Pokemons({searchParams}){
    const temp =  await searchParams
    
    const {search="", limit = 20, type=""} = temp

    // if (view=="stats")
    
    return <>
        {/* <PokemonDetails /> */}
        <PokemonList query={search} limit={limit} type={type}/>
    </>
    
}