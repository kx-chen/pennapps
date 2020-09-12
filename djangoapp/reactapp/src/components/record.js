import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';

function Record() {
    let {state} = useContext(GlobalContext);
    let {company, role} = state;
    let [counter, setCounter] = useState(5);
    let [question, setQuestion] = useState("");
    let [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        const fetchQuestion = async () => {
            const id = Math.floor(Math.random() * 26) + 1;
            const res = await fetch(`/api/question-detail/${id}`);
            const data = await res.json();
            const q = data
                .question
                .replace('[COMPANY]', company)
                .replace('[ROLE]', role);
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
    if (timeLeft <= 0) {
        return <Redirect to='/result'/>
    }

    // TODO: Render the recorder component and the question
    return (
        <div className='container'>
            <h2 className='question'>
                "{question}"
            </h2>
            Recording... 
            <h3 className='timer'>
                {timeLeft}
            </h3>
        </div>
    );
}

export default Record;