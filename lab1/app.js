const searchBar = document.getElementById("searchBar")
const list = document.getElementById("pokemonList")
const detailContainer = document.getElementById("detailContainer")
const imageBox = document.getElementById("pokemonImageBox")
const detailBox = document.getElementById("pokemonDetailBox");

const getPokemonList = async () => {
    list.innerHTML="Loading..."
    try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const json = await res.json();
        showPokemonList(json.results)
    }
    catch (error){
        list.innerHTML="Failed to load the Pokemons"
    }
    
}
const showPokemonList = async (pokemons) => {
    list.innerHTML=""
    pokemons.forEach((el,i) => { 
        const pokemon = document.createElement("div")
        pokemon.classList.add("pokemonCard");
        
        const id = i+1
           
        pokemon.innerHTML=`<p>${el.name} #${id}</p><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">`
        pokemon.addEventListener("click", () => getPokemonDetails(id))
        list.appendChild(pokemon)
    })
}
window.onload = getPokemonList

const getPokemonDetails = async (id) => {
    imageBox.innerHTML="Loading..."
    detailBox.innerHTML="Loading..."
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const json = await res.json()
        showPokemonDetails(json)
    }
    catch (error){
        detailContainer.innerHTML="Loading the Pokemon's details has failed"
    }
}

const showPokemonDetails = async (pokemon) => {
    imageBox.innerHTML=""
    detailBox.innerHTML=""
    imageBox.innerHTML = `<p>${pokemon.name} #${pokemon.id}</p><img src="${pokemon.sprites.front_default}">`
    
    detailBox.innerHTML = 
    `<p><strong>Types: </strong>${pokemon.types.map(el => el.type.name).join(", ")}</p> 
    <p><strong>Height: </strong>${pokemon.height}</p>
    <p><strong>Weight: </strong>${pokemon.weight}</p>
    ${pokemon.stats.map(stat => `<p><strong>${stat.stat.name}: </strong>${stat.base_stat}</p>`).join('')}`
}

// const button = document.getElementById("search")
// button.addEventListener("click",getPokemonDetails)
