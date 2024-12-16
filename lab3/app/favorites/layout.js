import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
export const metadata = {
  title: "Favorite pokemons"
} 
export default function RootLayout({ children }) {
  return (<div className="container">
    {children}
</div>);
}