import Link from 'next/link';
import "@fortawesome/fontawesome-free/css/all.css";
import Heart from './Heart';

export default function PokemonList({res,query="", limit=20, type="",unheart=true,sort=""}){   

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
                    <Heart id={id} list={list} unheart={unheart}/>
                </div>
            
                
            );
        })
    }
    let template = "/pokemon/<id>?"
    if (query) template=`${template}search=${query}&`
    if (limit) template=`${template}limit=${limit}&`
    if (type) template=`${template}type=${type}&`
    if (sort) template=`${template}type=${sort}&`
    if (template.endsWith("&")) template = template.slice(0,-1)
    
    
    const pokemons = filterPokemons(res,query).slice(0,limit)
    const out = getList(pokemons)
    
    return <>
        
        <div id="pokemonList">
        {out}
        </div>
    </>
   
    
}
