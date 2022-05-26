import React, { useEffect, useState, createContext } from "react";

export const UserContext = React.createContext();


export const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState("DefaultUsr");

return (
    <UserContext.Provider value = {[username, setUsername]}>
        {children}
    </UserContext.Provider>
    );
}