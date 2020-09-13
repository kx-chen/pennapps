import React, { createContext, useState } from 'react';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    let [state, setState] = useState({
        company: '',
        role: '',
        time: 0,
        audio: null,
        questionID: null,
        transcript: ''
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

    const setQuestionID = (questionID) => {
        setState(prevState => ({
            ...prevState,
            questionID,
        }));
    }

    const setTextTranscript = (transcript) => {
        setState(prevState => ({
            ...prevState,
            transcript,
        }));
    }

    return (
        <GlobalContext.Provider
            value={{state, setCompany, setRole, setAudio, setTime, setQuestionID, setTextTranscript}}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export {GlobalContext, GlobalProvider};
