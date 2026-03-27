const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const playerSongTitle = document.getElementById("player-song-title");
const playerSongArtist = document.getElementById("player-song-artist");
const albumArt = document.querySelector("#player-album-art img");

const allSongs = [
  {
    id: 0,
    title: "Subtle Bodies",
    artist: "Carmen Villain (Actress Remix)",
    duration: "3:10",
    src: "./audio/SubtleBodies.mp3",
  },
  {
    id: 1,
    title: "A Year Ago",
    artist: "Carmen Villain",
    duration: "4:05",
    src: "./audio/AYearAgo.mp3",
  },
  {
    id: 2,
    title: "Dissolving Edges",
    artist: "Carmen Villain",
    duration: "3:40",
    src: "./audio/DissolvingEdges.mp3",
  },
  {
    id: 3,
    title: "Light in Phases",
    artist: "Carmen Villain",
    duration: "3:35",
    src: "./audio/LightInPhases.mp3",
  },
  {
    id: 4,
    title: "Molina",
    artist: "Carmen Villain",
    duration: "4:15",
    src: "./audio/Molina.mp3",
  },
  {
    id: 5,
    title: "Things That Are Solid",
    artist: "Carmen Villain",
    duration: "3:50",
    src: "./audio/ThingsThatAreSolid.mp3",
  },
  {
    id: 6,
    title: "Everything Without Shadow",
    artist: "Carmen Villain",
    duration: "2:43",
    src: "./audio/EverythingWithoutShadow.mp3",
  },
  {
    id: 7,
    title: "Two Halves Touching",
    artist: "Carmen Villain",
    duration: "3:20",
    src: "./audio/TwoHalvesTouching.mp3",
  },
  {
    id: 8,
    title: "Agua Azul",
    artist: "Carmen Villain",
    duration: "3:45",
    src: "./audio/AguaAzul.mp3",
  },
];

const audio = new Audio();
let currentIndex = 0;

// Render playlist
const renderSongs = () => {
  playlistSongs.innerHTML = allSongs
    .map(
      (song) => `
      <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
          </svg>
        </button>
      </li>`,
    )
    .join("");

  // Add event listeners for play & delete. For every song in the playlist, set it so that when clicked the player will play *that exact song* by sending its position (index) to playSong()
  document.querySelectorAll(".playlist-song-info").forEach((button, idx) => {
    button.onclick = () => playSong(idx);
  });

  document.querySelectorAll(".playlist-song-delete").forEach((button, idx) => {
    button.onclick = (e) => {
      e.stopPropagation();
      allSongs.splice(idx, 1);
      renderSongs();
      if (idx === currentIndex) {
        audio.pause();
        playerSongTitle.textContent = "";
        playerSongArtist.textContent = "";
      }
    };
  });
};

// Play a song by index
const playSong = (index) => {
  currentIndex = index;
  audio.src = allSongs[currentIndex].src;
  audio.play();
  playerSongTitle.textContent = allSongs[currentIndex].title;
  playerSongArtist.textContent = allSongs[currentIndex].artist;
  updatePlayingClass(); //highlught currrently playing song
};

// Update currently playing class in playlist - highlight currently playing song
const updatePlayingClass = () => {
  document.querySelectorAll(".playlist-song").forEach((li, idx) => {
    if (idx === currentIndex) li.setAttribute("aria-current", "true");
    else li.removeAttribute("aria-current");
  });
};

// Control buttons
playButton.onclick = () => audio.play(); //built-in browser method to start playback
pauseButton.onclick = () => audio.pause(); //built-in browser method to pause playback
nextButton.onclick = () => {
  currentIndex = (currentIndex + 1) % allSongs.length;
  playSong(currentIndex);
};
previousButton.onclick = () => {
  currentIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
  playSong(currentIndex);
};
shuffleButton.onclick = () => {
  currentIndex = Math.floor(Math.random() * allSongs.length);
  playSong(currentIndex);
};

// Initialize
renderSongs();
