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
  [...files].forEach(file => {
    if (!file.type.startsWith("audio/")) {
        alert("Must be audio file");
        return;
    }
    console.log("File:", file.name);
  });
}

// music controller function
function shuffleBtn() {
    console.log('shuffle active');
}