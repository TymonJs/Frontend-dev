export const getPokemonList = async (limit) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
        const json = await res.json();
        return json.results
    }
    catch (error){
        //"API failed to load the pokemons"
        console.error(error);
        
    }    
}

export const getPokemonListByType = async (type) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        const json = await res.json();
        return json.pokemon.map(el => el.pokemon)
    }
    catch (error){
        //"API failed to load the pokemons"
        console.error(error);
        
    }    
}
