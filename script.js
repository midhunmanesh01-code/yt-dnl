const downloadForm = document.querySelector('.download-form');
      const urlInput = document.getElementById('url-input');
      const qualityModal = document.getElementById('quality-modal');

      downloadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = urlInput.value.trim();
        
        // Basic YouTube URL validation
        if (url && isValidYouTubeUrl(url)) {
          openQualityModal();
        } else {
          alert('Please enter a valid YouTube URL');
        }
      });

      function isValidYouTubeUrl(url) {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
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
        alert(`Downloading in ${quality}...\n\nVideo URL: ${url}\nQuality: ${quality}`);
        closeQualityModal();
      }
t
      qualityModal.addEventListener('click', function(e) {
        if (e.target === qualityModal) {
          closeQualityModal();
        }
      });