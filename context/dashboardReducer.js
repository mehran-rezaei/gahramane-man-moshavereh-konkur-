import React, { createContext, useReducer, useState } from 'react';

const initialState = {
  userinfo : true,
  dailiReport : false,
  dailiHabit : false,
  redirecter : false,
  workReport : true,
  analiz : false

}
const pageReducer = (state,action ) => {
    switch(action.type){
            case "SET-INFO" :
                return {
                    userinfo  : true,
                }                        
            case "SET-DAILI-REPORT" :
                return {
                    dailiReport : true,
                } 
            case "SET-DAILI-HABIT" :
            return {
                dailiHabit : true,
            }   
            case "SET-REDIRECT" :
            return {
                redirecter : true,
            }
            case "SET-ANALIZ" :
                return {
                    analiz : true,
                }  
            case "SET-WORK-REPORT" :
                return {
                    workReport : true,
                }
        default : return state
    }
}
export const dashboardHandler = createContext()
const dashboardReducer = ({children}) => {
    const [page , setPage] = useReducer(pageReducer,initialState)
    return (
         <dashboardHandler.Provider value={{page , setPage}}>
                    {children}
         </dashboardHandler.Provider>
    );
};
export default dashboardReducer ;