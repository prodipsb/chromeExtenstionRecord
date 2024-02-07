// Define variables for capturing and recording
let mediaStream;
let mediaRecorder;
let chunks = [];

// Function to start screen recording
function startRecording() {
    // Capture the screen
    navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
            mediaStream = stream;
            mediaRecorder = new MediaRecorder(stream);

            // Start recording
            mediaRecorder.ondataavailable = event => {
                chunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                // Save the recording
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                saveRecording(blob);
            };

            mediaRecorder.start();
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
}

// Function to stop recording
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        mediaStream.getTracks().forEach(track => track.stop());
    }
}

// Function to save recording using chrome.downloads API
function saveRecording(blob) {
    chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: 'recorded_video.webm',
        saveAs: true
    });
}

// Example of starting recording when a button is clicked
document.getElementById('startBtn').addEventListener('click', startRecording);

// Example of stopping recording when a button is clicked
document.getElementById('stopBtn').addEventListener('click', stopRecording);






// document.addEventListener('DOMContentLoaded', function() {
//     let startBtn = document.getElementById('startBtn');
//     let stopBtn = document.getElementById('stopBtn');

//     startBtn.addEventListener('click', function() {
//         startRecording();
//         startBtn.style.display = 'none';
//         stopBtn.style.display = 'block';
//     });

//     stopBtn.addEventListener('click', function() {
//         stopRecording();
//         stopBtn.style.display = 'none';
//         startBtn.style.display = 'block';
//     });

//     let mediaStream;
//     let mediaRecorder;
//     let chunks = [];

//     function startRecording() {
//         navigator.mediaDevices.getDisplayMedia({ video: true })
//             .then(stream => {
//                 mediaStream = stream;
//                 mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = event => {
//                     chunks.push(event.data);
//                 };
//                 mediaRecorder.onstop = () => {
//                     const blob = new Blob(chunks, { type: 'video/webm' });
//                     const url = URL.createObjectURL(blob);
//                     console.log('recorded url', url)
//                     // Here you can do something with the recorded video URL
//                 };
//                 mediaRecorder.start();
//             })
//             .catch(error => {
//                 console.error('Error accessing media devices:', error);
//             });
//     }

//     function stopRecording() {
//         if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//             mediaRecorder.stop();
//             mediaStream.getTracks().forEach(track => track.stop());
//         }
//     }
// });
