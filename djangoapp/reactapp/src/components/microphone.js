import React, {useEffect, useContext, useState} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import {Button, Icon} from 'semantic-ui-react';
import {GlobalContext} from '../GlobalContext';

const BIT_RATE = 128;
const DURATION_FACTOR = BIT_RATE/0.008
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const io = require('socket.io-client');
const socket = io('http://localhost:1337');


function Microphone(props) {
    let {state, setAudio} = useContext(GlobalContext);
    let {questionID} = state;
    let [currentlyRecording, setCurrentlyRecording] = useState(false);
    
    const start = () => {
        Mp3Recorder
            .start()
            .then(() => setCurrentlyRecording(true))
            .catch((e) => console.error(e));
    }

    const stop = () => {
        console.log("stop")
        socket.emit('startGoogleCloudStream');
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                if (currentlyRecording) {
                    //create mp3 file
                    const file = new File(buffer, 'file.mp3', {type: blob.type});
                    const player = new Audio(URL.createObjectURL(file));
                    //play audio
                    props.setStop(true);
                    setAudio(player);

                    const sendAudio = async (file, player) => {
                        console.log(state, player, blob);
                        console.log({"file": file,
                                     "q": questionID,
                                     "time": file.size/DURATION_FACTOR });
                        socket.emit('binaryData', file);
                    }
                    sendAudio(file, player);
                }
            })
            .then(() => {
                setTimeout(() => {
                    socket.emit('endGoogleCloudStream');
                }, 1000)

                setCurrentlyRecording(false)
            })
            .catch((e) => console.log(">>",e));
    };

    useEffect(() => {
        start();
        if (!currentlyRecording)
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
