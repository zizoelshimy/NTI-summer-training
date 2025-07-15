let countdownInterval;
let currentTime;
let messages = [];
let currentMessageIndex = 0;

function startCountdown() {
    const eventName = document.getElementById('eventName').value.trim();
    const duration = parseInt(document.getElementById('duration').value);
    const messageText = document.getElementById('messages').value.trim();

    if (!eventName || !duration || !messageText) {
        alert('Please fill in all fields!');
        return;
    }

    // Parse messages
    messages = messageText.split('\n').filter(msg => msg.trim() !== '');
    if (messages.length === 0) {
        alert('Please enter at least one message!');
        return;
    }

    // Initialize timer
    currentTime = duration;
    currentMessageIndex = 0;

    // Update UI
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('timerDisplay').classList.add('active');
    document.getElementById('eventTitle').textContent = eventName;
    document.getElementById('countdown').textContent = currentTime;
    document.getElementById('message').textContent = messages[currentMessageIndex];

    // Start countdown
    countdownInterval = setInterval(function() {
        currentTime--;
        document.getElementById('countdown').textContent = currentTime;

        if (currentTime > 0) {
            // Show next message
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            document.getElementById('message').textContent = messages[currentMessageIndex];
        } else {
            // Time's up! Show celebration
            clearInterval(countdownInterval);
            showCelebration(eventName);
        }
    }, 2000);
}

function showCelebration(eventName) {
    document.getElementById('timerDisplay').classList.remove('active');
    document.getElementById('celebration').classList.add('active');
    document.getElementById('celebrationEvent').textContent = eventName;

    // Play celebration sound  
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmgfBTWH0fPTgjMGHm7A7+OZURE');
        audio.play();
    } catch (e) {
        console.error('Failed to play audio:', e);
    }
}

function resetTimer() {
    clearInterval(countdownInterval);
    document.getElementById('setupForm').style.display = 'flex';
    document.getElementById('timerDisplay').classList.remove('active');
    document.getElementById('celebration').classList.remove('active');
    
    // Clear form
    document.getElementById('eventName').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('messages').value = '';
}

// Add some example messages on page load
window.addEventListener('load', function() {
    document.getElementById('messages').value = 'Get ready for the event!\nAlmost there!\nFinal countdown!\nHere we go!';
});