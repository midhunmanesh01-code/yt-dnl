const downloadForm = document.querySelector('.download-form');
const urlInput = document.getElementById('url-input');
const qualityModal = document.getElementById('quality-modal');

downloadForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const url = urlInput.value.trim();

    if (url && isValidYouTubeUrl(url)) {
        openQualityModal();
    } else {
        alert('Please enter a valid YouTube URL');
    }
});

function isValidYouTubeUrl(url) {
    const youtubeRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;

    return youtubeRegex.test(url);
}

function openQualityModal() {
    qualityModal.style.display = 'flex';
}

function closeQualityModal() {
    qualityModal.style.display = 'none';
}

async function downloadVideo(quality) {
    const url = urlInput.value.trim();

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                quality: quality
            })
        });

        const data = await response.json();

        alert(data.message || 'Download started');

    } catch (err) {
        console.error(err);
        alert('Server error');
    }

    closeQualityModal();
}

qualityModal.addEventListener('click', function (e) {
    if (e.target === qualityModal) {
        closeQualityModal();
    }
});

window.downloadVideo = downloadVideo;
window.closeQualityModal = closeQualityModal;