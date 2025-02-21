// List of songs you want to display
const songs = {
    song1: "Adiye.mpeg",
    song2: "Badass.mpeg",
    song3: "Donu donu.mpeg",
    song4: "kaatu payale.mpeg",
    song5: "Kan Moodi.mpeg",
    song6: "Konja Naal.mpeg",
    song7: "Kangal Irandal.mpeg",
    song8: "Sakkara katti.mpeg",
    song9: "Uyirey Lyrics.mp3"
};

// Variable to track the current song index
let currentSongIndex = 0;

// Function to populate the music list dynamically
function populateMusicList() {
    const musicList = document.getElementById("musicList");

    // Clear any existing list items
    musicList.innerHTML = '';

    // Iterate over the song list and create list items for each song
    for (const songId in songs) {
        const li = document.createElement("li");
        li.textContent = songs[songId]; // Set the song name as the text content
        li.onclick = function() {
            playMusic(songId);  // Play the song when clicked
        };
        musicList.appendChild(li); // Add the song to the list
    }
}

// Function to play the music when clicked
function playMusic(songId) {
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    audioPlayer.addEventListener("timeupdate", function () {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress; // Update progress bar value
        console.log("Progress:", progress);  // Log progress to console
    });
    
    // Allow user to click on the progress bar to change song position
    progressBar.addEventListener("click", function (event) {
        const clickedPosition = (event.offsetX / progressBar.offsetWidth) * audioPlayer.duration;
        audioPlayer.currentTime = clickedPosition;
    });
    console.log("Playing song:", songs[songId]); // Log the song being played

    // Check if the song exists
    if (songs[songId]) {
        // Set the audio source to the selected song
        audioSource.src = songs[songId];

        // Show the audio player and update the song name
        document.querySelector(".audio-player").style.display = "block";
        document.getElementById("songName").textContent = songs[songId]; // Display song name

        // Reload the audio element and start playing
        audioPlayer.load();
        audioPlayer.play().then(() => {
            console.log("Audio started playing.");
        }).catch(err => {
            console.error("Error playing audio:", err); // Handle any playback issues
        });

        // Reset progress bar
        const progressBar = document.getElementById("progressBar");
        progressBar.value = 0;

        // Update progress bar as the song plays
        audioPlayer.addEventListener("timeupdate", updateProgressBar);
        
        // Allow user to click on the progress bar to change song position
        progressBar.addEventListener("click", changeSongPosition);
    } else {
        alert("Song not found!");
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const audioPlayer = document.getElementById("audio-player");
    const progressBar = document.getElementById("progressBar");

    // Ensure that the audio duration is available (it might not be if the audio is not fully loaded)
    if (audioPlayer.duration && audioPlayer.duration > 0) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        console.log("Progress bar value:", progress); // Log the progress bar value for debugging
    }
}

// Allow user to click on the progress bar to change song position
function changeSongPosition(event) {
    const progressBar = document.getElementById("progressBar");
    const audioPlayer = document.getElementById("audio-player");

    const clickedPosition = (event.offsetX / progressBar.offsetWidth) * audioPlayer.duration;
    audioPlayer.currentTime = clickedPosition;
}

// Toggle play/pause when clicked
function togglePlayPause() {
    const audioPlayer = document.getElementById("audio-player");
    const playPauseButton = document.getElementById("playPause");

    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerHTML = "&#10074;&#10074;"; // Pause icon
    } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = "&#9654;"; // Play icon
    }
}

// Play the next song in the list
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % Object.keys(songs).length; // Loop to the first song after last one
    const songId = Object.keys(songs)[currentSongIndex]; // Get the song key
    playMusic(songId);
}

// Play the previous song in the list
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + Object.keys(songs).length) % Object.keys(songs).length; // Loop to the last song if at the start
    const songId = Object.keys(songs)[currentSongIndex]; // Get the song key
    playMusic(songId);
}

// Function to search for songs
function searchSongs() {
    const searchTerm = document.getElementById('searchbar').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');

    // Clear previous search results
    searchResults.innerHTML = '';

    // Filter the songs based on search term
    for (const songId in songs) {
        const songName = songs[songId].toLowerCase();
        if (songName.includes(searchTerm)) {
            const li = document.createElement("li");
            li.textContent = songs[songId];
            li.onclick = function() {
                playMusic(songId);
            };
            searchResults.appendChild(li);
        }
    }

    // Show or hide the search results
    if (searchTerm === '') {
        searchResults.style.display = 'none';
    } else {
        searchResults.style.display = 'block';
    }
}

// Populate the song list when the page loads
window.onload = function() {
    populateMusicList();
    document.getElementById('searchbar').addEventListener('input', searchSongs);
};
