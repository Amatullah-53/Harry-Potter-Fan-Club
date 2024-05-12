const backgroundMusic = document.getElementById('backgroundMusic');
const muteIcon = document.getElementById('muteIcon');

// Function to toggle mute
function toggleMute() {
    backgroundMusic.muted = !backgroundMusic.muted;
    // Toggle icon based on mute state
    muteIcon.className = backgroundMusic.muted ? 'fas fa-volume-up' : 'fas fa-volume-mute';
}

// Function to change volume
function changeVolume(amount) {
    let newVolume = backgroundMusic.volume + amount;
    // Ensure new volume is within 0 to 1 range
    newVolume = Math.max(0, Math.min(1, newVolume));
    backgroundMusic.volume = newVolume;
}
