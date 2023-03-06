import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from './AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const ChatContext = createContext();


export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: null,
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: [currentUser.uid, action.payload.uid].sort().join("")
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (<ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
    </ChatContext.Provider>)
}