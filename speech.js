//Some of the concepts where borrowed from various internet resources.

const listen = document.getElementById('listen');
const speak = document.getElementById('speak');

listen.addEventListener('click', function () {
    const text = document.getElementById('editor');
    if ('speechSynthesis' in window) {
        if (speechSynthesis.speaking) {
       
            speechSynthesis.cancel();
            listen.classList.remove('selected-more');
            return;
        }

        const message = new SpeechSynthesisUtterance(text.textContent.trim());
        message.lang = 'en-US';
        message.rate = 1; 
        message.pitch = 1; 
        message.onend = () => listen.classList.remove('selected-more');
        message.onerror = () => {
            alert("An error occurred during speech synthesis.");
            listen.classList.remove('selected-more');
        };
        speechSynthesis.speak(message);
        listen.classList.add('selected-more');
    } else {
        alert("Speech Synthesis is not supported in this browser.");
    }
});

speak.addEventListener('click', function () {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US'; 
        recognition.interimResults = false;
        recognition.maxAlternatives = 1; 

        recognition.onstart = () => {
              speak.classList.add('selected-more');
        };

        recognition.onresult = (event) => {
            
            const transcript = event.results[0][0].transcript;
            document.getElementById('editor').textContent = transcript;
        };

        recognition.onerror = (event) => {
            // Handle recognition errors
            alert("Recognition error: " + event.error);
        };

        recognition.onend = () => {
            speak.classList.remove('selected-more');
        };
        recognition.start();
    } else {
        alert("Speech Recognition is not supported in this browser.");
    }
});
