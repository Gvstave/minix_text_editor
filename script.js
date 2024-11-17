document.addEventListener("DOMContentLoaded", function () {
document.body.classList.add('loaded');

    const title = document.getElementById('title');
    const editor = document.getElementById('editor');
    const toggleBtn = document.getElementById('toggle');
    const more = document.getElementById('more');
    const boldButton = document.getElementById('boldButton');
    const italicButton = document.getElementById('italicButton');
    const underlineButton = document.getElementById('underlineButton');
    const readonly = document.getElementById('readonly');
    const noticeHolder = document.getElementById('notice-holder');
    const clearButton = document.getElementById('notice');
    
    const disable = document.querySelectorAll('.disable');
    
    // This is a code section for disabled elements
    editor.contentEditable = "false";
    title.disabled = true;
    for(const item of disable){
           item.disabled = true;
    }
    
    function formatText(command, value = null) {
        document.execCommand(command, false, value);
    }
   document.getElementById('heading').addEventListener('change', function () {
        const value = this.value;
        if (value) {
            formatText('formatBlock', value);
        } else {
            formatText('formatBlock', 'p');
        }
    });

    document.getElementById('fontSelect').addEventListener('change', function () {
        const font = document.getElementById("fontSelect").value;
        document.execCommand("fontName", false, font);
        editor.style.fontFamily = font;
        title.style.fontFamily = font;
    });

    function performAction(command, button) {
        document.execCommand(command, false, null);
        button.classList.toggle('selected');
        editor.focus();
    }

    // Event listeners for each button
    boldButton.addEventListener('click', function () {
        performAction('bold', boldButton);
    });

    italicButton.addEventListener('click', function () {
        performAction('italic', italicButton);
    });

    underlineButton.addEventListener('click', function () {
        performAction('underline', underlineButton);
    });

    readonly.addEventListener('click', function () {
        readonly.classList.toggle('selected');
        if (editor.contentEditable === "false") {
            editor.contentEditable = "true";
            title.disabled = false;
            for(const item of disable){
           item.disabled = false;
    }
            noticeHolder.style.display = 'block';
            title.focus();
        } else {
            editor.contentEditable = "false";
            title.disabled = false;
            for(const item of disable){
           item.disabled = true;
    }
    
            noticeHolder.style.display = 'none';
        }
    });

    // Toggle menu function to open and close the menu
    toggleBtn.addEventListener('click', function () {
        more.classList.toggle('open');
      toggleBtn.classList.toggle('selected');
    });

    // This function clears the content of the title and editor areas
    clearButton.addEventListener('click', function () {
        title.value = "";
        editor.textContent = "";
        title.focus();
    });

    // Updates the number of characters entered in the editor field
    editor.addEventListener('input', function () {
        clearButton.textContent = editor.textContent.length;
        clearButton.classList.add('notice-animations');
    });

    // Resets notice after a brief delay
    editor.addEventListener('keyup', function () {
        setTimeout(() => {
            clearButton.textContent = 'reset';
            clearButton.classList.remove('notice-animations');
        }, 3000);
    });

    // Focuses editor on Enter key press in title field
    title.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            editor.focus();
        }
    });
});
