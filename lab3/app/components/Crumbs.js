import Link from "next/link"
export default function Crumbs({path = ""}){
    let el;
    console.log(path);
    if (!path) return 
    else if (path==="pokemon") el = <span><Link href="/pokemon" preload="false" >pokemon</Link></span>
    else if (path==="favorites") el = <span><Link href="/favorites" preload="false">favorites</Link></span>

    return <p>
        <span><Link href="/">homepage</Link></span>
        <span>/</span>
        {el}
        <span>/</span>
    </p>
}