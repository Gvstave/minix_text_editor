//Some of the concepts where borrowed from internet resources.

const listen = document.getElementById('listen');
const speak = document.getElementById('speak');

listen.addEventListener('click', function () {
    const text = document.getElementById('editor');
    if ('speechSynthesis' in window) {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            listen.classList.remove('selected');
            return;
        }
        
        const message = new SpeechSynthesisUtterance(text.textContent);
        message.lang = 'en-US';
        message.rate = 1;
        message.pitch = 0;
        
        message.onend = () => listen.classList.remove('selected');
        speechSynthesis.speak(message);
        
        listen.classList.add('selected');
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

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('editor').textContent = transcript;
            speak.classList.remove('selected');
        };
        
        recognition.onerror = (event) => {
            alert("Recognition error: " + event.error);
            speak.classList.remove('selected');
        };
        
        recognition.onend = () => speak.classList.remove('selected');
        
        recognition.start();
        speak.classList.add('selected');
    } else {
        alert("Speech Recognition is not supported in this browser.");
    }
});