// background.js

// Example: Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'startRecording') {
        // Start the recording process
    } else if (message.action === 'stopRecording') {
        // Stop the recording process
    }
});
