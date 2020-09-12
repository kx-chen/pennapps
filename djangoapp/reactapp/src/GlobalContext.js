import React, { createContext, useState } from 'react';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    let [state, setState] = useState({
        company: '',
        role: '',
    });

    const setCompany = (val) => {
        setState(prevState => ({
            ...prevState,
            company: val,
        }));
    }

    const setRole = (val) => {
        setState(prevState => ({
            ...prevState,
            role: val,
        }));
    }

    return (
        <GlobalContext.Provider
            value={{state, setCompany, setRole}}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export {GlobalContext, GlobalProvider};