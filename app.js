

const getPokemonList = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const json = await res.json();

    const list = document.getElementById("list")
    json.results.forEach((el) => {
        const li = document.createElement("li")
        li.textContent = el.name
        list.appendChild(li)

    })
    
}

const getPokemonDetails = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
    const json = await res.json()
    console.log(json.results);
    

    
}

window.onload = getPokemonList()

const button = document.getElementById("search")
button.addEventListener("click",getPokemonDetails)