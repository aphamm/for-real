import React, { useEffect, useState, createContext } from "react";
import { getPosts } from '../../firebase';
export const UserContext = React.createContext();


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [data, setData] = useState();

    const gettingData = async () =>{
      const dummyDataBaseData = await getPosts();
      setData(dummyDataBaseData.reverse());
      console.log("updating data");
      }

return (
  <UserContext.Provider value={[user, setUser, data, setData, gettingData]}>
    {children}
  </UserContext.Provider>
);
}