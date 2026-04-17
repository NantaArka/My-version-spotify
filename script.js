// Song player status & element variables
let isPlay = false;
let shuffleSong = false;
let repeatSong = false;

let songFiles = []; // Song data variables
let currentSongLength = 0;
let songIndexStatus = 0; // Default = 0
let currentURL = null;
let currentIndex = null;
let currentSongProgress = 0;
let songIndex = 0;

let songItems = document.querySelectorAll(".song-item");
let songItemsArray = [...document.querySelectorAll(".song-item")];

const shuffle = document.getElementById("shuffle");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const playIcon = document.getElementById("playIcon");
const next = document.getElementById("next");
const repeat = document.getElementById("repeat");

const player = document.getElementById("player");

songProgress.max = player.duration;
const songSliderProgress = document.getElementById("songProgress");
const songProgressText = document.getElementById("songProgressText");

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

// Song slider progress
player.addEventListener("loadedmetadata", () => {
  songProgress.max = Math.floor(player.duration);
});
player.addEventListener("timeupdate", () => {
  songProgress.value = Math.floor(player.currentTime);
});
player.addEventListener("timeupdate", () => {
  songProgress.value = player.currentTime;
});
player.addEventListener("timeupdate", () => {
  const percent = (player.currentTime / player.duration) * 100;
  songProgress.style.setProperty("--progress", percent + "%");
});
songProgress.addEventListener("input", () => {
  player.currentTime = songProgress.value;
});

function handleFiles(files) {
  let hasInvalidFiles = false;
  songFiles.push(...files);

  const arr = [...files];
  for (let i = 0; i < arr.length; i++) {
    const file = arr[i];
    const j = i + 1;
    const currentIndex = currentSongLength;

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
      songIndex = currentIndex; // sinkronin index global
      playBtn1(songIndex);
      updateActive();

      console.log("Song has clicked");
      console.log(this.classList);
    })

    image.src = "Image/Music_logo.png";
    image.classList.add("song-image");

    div.classList.add("song-item");

    songTitle.classList.add("song-title");
    songTitle.textContent = file.name;

    songIndexText.textContent = currentIndex + 1;
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
    currentSongLength += 1;
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
    showSeekBar();
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
      console.log("Song index: " + songIndexStatus);
      updateActive();
      getMetadata();
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
      console.log("Song index: " + songIndexStatus);
      updateActive();
      getMetadata();
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
      console.log("Song index: " + songIndexStatus);
      updateActive();
      getMetadata();
    }
  }
}
function playBtn() {
  const file = songFiles[songIndexStatus];
  
  if (isPlay) {
    isPlay = false;
    playIcon.src = "Media player sprite/Play.png";
    player.pause();
    play.classList.remove("play-active");
    console.log("Unpausing");
    currentSongProgress = player.currentTime;
    console.log("Current time: " + currentSongProgress);
  } else if (songFiles.length > 0) {
    showSeekBar();
    getMetadata();
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
    playIcon.src = "Media player sprite/Pause.png";
    currentSongDisplay.style.display = "flex";
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
  if (index !== undefined && index !== null) {
    showSeekBar();
    getMetadata();
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
    playIcon.src = "Media player sprite/Pause.png";
    currentSongDisplay.style.display = "flex";
    player.currentTime = currentSongProgress;
    console.log("Current time: " + currentSongProgress);
    player.play();
    play.classList.add("play-active");
    console.log("Song index: " + songIndexStatus);
    console.log("Playing: " + songFiles[songIndexStatus].name);
  }
  else {
    songIndexStatus = 0;
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
    playIcon.src = "Media player sprite/Pause.png";
    currentSongDisplay.style.display = "flex";
    player.currentTime = currentSongProgress;
    console.log("Current time: " + currentSongProgress);
    player.play();
    play.classList.add("play-active");
    console.log("Song index: " + songIndexStatus);
    console.log("Playing: " + songFiles[songIndexStatus].name);
    getMetadata();
  }
}
function nextBtn() {
  if (!isPlay || songFiles.length > 0) {
    showSeekBar();
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
      currentSongDisplay.style.display = "flex";
      updateActive();
      getMetadata();
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
      songItemsArray.forEach(item => item.classList.remove("active"));
      songItemsArray[songIndex].classList.add("active");
      updateActive();
      getMetadata();
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
      songItemsArray.forEach(item => item.classList.remove("active"));
      songItemsArray[songIndex].classList.add("active");
      updateActive();
      getMetadata();
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

// JSMEDIATAGS function 
function getMetadata() {
  const file = songFiles[songIndexStatus];
  jsmediatags.read(file, {
    onSuccess: function(tag) {
      const title = tag.tags.title;
      const artist = tag.tags.artist;
  
      console.log("Title:", title);
      console.log("Artist:", artist);
  
      currentSongName.textContent = title || file.name;
      currentSongArtist.textContent = artist || "Unknown Artist";
    },
    onError: function(error) {
      console.log("Error:", error);
    }
  });
}

function updateActive() {
  const items = getItems();

  items.forEach(el => el.classList.remove("active"));

  if (items[songIndex]) {
    items[songIndex].classList.add("active");
  }
}
function getItems() {
  return document.querySelectorAll(".song-item");
}

// Show seek bar
function showSeekBar() {
  songSliderProgress.classList.add("song-progress-active");
}

// Format song porgress text
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function updateProgress() {
  const current = formatTime(player.currentTime);
  const duration = formatTime(player.duration || 0);

  songProgressText.textContent = `${current} / ${duration}`;

  requestAnimationFrame(updateProgress);
}

player.addEventListener("play", () => {
  updateProgress();
});