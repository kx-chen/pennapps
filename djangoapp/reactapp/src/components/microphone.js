import React, {useEffect, useContext} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import {Button, Icon} from 'semantic-ui-react';
import {GlobalContext} from '../GlobalContext';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function Microphone(props) {
    let {setAudio} = useContext(GlobalContext);
    const start = () => {
        Mp3Recorder
            .start()
            .then(() => console.log('start recording'))
            .catch((e) => console.error(e));
    }

    const stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                //create mp3 file
                const file = new File(buffer, 'file.mp3', {type: blob.type});
                const player = new Audio(URL.createObjectURL(file));
                //save audio
                props.setStop(true);
                setAudio(player);                
            }).catch((e) => console.log(">>",e));
    };

    useEffect(() => {
        start();
        return stop;
    }, []);

    return (
        <Button
            onClick={stop}
            className='stop'
        >
            <Icon name='stop'/>
            Stop Recording
        </Button>
    );
}

export default Microphone;
