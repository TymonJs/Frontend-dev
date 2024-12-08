const root = ReactDOM.createRoot(document.getElementById("root"));
let pokemonList;

const PokemonList = ({pokemons}) => {
    
    const getList = () => {
        if (!Array.isArray(pokemons)) return <p>No pokemons to display</p>

        return pokemons.map((pokemon,index) => {

            const parts = pokemon.url.split("/");
            const id = parts[parts.length - 2];
            const link = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

            return (<div key={index} className="pokemonCard" onClick={() => PokemonDetails(pokemon.name)}>
                <p>{pokemon.name} #{id}</p>
                <img src={link} alt={pokemon.name}></img>
            </div>);
        })
    }
   
        
    return <>{getList()}</>
   
    
}

const PokemonDetails = (pokemon) => {
    if (!pokemon) return null
    else return null
}

const App = ({pokemons}) => {
    return (<div id="app">
    
        <div className="container">
            <h1>Pokemon Info</h1>
            <div id="search">
                <input
                    type="text"
                    placeholder="Pokemon name"
                    id="searchBar"
                    onInput={(e) => filterPokemons(e.target.value)}
                />
            </div>
            <div id="pokemonList">
                <PokemonList
                    pokemons={pokemons}
                />
            </div>
            {/* { <PokemonDetails pokemon={selectedPokemon} /> } */}
        </div>

        {/* <div className="container" id="detailContainer"></div> */}
        </div>);

}

const renderApp = (pokemons) => {
    
    root.render(<App pokemons={pokemons}/>)
}

const getPokemonList = async () => {
    
    root.render(<h1 id="loading">Loading...</h1>)
    try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const json = await res.json();
        return json.results
        
    }
    catch (error){
        console.log("API failed to load the pokemons");
        
    }    
}

const filterPokemons = (input) => {
    const inputValue = input.toLowerCase()
    try{
        const filteredPokemons = pokemonList.filter(el => el.name.toLowerCase().includes(inputValue))
        
        renderApp(filteredPokemons);
    }
    catch {
        console.log("Can't filter through pokemons that heaven't been loaded");  
    }
}

const main = async () => {
    pokemonList = await getPokemonList()
    root.render(<App pokemons={pokemonList}/>)
    
}

main()