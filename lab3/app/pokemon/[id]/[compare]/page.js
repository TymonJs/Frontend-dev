import Compare from "@/app/components/Compare"

export default async function Pokemon({params}){
    const {id,compare} = await params
    try{
        if (id<1|| id>1500 || compare<1 || compare>1500) return <h1 className="centered">Pokemons not found</h1>
    }
    catch{
        return <h1 className="centered">Pokemon not found</h1>
    }
    return <div className="container">
        <Compare id={id} compare={compare}></Compare>
    </div>
}