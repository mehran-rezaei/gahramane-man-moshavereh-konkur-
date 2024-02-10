import React, { createContext, useReducer, useState } from 'react';

const initialState = {
  token : ''
}
const tokenReducer = (state,action ) => {
    switch(action.type){
            case "SET-TOKEN" :
                return {
                    token : action.payload,
                }                        
        default : return state
    }
}
export const tokenHandler = createContext()
const TokenContextProvider = ({children}) => {
    const [token , setToken] = useReducer(tokenReducer,initialState)
    return (
         <tokenHandler.Provider value={{token , setToken}}>
                    {children}
         </tokenHandler.Provider>
    );
};
export default TokenContextProvider ;