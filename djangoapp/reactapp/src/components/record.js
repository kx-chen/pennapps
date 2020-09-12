import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';
import Microphone from './microphone';

function Record() {
    let {state} = useContext(GlobalContext);
    let {company, role} = state;
    let [counter, setCounter] = useState(5);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    if (!company || !role) {
        return <Redirect to='/'/>
    }

    // 5 second countdown
    if (counter > 0) {
        return (
            <div className='container'>
              Question shows here
              <h1>{counter}</h1>
            </div>
        );
    }
    // TODO: Render the recorder component and the question
    return (
        <div className='container'>
          Question shows here
          <Microphone />
        </div>
    );
}

export default Record;
