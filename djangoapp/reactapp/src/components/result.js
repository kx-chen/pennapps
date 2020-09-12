import React, {useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';
import {Button} from 'semantic-ui-react';

function Result() {
    let {state, setCompany, setRole} = useContext(GlobalContext);
    let {company, role} = state;
    let [route, setRoute] = useState('');

    if (!company || !role) {
        return <Redirect to='/'/>
    }

    // Reroute to home or new question
    if (route !== '') {
        if (route === '/') {
            setCompany('');
            setRole('');
        }
        return <Redirect to={route}/>
    }

    // TODO: Add text transcript, ability to download, and possibly metrics
    return (
        <div className='container'>
            <div className='result--btns'>
                <Button
                    circular
                    icon='stop'
                    onClick={() => setRoute('/')}
                    />
                <Button
                    circular
                    icon='step forward'
                    onClick={() => setRoute('/prep')}
                />
            </div>
        </div>
    );
}

export default Result;


