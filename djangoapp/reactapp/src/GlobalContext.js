import React, { createContext, useState } from 'react';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    let [state, setState] = useState({
        company: '',
        role: '',
        time: 0,
        audio: null,
    });

    const setCompany = (company) => {
        setState(prevState => ({
            ...prevState,
            company,
        }));
    }

    const setRole = (role) => {
        setState(prevState => ({
            ...prevState,
            role,
        }));
    }

    const setAudio = (audio) => {
        setState(prevState => ({
            ...prevState,
            audio,
        }));
    }

    const setTime = (time) => {
        setState(prevState => ({
            ...prevState,
            time,
        }));
    }

    return (
        <GlobalContext.Provider
            value={{state, setCompany, setRole, setAudio, setTime}}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export {GlobalContext, GlobalProvider};