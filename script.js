const fileInput = document.getElementById('file-input');
const uploadContent = document.getElementById('upload-content');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-btn');
const scanLine = document.getElementById('scan-line');
const resultBox = document.getElementById('result-box');
const resultImage = document.getElementById('result-image');
const downloadBtn = document.getElementById('download-btn');

let selectedFile;

// Handle File Selection
fileInput.addEventListener('change', function() {
    selectedFile = this.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            uploadContent.style.display = 'none';
            previewContainer.style.display = 'block';
        }
        reader.readAsDataURL(selectedFile);
    }
});

// Remove Background Function
removeBtn.addEventListener('click', async () => {
    // Show scanning animation
    scanLine.style.display = 'block';
    removeBtn.innerText = "Processing...";
    removeBtn.disabled = true;

    const apiKey = "c2xZ3CgpuCjmXR7Z3cCV2uKc"; // Put your API Key here
    const formData = new FormData();
    formData.append('image_file', selectedFile);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 'X-Api-Key': apiKey },
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            // Show Result
            resultImage.src = url;
            downloadBtn.href = url;
            resultBox.style.display = 'block';
            previewContainer.style.display = 'none';
            
            // Scroll to result
            resultBox.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Error: Check your API Key or Connection");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    } finally {
        scanLine.style.display = 'none';
        removeBtn.disabled = false;
        removeBtn.innerText = "Remove Background";
    }
});

function resetUpload() {
    location.reload(); // Simple way to reset the state
}