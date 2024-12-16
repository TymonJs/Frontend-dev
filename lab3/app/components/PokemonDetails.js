import Link from "next/link";

export default async function PokemonDetails ({id, view}){
    
    const getPokemonDetails = async (id) => {
        try{
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            const json = await res.json()
            return json
        }
        catch (error){
            console.log(error)
        }
    }
    
    
    
    if (!id) return (
    <div id="detailContainer">
    </div>)

    const pokemonDetails = await getPokemonDetails(id)
    
    const {name, sprites: {front_default}, types, weight, height, stats} = pokemonDetails;

    // const detailElements = []
    // // console.log(view);
    // const t = <p key="0"><strong>Types: </strong>{types.map(el => el.type.name).join(', ')}</p>
    // const h = <p key="1"><strong>Height: </strong>{height}</p>
    // const w = <p key="2"><strong>Weight: </strong>{weight}</p>
    // const s = stats.map((el,i) => <p key={i+3}><strong>{el.stat.name}: </strong>{el.base_stat}</p>)
    
    // if (!view) detailElements.push(t,h,w,s)

    // else if (view=="types") detailElements.push(t)
    // else if (view=="height" ) detailElements.push(h)
    // else if (view=="weight") detailElements.push(w)
    // else if (view=="stats" ) detailElements.push(s)

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