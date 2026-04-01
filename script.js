console.log('log has called');

// Test import song button and debug it
const importSong = document.getElementById('fileInput');
importSong.addEventListener("change", () => {
    const file = importSong.files[0];
    if (file) {
        console.log("File dipilih:", file.name);
        console.log("Tipe file:", file.type);
        console.log("Ukuran file:", file.size, "bytes");
    } else {
        console.log("Tidak ada file yang dipilih");
    }
});