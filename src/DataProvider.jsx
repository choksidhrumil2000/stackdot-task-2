import { createContext, useState } from "react";
import usersData1 from './Data/users.json';
import productsData1 from './Data/products.json';

export const dataContext = createContext();
export default function DataProvider ({children}){
    const [usersData,setUsersData] = useState(usersData1);
    const [productsData,setProductsData] = useState(productsData1);

    // setUsersData(usersData1);
    // setProductsData(productsData1);

  return  (
       <dataContext.Provider value={{usersData,setUsersData,productsData,setProductsData}}>
      {children}
    </dataContext.Provider>
  )

}