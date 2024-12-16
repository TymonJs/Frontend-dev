import Link from 'next/link';
import "@fortawesome/fontawesome-free/css/all.css";
import Heart from './Heart';

const getPokemonList = async (limit) => {
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

const getPokemonListByType = async (type) => {
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

export default async function PokemonList({ids="",query="", limit=20, type=""}){   

    const filterPokemons = (pokemons,input) => {
        if (!input) return pokemons
        
        const inputValue = input.toLowerCase()
        try{
            const filteredPokemons = pokemons.filter(el => el.name.toLowerCase().includes(inputValue))
            return filteredPokemons
        }
        catch (e) {
            console.log(e);
        }
    }


    const getList = (list) => {
        if (!Array.isArray(list)) return <p>No pokemons to display</p>
        if (list.length===0) return (<h2 className="warning">No matching pokemons</h2>);
        
        return list.map((pokemon,index) => {

            const parts = pokemon.url.split("/");
            const id = parts[parts.length - 2];

            const link = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            
            const route = template.replace("<id>",id)
            
            return (
                <div key={index} className="pokemonCard">
                    <p>{pokemon.name} #{id}</p>
                    <Link href={route} preload={"false"} key={index}><img src={link} alt={pokemon.name} className="pokemonImg"></img></Link>
                    {/* <i className="fa-solid fa-heart heart"></i> */}
                    <Heart id={id} list={list}/>
                    {/* <img className="heart" src="/heart.png" ></img> */}
                </div>
            
                
            );
        })
    }
    let template = "/pokemon/<id>?"
    if (query) template=`${template}search=${query}&`
    if (limit) template=`${template}limit=${limit}&`
    if (type) template=`${template}type=${type}&`
    if (template.endsWith("&")) template = template.slice(0,-1)
    
    const res = type? await getPokemonListByType(type): await getPokemonList(1000)
                    
    const pokemons = filterPokemons(res,query).slice(0,limit)
    
    return <>
        
        <div id="pokemonList">
        {getList(pokemons)}
        </div>
    </>
   
    
}
