import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';
import {displayTime} from '../util';
import Microphone from './microphone';

import '../styles/record.css';

function Record() {
    let {state, setTime, setQuestionID} = useContext(GlobalContext);
    let {company, role} = state;
    let [counter, setCounter] = useState(5);
    let [question, setQuestion] = useState("");
    let [timeLeft, setTimeLeft] = useState(120);
    let [processing, setProcessing]  = useState(false)
    let [stop, setStop] = useState(false);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        const id = Math.floor(Math.random() * 26) + 1;
        setQuestionID(id);
        const fetchQuestion = async () => {
            const res = await fetch(`/api/question-detail/${id}`);
            const data = await res.json();
            const q = data
                .question
                .replace('{COMPANY}', company)
                .replace('{ROLE}', role);
            setQuestion(q);
        }
        fetchQuestion();
    }, []);

    useEffect(() => {
        counter === 0 && timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }, [counter, timeLeft]);

    if (!company || !role) {
        return <Redirect to='/'/>
    }

    // 5 second countdown
    if (counter > 0) {
        return (
            <div className='container'>
                <h1>{counter}</h1>
            </div>
        );
    }

    // End recording after 2 minutes
    if (timeLeft <= 0 || stop) {
        console.log("redirecting!!@")
        setTime(120 - timeLeft);
        return <Redirect to='/result'/>
    }


    if (!processing) {
        return (
            <div className='container'>
                <h2 className='question'>"{question}"</h2>
                <h2 className='time'>{displayTime(timeLeft)}</h2>
                <Microphone setStop={setStop} setProcessing={setProcessing}/>
            </div>
        );
    } else {
        return (
            <div className='container'>
                <h2 className='question'>Loading...</h2>
            </div>
        );
    }

}

export default Record;
