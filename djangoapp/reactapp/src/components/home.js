import React, {useContext, useState, useEffect} from 'react';
import {Button, Input} from 'semantic-ui-react';
import { Link } from "react-router-dom";
import {GlobalContext} from '../GlobalContext';

import '../styles/home.css';

function Home() {
    let {state, setCompany, setRole} = useContext(GlobalContext);
    let {company, role} = state;
    let [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        navigator
            .mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
                console.log('Permission Granted');
                setIsBlocked(false);
            })
            .catch(err => {
                console.log('Permission Denied');
                setIsBlocked(true);
            });
    }, []);

    return (
        <div className='container'>
            <h1>InterviewMe</h1>
            <Input
                placeholder='Enter company name'
                value={company}
                onChange={(e, {value}) => setCompany(value)}
            />
            <Input
                placeholder='Enter role'
                value={role}
                onChange={(e, {value}) => setRole(value)}
            />
            {isBlocked && <p>Enable microphone access and refresh to proceed.</p>}
            <Link to='prep'>
                <Button
                    circular
                    size='massive'
                    icon='play'
                    className='start'
                    disabled={!company || !role || isBlocked}
                />
            </Link>
        </div>
    )
}

export default Home;