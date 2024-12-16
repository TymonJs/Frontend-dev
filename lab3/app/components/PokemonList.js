import Link from 'next/link';
import "@fortawesome/fontawesome-free/css/all.css";
import Heart from './Heart';

export default function PokemonList({res,query="", limit=20, type="",unheart=true,sort="", view=""}){   

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
    if (view) template=`${template}view=${view}`
    else{
        if (query) template=`${template}search=${query}&`
        if (limit && limit!=20) template=`${template}limit=${limit}&`
        if (type) template=`${template}type=${type}&`
        if (sort) template=`${template}sort=${sort}&`
        if (template.endsWith("&")) template = template.slice(0,-1) 
    }
    
    if (sort==="name" || sort==="name-back"){
        res.sort((a,b) => {
            if (a.name<b.name) return -1
            if (a.name>b.name) return 1
            return 0
        })
        
        if (sort==="name-back") res.reverse()
    }
    else if (sort==="id" || sort==="id-back"){
        res.sort((a,b) => {
            
            const p1 = a.url.split("/")
            const p2 = b.url.split("/")
            
            const id1 = parseInt(p1[p1.length-2])
            const id2 = parseInt(p2[p2.length-2])
            
            if (id1<id2) return -1
            if (id1>id2) return 1
            return 0
        })
        if (sort==="id-back") res.reverse()
    }

    
    const pokemons = filterPokemons(res,query).slice(0,limit)
    const out = getList(pokemons)
    
    return <>
        
        <div id="pokemonList">
        {out}
        </div>
    </>
   
    
}
