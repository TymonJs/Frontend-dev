import PokemonDetails from "@/app/components/PokemonDetails"
import PokemonList from "@/app/components/PokemonList"

export default async function Pokemon({params,searchParams}){
    const temp = await searchParams
    const id = await params

    const {search="", limit = 20, type="", view=""} = temp
    
    return <>
        <PokemonDetails id={id.id} view={view.toLowerCase()}/>
        <PokemonList query={search} limit={limit} type={type} />
    </>
}