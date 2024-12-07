const searchBar = document.getElementById("searchBar")
const list = document.getElementById("pokemonList")
let pokemonList;
let detailContainer;
let imageBox;
let detailBox;

const getPokemonList = async () => {
    list.innerHTML="Loading..."
    try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const json = await res.json();
        pokemonList = json.results
    }
    catch (error){
        list.innerHTML="Failed to load the Pokemons"
    }
    
}
const renderPokemonList = async () => {
    
    await getPokemonList()
    
    showPokemonList(pokemonList)
}

const showPokemonList = (pokemons) => {
    list.innerHTML=""
    
    pokemons.forEach((el,i) => { 
        const pokemon = document.createElement("div")
        pokemon.classList.add("pokemonCard");
        
        
        const parts = el["url"].split("/")
        const id = parts[parts.length-2]
        
        pokemon.innerHTML=`<p>${el.name} #${id}</p><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">`
        pokemon.onclick = () => getPokemonDetails(id)   
        list.appendChild(pokemon)
    })
    searchBar.oninput = (input) => filterPokemonsFromList(input)
}

const filterPokemonsFromList = (input) => {
    const inputValue = input.target.value.toLowerCase()

    while (list.firstChild){
        list.removeChild(list.firstChild);
    }
    
    const filteredPokemons = pokemonList.filter(curr => curr.name.includes(inputValue))
    
    showPokemonList(filteredPokemons)
    
}

window.onload = renderPokemonList

const getPokemonDetails = async (id) => {
    
    if (!(document.querySelector("#detailContainer"))){

        detailContainer = document.createElement("div")
        detailContainer.classList.add("container")
        detailContainer.id = "detailContainer"

        imageBox = document.createElement("div")
        imageBox.id = "pokemonImageBox"
        detailContainer.appendChild(imageBox)

        detailBox = document.createElement("div")
        detailBox.id = "pokemonDetailBox"
        detailContainer.appendChild(detailBox)

        document.body.appendChild(detailContainer)
    }

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

const showPokemonDetails = (pokemon) => {
    imageBox.innerHTML=""
    detailBox.innerHTML=""
    imageBox.innerHTML = `<p>${pokemon.name} #${pokemon.id}</p><img src="${pokemon.sprites.front_default}">`
    
    detailBox.innerHTML = 
    `<p><strong>Types: </strong>${pokemon.types.map(el => el.type.name).join(", ")}</p> 
    <p><strong>Height: </strong>${pokemon.height}</p>
    <p><strong>Weight: </strong>${pokemon.weight}</p>
    ${pokemon.stats.map(stat => `<p><strong>${stat.stat.name}: </strong>${stat.base_stat}</p>`).join('')}`
}