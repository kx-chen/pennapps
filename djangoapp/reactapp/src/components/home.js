import React, {useState} from 'react';
import {Button, Input} from 'semantic-ui-react';

import '../styles/home.css';

function Home() {
    let [company, setCompany] = useState("");
    let [role, setRole] = useState("");

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
            <Button 
                circular
                size='massive'
                icon='play'
                className='start'
            />
        </div>
    )
}

export default Home;