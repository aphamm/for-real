import React, { useEffect, useState, createContext } from "react";
import { getPosts } from '../../firebase';
export const UserContext = React.createContext();


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();

    const gettingData = async () =>{
      const dummyDataBaseData = await getPosts();
      setData(dummyDataBaseData.reverse());
      console.log("updating data");
      }

    const gettingFilteredData = async () => {
      console.log('test');
      const dummyDataBaseData = await getPosts();
     
      //filter
      const fData = dummyDataBaseData.filter((item) => {
        const username = item.user;
        if (user.friends.includes(username)) {
          return true;
        } else {
          return false;
        }
      });
      console.log('bruh2');
      console.log(filteredData);
      setFilteredData(fData.reverse());
      console.log(filteredData);
    };

return (
  <UserContext.Provider
    value={[
      user,
      setUser,
      data,
      setData,
      gettingData,
      gettingFilteredData,
      filteredData,
    ]}
  >
    {children}
  </UserContext.Provider>
);
}