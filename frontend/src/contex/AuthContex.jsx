/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from "react";


export const AuthContex=createContext(); 

export const useAuthContex=()=>{
    return useContext(AuthContex);
}

export const AuthContexProvider=({children})=>{
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem("chat-User");
        return user ? JSON.parse(user) : null; 
      });
    return <AuthContex.Provider value={{authUser,setAuthUser}}>
     {children}
    </AuthContex.Provider>;
}