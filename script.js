// Song player status & element variables
let isPlay = false;
let shuffleSong = false;
let repeatSong = false;

let songFiles = []; // Song data variables
let songIndexStatus = 0; // Default = 0\
let currentURL = null;
let currentIndex = null;

let songItems = document.querySelectorAll(".song-item");
let songItemsArray = [...document.querySelectorAll(".song-item")];

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
  songFiles = [...files];
  console.log(songFiles);
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
    console.log("Create song playlist element");
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
  if (!isPlay || songFiles.length > 0) {
    songIndexStatus--;
    console.log("Prev has clicked");
    const file = songFiles[songIndexStatus];
    const url = URL.createObjectURL(file);
    player.src = url;
    player.play();
  }
}
function playBtn() {
  const file = songFiles[songIndexStatus];

  if (isPlay) {
    isPlay = false;
    player.pause();
    play.classList.remove("play-active");
    console.log("Unpausing");
  } else if (songFiles.length > 0){
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
    play.classList.add("play-active");
    console.log("Playing: " + songFiles[songIndexStatus].name);
  }
}
function nextBtn() {
  if (!isPlay || songFiles.length > 0) {
    songIndexStatus++;
    console.log("Next has clicked");
    const file = songFiles[songIndexStatus];
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