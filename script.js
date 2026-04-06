// Song player status & element variables
let isPlay = false;
let shuffleSong = false;
let repeatSong = false;

let songData = []; // Song data variables
let songIndexStatus = 0; // Default = 0\
let currentURL = null;
let currentIndex = null;

const shuffle = document.getElementById("shuffle");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const repeat = document.getElementById("repeat");

const player = document.getElementById("player");

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

function handleFiles(files) {
  let hasInvalidFiles = false;
  songData = [...files];
  console.log(songData);
  [...files].forEach(file => {
    if (!file.type.startsWith("audio/")) {
      hasInvalidFiles = true;
      return;
    }
    const playlistParent = document.getElementById("playlist");
    const div = document.createElement("div");
    const image = document.createElement("img");
    const songTitle = document.createElement("div");
    image.src = "Image/Music_logo.png";
    image.classList.add("song-image");

    div.classList.add("song-item");

    songTitle.classList.add("song-title");
    songTitle.textContent = file.name;

    playlistParent.appendChild(div);
    div.appendChild(image);
    div.appendChild(songTitle);

    console.log("File:", file.name);
    console.log("Create song playlist elements");
  });
  
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
  console.log("prev has clicked");
}
function playBtn() {
  const file = songData[songIndexStatus];

  if (isPlay) {
    isPlay = false;
    player.pause();
    console.log("play disabled");
    play.classList.remove("play-active");
  } else if (songData.length > 0){
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
    player.play();
    console.log("play enabled");
    play.classList.add("play-active");
  }
}
function nextBtn() {
  if (!isPlay || songData.length > 0) {
    songIndexStatus++;
    console.log("next has clicked");
    const file = songData[songIndexStatus];
    const url = URL.createObjectURL(file);
    player.src = url;
    player.play();
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