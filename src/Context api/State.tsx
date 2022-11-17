import { createContext, useState } from "react";
import * as React from 'react';


export interface stateType{
    user:string,
    setUser:Function
}

export const LoginState = createContext({});



export function LoginProvider ({children}:any){
const [user,setUser]=useState("")


    return <LoginState.Provider value={{user,setUser}}>

        {children}

    </LoginState.Provider>


}