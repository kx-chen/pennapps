import React, {useState, useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';
import {displayTime} from '../util';
import {Button} from 'semantic-ui-react';

function Result() {
    let {state, setCompany, setRole, setAudio} = useContext(GlobalContext);
    let {company, role, time, audio} = state;
    let [route, setRoute] = useState('');

    useEffect(() => {
        audio && audio.play();
        return () => { setAudio(undefined); }
    }, [audio]);

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
                {displayTime(time)}
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


