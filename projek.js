const audioPlayer = document.getElementById("audio-player");
const playButtons = document.querySelectorAll(".play-button");
const searchBar = document.getElementById("search-bar");
const songs = document.querySelectorAll(".song");
let currentPlaying = null;

// Fungsi untuk memutar lagu
playButtons.forEach(button => {
    button.addEventListener("click", function () {
        const songElement = this.closest(".song");
        let songSrc = songElement.getAttribute("data-src");

        if (!songSrc) {
            console.error("Atribut data-src tidak ditemukan!");
            return;
        }

        songSrc = encodeURI(songSrc);

        if (audioPlayer.src.includes(songSrc)) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                this.innerHTML = "⏸";
            } else {
                audioPlayer.pause();
                this.innerHTML = "▶";
            }
        } else {
            audioPlayer.src = songSrc;
            audioPlayer.play();
            resetButtons();
            this.innerHTML = "⏸";
            currentPlaying = this;
        }
    });
});

// Reset tombol jika lagu berhenti
function resetButtons() {
    playButtons.forEach(button => {
        button.innerHTML = "▶";
    });
}

audioPlayer.addEventListener("ended", function () {
    if (currentPlaying) {
        currentPlaying.innerHTML = "▶";
    }
});

// Fungsi pencarian lagu
searchBar.addEventListener("keyup", function () {
    let filter = searchBar.value.toLowerCase();
    
    songs.forEach(song => {
        let title = song.querySelector(".song-title").textContent.toLowerCase();
        let artist = song.querySelector(".song-artist").textContent.toLowerCase();
        
        if (title.includes(filter) || artist.includes(filter)) {
            song.style.display = "flex";
        } else {
            song.style.display = "none";
        }
    });
});
