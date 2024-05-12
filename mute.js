const audio = document.getElementById('bgVideo');
const soundIcon = document.getElementById('sound-icon');

soundIcon.addEventListener('click', function() {
    audio.muted = !audio.muted; // Toggle audio mute state
    if (audio.muted) {
        soundIcon.classList.remove('fa-volume-up');
        soundIcon.classList.add('fa-volume-mute');
    } else {
        soundIcon.classList.remove('fa-volume-mute');
        soundIcon.classList.add('fa-volume-up');
    }
});
