const downloadForm = document.querySelector('.download-form');
const urlInput = document.getElementById('url-input');
const qualityModal = document.getElementById('quality-modal');


downloadForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const url = urlInput.value.trim();

    if (url && isValidYouTubeUrl(url)) {
        openQualityModal();
    }

    else {
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


function downloadVideo(quality) {

    const url = urlInput.value.trim();

    window.open(

        `/download?url=${encodeURIComponent(url)}&quality=${quality}`,

        '_blank'

    );

    closeQualityModal();

}


qualityModal.addEventListener('click', function (e) {

    if (e.target === qualityModal) {

        closeQualityModal();

    }

});


window.downloadVideo = downloadVideo;
window.closeQualityModal = closeQualityModal;