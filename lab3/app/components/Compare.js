'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const getPokemonById = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data;
};



export default  function Compare({ id, compare }) {
    const [pok1,setPok1] = useState(null)
    const [pok2,setPok2] = useState(null)

    useEffect(() => {
        const comp1 = localStorage.getItem("compare1")
        const comp2 = localStorage.getItem("compare2")
        if (comp1 && comp2){
            setPok1(JSON.parse(comp1))
            setPok2(JSON.parse(comp2))
            
        }
        
        getPokemonById(id).then(res =>{
            setPok1(res)
            localStorage.setItem("compare1",JSON.stringify(res))
        })
        getPokemonById(compare).then(res => {
            setPok2(res)
            localStorage.setItem("compare2",JSON.stringify(res))
        })
    },[])
    

    const basicStats= ["height","weight"];

    const getRow = (stat,type=false) => {
        return <>
            <td>{stat}</td>
            <td className={getColor(pok1[stat], pok2[stat])}>
                {pok1[stat]}
            </td>
            <td className={getColor(pok2[stat],pok1[stat])}>
                {pok2[stat]}
            </td>
        </>
        }
    const typeStats = () => {
        return pok1.stats.map((statObj, index) => {
            const statName = statObj.stat.name;
            const pok1Value = statObj.base_stat;
            const pok2Value = pok2.stats[index].base_stat;
        
            return (
            <tr key={statName}>
                <td>{statName}</td>
                <td className={getColor(pok1Value, pok2Value)}>{pok1Value}</td>
                <td className={getColor(pok2Value, pok1Value)}>{pok2Value}</td>
            </tr>
            );
        });
    };
    
    const getColor = (v1, v2) => {
        if (v1 > v2) return "green";
        else if (v1 < v2) return "red";
        return
    };
    if (!pok1) return
    return (
        <div className="compare-container">
            <h1>Compare Pokemon</h1>
            <div className="pokemon-display">
                <div className="pokemon">
                    <Link href={`/pokemon/${id}`}><img src={pok1?.sprites.front_default} /></Link>
                    <h2>{pok1?.name}</h2>
                </div>
                <div className="pokemon">
                <Link href={`/pokemon/${compare}`}><img src={pok2?.sprites.front_default}/></Link>
                    <h2>{pok2?.name}</h2>
                </div>
            </div>
            <Link href={`/pokemon/${id}`}><button>Wyszyść porównanie</button></Link>
            <table>
            <thead>
                <tr>
                <th>Stat</th>
                <th>{pok1?.name}</th>
                <th>{pok2?.name}</th>
                </tr>
            </thead>
            <tbody>
                {pok1 && pok2
                    ?<>
                        {basicStats.map((el) => {
                            return <tr key={el}>
                                {getRow(el)}
                            </tr>
                        })}
                        {typeStats()}
                        <tr key="type">
                            <td>Types</td>
                            <td>{pok1.types.map(el => el.type.name).join(", ")}</td>
                            <td>{pok2.types.map(el => el.type.name).join(", ")}</td>
                        </tr>
                    </>
                    :null
                }   
            </tbody>
            </table>
        </div>
    );
    }
