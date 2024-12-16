import Dropdown from "../components/Dropdown"
import Input from "../components/Input"
import LimitBar from "../components/LimitBar"
import { types } from "../consts/consts"
export const metadata = {
  title: "Pokemon List"
} 

export default function RootLayout({ children }) {    
  
  

    return <div className="container">
      <div id="search">
      <Dropdown list={types} name={"type"}/>
      <Input/>
      <LimitBar/>
      </div>
        
        <main>{children}</main>
        </div>
  }
