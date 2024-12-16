import Input from "../components/Input";
import Sort from "../components/Sort";

export const metadata = {
  title: "Favorite pokemons"
} 
export default function RootLayout({ children }) {
  return (<div className="container">
    <Sort/>
    {children}
</div>);
}