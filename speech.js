//Some of the concepts where borrowed from internet resources.

const listen = document.getElementById('listen');
const speak = document.getElementById('speak');

listen.addEventListener('click', function () {

    const text = document.getElementById('editor');
    if ('speechSynthesis' in window) {
        const message = new SpeechSynthesisUtterance(text.textContent);
        message.lang = 'en-US';
        message.rate = 1;
        message.pitch = 1;
        speechSynthesis.speak(message);

        alert('This feature is still being worked on, refresh the page to stop speech.');
    } else {
        alert("Speech Synthesis not supported in this browser.");
    }

    listen.classList.toggle('selected');
})

speak.addEventListener('click', function () {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = -1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('editor').textContent = transcript;
        };
        recognition.onerror = (event) => alert("Recognition error:", event.error);
        recognition.start();

        alert('This feature is still being worked on, refresh the page to stop recording.');
    } else {
        alert("Speech Recognition not supported in this browser.");
    }

    speak.classList.toggle('selected');
})
