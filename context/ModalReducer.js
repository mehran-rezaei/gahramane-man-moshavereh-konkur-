import React, { createContext, useReducer, useState } from 'react';

const initialState = {
    showLoginModal : false,
    showSignUpModal : false,
    showPhoneValidation : false,
    showConfirmPassword : false,
    showForgetPassword : false,
    phoneNumber : '',
    password : ''
}
const modalReducer = (state,action ) => {
    switch(action.type){
            case "ON_LOGIN" :
                return {
                    showLoginModal : true,
                }
            case "OFF_LOGIN" :
            return {
                ...state,
                showLoginModal : false,
            }  
            case "ON_SIGNUP" :
                return {
                    ...state,
                    showSignUpModal : true,
                }
            case "OFF_SIGNUP" :
                return {
                    ...state,
                    showSignUpModal : false,
                }
            case "ON_VALIDATION" :
                return {
                    showPhoneValidation : true,
                    showForgetPassword : false,
                    phoneNumber : action.payload
                }
            case "OFF_VALIDATION" :
                return {
                    showPhoneValidation : false,
                }
            case "ON_CONFIRM-PASSWORD" :
                    return {
                        showConfirmPassword : true,
                        showPhoneValidation : false,
                    }
            case "OFF_CONFIRM-PASSWORD" :
                        return {
                            showConfirmPassword : false,
                        }  
            case "ON_FORGET-PASSWORD" :
                return {
                    showForgetPassword : true,
                    phoneNumber : action.payload 
                }  
            case "OFF_FORGET-PASSWORD" :
                return {
                    showForgetPassword : false,
                    phoneNumber : action.payload 
                }                         
        default : return state
        console.log(state);    
    }
}
export const modalHandler = createContext()
const ModalContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(modalReducer,initialState)
    return (
         <modalHandler.Provider value={{state , dispatch}}>
                    {children}
         </modalHandler.Provider>
    );
};
export default ModalContextProvider ;