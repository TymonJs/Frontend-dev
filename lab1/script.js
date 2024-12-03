const getPokemonList = async () => {
    try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const json = await res.json();
        console.log(json.results)
    }
    catch (error){
        console.log("asd")
    }
    
}

getPokemonList()