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
  [...files].forEach(file => {
    if (!file.type.startsWith("audio/")) {
      hasInvalidFiles = true;      
      return;
    }
    const playlistParent = document.getElementById("playlist");
    const div = document.createElement("div");
    const image = document.createElement("img");
    div.textContent = file.name;
    div.classList.add("song-item");
    image.src = "Image/Music_logo.png";
    image.classList.add("song-image");
    playlistParent.appendChild(div);
    div.appendChild(image);
    console.log("File:", file.name);
    console.log("Create song playlist elements");
  });
  
  if (hasInvalidFiles) {
    alert("Must be audio file");
  }
}

// music controller function
function shuffleBtn() {
  console.log("shuffle active");
}