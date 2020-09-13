import React, {useEffect, useContext, useState} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import {Button, Icon} from 'semantic-ui-react';
import {GlobalContext} from '../GlobalContext';

const BIT_RATE = 128;
const DURATION_FACTOR = BIT_RATE/0.008
const Mp3Recorder = new MicRecorder({ bitRate: 128 });


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
                        console.log(state, player);
                        console.log({"file": file,
                                     "q": questionID,
                                     "time": file.size/DURATION_FACTOR });
                        const res = await fetch("/response-create/", {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: {"file": file, "q": questionID, "time": player.duration}
                        });
                        const data = await res.json();
                        console.log(data);
                    }
                    sendAudio(file, player);
                }
            })
            .then(() => setCurrentlyRecording(false))
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
