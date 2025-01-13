export const metadata = {
    title: "Pokemon"
  } 

import Dropdown from "@/app/components/Dropdown"
import Input from "@/app/components/Input"
import LimitBar from "@/app/components/LimitBar"
import { types } from "@/app/consts/consts"
  
  export default function RootLayout({ children }) {          
      
      return <>
        
        {children}</>
    }
    