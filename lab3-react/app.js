const root = ReactDOM.createRoot(document.getElementById("root"));
const loadingText = "Loading..."
let pokemonList;

const PokemonList = ({pokemons}) => {
    
    const getList = () => {
        if (!Array.isArray(pokemons)) return <p>No pokemons to display</p>

        if (pokemons.length===0) return (<h2>No matching pokemons</h2>);

        return pokemons.map((pokemon,index) => {

            const parts = pokemon.url.split("/");
            const id = parts[parts.length - 2];

            const link = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            
            return (<div key={index} className="pokemonCard" onClick={() => getPokemonDetails(id,pokemons)}>
                <p>{pokemon.name} #{id}</p>
                <img src={link} alt={pokemon.name}></img>
            </div>);
        })
    }
   
    
    return <>{getList()}</>
   
    
}

const getPokemonDetails = async (id,pokemons) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const json = await res.json()
        root.render(<App pokemons={pokemons} pokemonDetails={json}/>)
    }
    catch (error){
        root.render()
    }
}

const PokemonDetails = ({pokemonDetails = null}) => {
    if (!pokemonDetails) return (
    <div id="detailContainer">
    </div>)

    else if (pokemonDetails === loadingText) return (
    <div className="container" id="detailContainer">
        <div className="loading">{loadingText}</div>
    </div>)

    const {name, id, sprites: {front_default}, types, weight, height, stats} = pokemonDetails;

    return <div id="detailContainer">
        <div id="pokemonImageBox">
            <p>{name} #{id}</p>
            <img src={front_default}></img>
        </div>

        <div id="pokemonDetailBox">
            <p><strong>Types: </strong>{types.map(el => el.type.name).join(', ')}</p>
            <p><strong>Height: </strong>{height}</p>
            <p><strong>Weight: </strong>{weight}</p>
            {stats.map(el => 
                <p key={el.stat.name}>
                    <strong>{el.stat.name}: </strong>{el.base_stat}
                </p>
            )}
        </div>
    </div>
 

}

const Navigation = ({pokemonDetails}) => {
    return <>
    <h1>Pokemon Info</h1>
    <div id="search">
        <input
            type="text"
            placeholder="Pokemon name"
            id="searchBar"
            onInput={(e) => filterPokemons(e.target.value,pokemonDetails)}
        />
    </div>
    </>
}

const App = ({pokemons, pokemonDetails=null}) => {

    
    return (<>
        <div className="container">
            <Navigation pokemonDetails={pokemonDetails}/>
            < PokemonDetails pokemonDetails={pokemonDetails}/>
        </div>

        <div className="container">
            <div id="pokemonList">
                <PokemonList pokemons={pokemons.slice(0,20)}/>
            </div>
        </div>
        
        </>);

}

const getPokemonList = async (limit=20) => {
    
    
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
        const json = await res.json();
        return json.results
        
    }
    catch (error){
        console.log("API failed to load the pokemons");
        
    }    
}

const filterPokemons = (input,pokemonDetails) => {
    
    

    const inputValue = input.toLowerCase()
    try{
        const filteredPokemons = pokemonList.filter(el => el.name.toLowerCase().includes(inputValue))
        root.render(<App pokemons={filteredPokemons} pokemonDetails={pokemonDetails}/>)
    }
    catch (e) {
        console.log(e);
    }
}

const main = async () => {
    root.render(<h1 className="loading">Loading...</h1>)
    pokemonList = await getPokemonList(20)
    root.render(<App pokemons={pokemonList}/>)  
    
    pokemonList= await getPokemonList(1000)
    console.log("loaded");
    
}

main()