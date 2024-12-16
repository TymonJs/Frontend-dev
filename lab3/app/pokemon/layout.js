import Dropdown from "../components/Dropdown"
import Input from "../components/Input"
import LimitBar from "../components/LimitBar"
export const metadata = {
  title: "Pokemon List"
} 

export default function RootLayout({ children }) {    
  
  

    return <div className="container">
      <div id="search">
      <Dropdown/>
      <Input/>
      <LimitBar/>
      </div>
        
        <main>{children}</main>
        </div>
  }
