import React, {useContext} from 'react';
import {Button, Input} from 'semantic-ui-react';
import { Link } from "react-router-dom";
import {GlobalContext} from '../GlobalContext';

import '../styles/home.css';

function Home() {
    let {state, setCompany, setRole} = useContext(GlobalContext);
    let {company, role} = state;
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
            <Link to='prep'>
                <Button 
                    circular
                    size='massive'
                    icon='play'
                    className='start'
                />
            </Link>
        </div>
    )
}

export default Home;