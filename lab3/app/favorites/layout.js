import Input from "../components/Input";

export const metadata = {
  title: "Favorite pokemons"
} 
export default function RootLayout({ children }) {
  return (<div className="container">
    {/* <Input/> */}
    {children}
</div>);
}