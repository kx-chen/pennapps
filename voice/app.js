const speech = require('@google-cloud/speech');
const speechClient = new speech.v1p1beta1.SpeechClient();

const port = process.env.PORT || 1337;
const server = require('http').createServer(app);

const io = require('socket.io')(server);


io.on('connection', function (client) {
    console.log('Client Connected to server');
    client.on('binaryData', function (data) {
        let daStream = startRecognitionStream(this, data);
        if (daStream !== null) {
            console.log("stream is there", data);
            daStream.write(data);
        }
        setTimeout(() => {
            daStream.end();
        }, 1000)
    });

    function startRecognitionStream(client) {
        return speechClient
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', (data) => {
                process.stdout.write(data.results[0] && data.results[0].alternatives[0] ? `Transcription: ${data.results[0].alternatives[0].transcript}\n` : '\n\nReached transcription time limit, press Ctrl+C\n');
                client.emit('speechData', data);
                console.log(data);
                if (data.results[0] && data.results[0].isFinal) {
                    stopRecognitionStream();
                    startRecognitionStream(client);
                }
            });
    }

    function stopRecognitionStream() {
        if (recognizeStream) {
            recognizeStream.end();
        }
        recognizeStream = null;
    }
});


const encoding = 'MP3';
const sampleRateHertz = 44100;
const languageCode = 'en-US';

const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        profanityFilter: false,
        enableWordTimeOffsets: true,
    },
    interimResults: false,
};


server.listen(port, '127.0.0.1', function () {
    console.log('Server started on port:' + port);
});
