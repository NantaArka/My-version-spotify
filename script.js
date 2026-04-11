// Song player status & element variables
let isPlay = false;
let shuffleSong = false;
let repeatSong = false;

let songFiles = []; // Song data variables
let songIndexStatus = 0; // Default = 0\
let currentURL = null;
let currentIndex = null;
let currentSongProgress = 0;

let songItems = document.querySelectorAll(".song-item");
let songItemsArray = [...document.querySelectorAll(".song-item")];

const shuffle = document.getElementById("shuffle");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const repeat = document.getElementById("repeat");

const player = document.getElementById("player");

// Current song title display
const currentSongDisplay = document.getElementById("container-song-title-display");
const currentSongName = document.getElementById("song-name-text");
const currentSongArtist = document.getElementById("artist-name-text");

// Import song variable
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");

// Drag & drop song from explorer to playlist
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, e => e.preventDefault());
});

["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.add("highlight");
  });
});

["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.remove("highlight");
  });
});

dropArea.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;

  if (files.length > 0) {
    fileInput.files = files;
    handleFiles(files);
  }
});

fileInput.addEventListener("change", () => {
  handleFiles(fileInput.files);
});

// Song autoplay system
player.addEventListener("ended", () => {
  console.log("Song has ended");
  if (!isPlay || songFiles.length > 0) {
    if (repeatSong) {
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      console.log("Playing: " + songFiles[songIndexStatus].name);  
    }
    else {
      songIndexStatus++;
      console.log(songIndexStatus);
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      console.log("Playing: " + songFiles[songIndexStatus].name);
    }
  }
});

function handleFiles(files) {
  let hasInvalidFiles = false;
  songFiles.push(...files);
  console.log(songFiles);

  const arr = [...files];
  for (let i = 0; i < arr.length; i++) {
    const file = arr[i];
    const j = i + 1;

    if (!file.type.startsWith("audio/")) {
      hasInvalidFiles = true;
      return;
    }
    const playlistParent = document.getElementById("playlist");
    const div = document.createElement("div");
    const image = document.createElement("img");
    const songTitle = document.createElement("div");
    const songIndexText = document.createElement("h1");
    const playButton = document.createElement("button");

    playButton.style.position = "absolute";
    playButton.style.top = "0";
    playButton.style.left = "0";
    playButton.style.width = "100%";
    playButton.style.height = "100%";
    playButton.style.opacity = "0";

    playButton.addEventListener("click", function () {
      playBtn1(i);
    })

    image.src = "Image/Music_logo.png";
    image.classList.add("song-image");

    div.classList.add("song-item");

    songTitle.classList.add("song-title");
    songTitle.textContent = file.name;

    songIndexText.textContent = j;
    songIndexText.classList.add("song-index-text");

    playlistParent.appendChild(div);
    div.appendChild(image);
    div.appendChild(songTitle);
    div.appendChild(songIndexText);
    div.appendChild(playButton);

    console.log("File:", file.name);
    console.log("Create song playlist element");
    console.log(songFiles);
    console.log("Loops index:" + i);
    };
    
    if (hasInvalidFiles) {
      alert("Must be audio file");
    }
  }

// music controller function
function shuffleBtn() {
  shuffle.classList.toggle("shuffle-active");
  if (!shuffleSong) {
    shuffleSong = true;
    console.log("shuffle enabled");
  } else {
    shuffleSong = false;
    console.log("shuffle disabled");
  }
}
function prevBtn() {
  if (!isPlay || songFiles.length > 0) {
    if (shuffleSong) {
      const randomSong = Math.floor(Math.random() * songFiles.length);
      songIndexStatus = randomSong;
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      play.classList.add("play-active");
      isPlay = true;
      currentSongDisplay.style.display = "flex";
      console.log("Playing: " + songFiles[songIndexStatus].name);
      currentSongName.textContent = songFiles[songIndexStatus].name;
      console.log("Song index: " + songIndexStatus);
      return;
    }
    if (songIndexStatus === 0) {
      console.log("Prev has clicked");
      songIndexStatus = songFiles.length - 1;
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      play.classList.add("play-active");
      isPlay = true;
      currentSongDisplay.style.display = "flex";
      currentSongName.textContent = songFiles[songIndexStatus].name;
      console.log("Song index: " + songIndexStatus);
    } else {
      songIndexStatus--;
      console.log("Prev has clicked");
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      play.classList.add("play-active");
      isPlay = true;
      currentSongDisplay.style.display = "flex";
      currentSongName.textContent = songFiles[songIndexStatus].name;
      console.log("Song index: " + songIndexStatus);
    }
  }
}
function playBtn() {
  const file = songFiles[songIndexStatus];
  
  if (isPlay) {
    isPlay = false;
    player.pause();
    play.classList.remove("play-active");
    console.log("Unpausing");
    currentSongProgress = player.currentTime;
    console.log("Current time: " + currentSongProgress);
  } else if (songFiles.length > 0) {
    if (currentIndex !== songIndexStatus) {
      if (currentURL) {
        URL.revokeObjectURL(currentURL); 
      }
      currentURL = URL.createObjectURL(file);
      player.src = currentURL;
      currentIndex = songIndexStatus;
      isPlay = false;
    }
    isPlay = true;
    currentSongDisplay.style.display = "flex";
    currentSongName.textContent = songFiles[songIndexStatus].name;
    player.currentTime = currentSongProgress;
    console.log("Current time: " + currentSongProgress);
    player.play();
    play.classList.add("play-active");
    console.log("Song index: " + songIndexStatus);
    console.log("Playing: " + songFiles[songIndexStatus].name);
  }
}
function playBtn1(index) {
  songIndexStatus = index;
  const file = songFiles[songIndexStatus];
  if (index) {
    if (currentIndex !== songIndexStatus) {
      if (currentURL) {
        URL.revokeObjectURL(currentURL); 
      }
      currentURL = URL.createObjectURL(file);
      player.src = currentURL;
      currentIndex = songIndexStatus;
      isPlay = false;
    }
    isPlay = true;
    currentSongDisplay.style.display = "flex";
    currentSongName.textContent = songFiles[songIndexStatus].name;
    player.currentTime = currentSongProgress;
    console.log("Current time: " + currentSongProgress);
    player.play();
    play.classList.add("play-active");
    console.log("Song index: " + songIndexStatus);
    console.log("Playing: " + songFiles[songIndexStatus].name);
  }
  else {
    console.log("Index not found");
  }
}
function nextBtn() {
  if (!isPlay || songFiles.length > 0) {
    if (shuffleSong) {
      const randomSong = Math.floor(Math.random() * songFiles.length);
      songIndexStatus = randomSong;
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      play.classList.add("play-active");
      isPlay = true;
      console.log("Playing: " + songFiles[songIndexStatus].name);
      currentSongName.textContent = songFiles[songIndexStatus].name;
      currentSongDisplay.style.display = "flex";
      currentSongName.textContent = songFiles[songIndexStatus].name;
      return;
    }
    if (songIndexStatus >= songFiles.length - 1) {
      songIndexStatus = 0;
      console.log("Next has clicked");
      console.log("Song index: " + songIndexStatus);
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      play.classList.add("play-active");
      isPlay = true;
      currentSongDisplay.style.display = "flex";
      currentSongName.textContent = songFiles[songIndexStatus].name;
      return;
    } else {
      songIndexStatus++;
      console.log("Next has clicked");
      console.log("Song index: " + songIndexStatus);
      const file = songFiles[songIndexStatus];
      const url = URL.createObjectURL(file);
      player.src = url;
      player.play();
      play.classList.add("play-active");
      isPlay = true;
      currentSongDisplay.style.display = "flex";
      currentSongName.textContent = songFiles[songIndexStatus].name;
      return;
    } 
  }
}

function repeatBtn() {
  repeat.classList.toggle("repeat-active");
  if (!repeatSong) {
    repeatSong = true;
    console.log("repeat enabled");
  } else {
    repeatSong = false;
    console.log("repeat disabled");
  }
}