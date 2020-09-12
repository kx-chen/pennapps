import React, {Component} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Microphone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        }
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                //create mp3 file
                const file = new File(buffer, 'file.mp3', {type: blob.type});
                //play sound
                const player = new Audio(URL.createObjectURL(file));
                player.play();
            }).catch((e) => console.log(">>",e));
    };

    componentWillMount() {
        //get microphone permissions
        navigator.mediaDevices.getUserMedia(
            { audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );

        //start recording right away
        this.start();
    }
    
    render() {
        return (
            <div className='container'>
              <button onClick={this.stop}
                      disabled={!this.state.isRecording}
              >
                Stop
              </button>
            </div>
        );
    }
}

export default Microphone;
