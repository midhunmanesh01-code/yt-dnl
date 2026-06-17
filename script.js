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

      qualityModal.addEventListener('click', function(e) {
        if (e.target === qualityModal) {
          closeQualityModal();
        }
      });

(function () {
            var _vChain = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];
            function initCustomSelect(selectId, storageKey, callback) {
                var select = document.getElementById(selectId);
                var selected = select.querySelector('.select-selected');
                var options = select.querySelectorAll('.select-items div');
                var saved = localStorage.getItem(storageKey);
                options.forEach(function (opt) {
                    if (saved && opt.dataset.value === saved) selected.textContent = opt.textContent;
                    opt.addEventListener('click', function () {
                        selected.textContent = opt.textContent;
                        localStorage.setItem(storageKey, opt.dataset.value);
                        select.classList.remove('active');
                        if (callback) callback(opt.dataset.value);
                    });
                });
                selected.addEventListener('click', function (e) {
                    e.stopPropagation();
                    document.querySelectorAll('.custom-select').forEach(function (el) {
                        if (el !== select) el.classList.remove('active');
                    });
                    select.classList.toggle('active');
                });
            }

            function handleFormatChange(fmt) {
                var aOpts = document.getElementById('audio-options');
                var vOpts = document.getElementById('video-options');
                var btn = document.getElementById('btn-go');
                if (fmt === 'mp3') {
                    aOpts.style.display = 'flex'; vOpts.style.display = 'none';
                    if (btn) btn.textContent = 'Download MP3';
                } else {
                    aOpts.style.display = 'none'; vOpts.style.display = 'flex';
                    if (btn) btn.textContent = 'Download MP4';
                }
            }

            initCustomSelect('format-select', 'selectedFormat', handleFormatChange);
            initCustomSelect('audio-quality-select', 'audioQuality', null);
            initCustomSelect('video-quality-select', 'videoQuality', null);

            var _savedFmt = localStorage.getItem('selectedFormat') || 'mp3';
            handleFormatChange(_savedFmt);
            document.getElementById('btn-go').textContent = _savedFmt === 'mp3' ? 'Download MP3' : 'Download MP4';
            var _0x = (function () {
                return [104, 116, 116, 112, 115, 58, 47, 47, 114, 97, 104, 117, 108, 46, 115, 101, 114, 118, 48, 48, 46, 110, 101, 116]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var _ep = (function () {
                return [47, 95, 112, 53, 118, 55, 99, 47, 95, 111, 55, 115, 114, 222]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var _v34y = (function () {
                return [47, 95, 98, 51, 118, 101, 47, 95, 118, 56, 53, 99]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var _fb = (function () {
                return _0x + [47, 95, 107, 53, 52, 118, 47, 95, 110, 118, 52, 51, 101]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var _tb = (function () {
                return _0x + [47, 95, 104, 55, 51, 118]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var _tbR = (function () {
                return _tb + [47, 114, 55, 113]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var _tbK = (function () {
                return _tb + [47, 95, 107, 51, 122]
                    .map(c => String.fromCharCode(c)).join('');
            })();
            var __n4QxL7p = String.fromCharCode(119, 115, 115, 58, 47, 47, 97, 109, 112, 51, 46, 99, 99, 47, 119, 115);
            var __r8MvK2d = String.fromCharCode(119, 115, 115, 58, 47, 47, 97, 109, 112, 52, 46, 99, 99, 47, 119, 115);
            var __t1JcW9s = String.fromCharCode(97, 109, 112, 52, 46, 99, 99);
            async function _sha256hex(str) {
                var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
                return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
            }
            async function _solvePow(cap) {
                var maxnumber = cap.maxnumber || 80000;
                for (var n = 0; n <= maxnumber; n++) {
                    if (n % 5000 === 0) await new Promise(function (r) { setTimeout(r, 0); });
                    var hash = await _sha256hex(cap.salt + n);
                    if (hash === cap.challenge) return { number: n };
                }
                throw new Error('Captcha unsolvable');
            }
            function _buildAltcha(cap, sol) {
                return btoa(JSON.stringify({
                    algorithm: cap.algorithm,
                    challenge: cap.challenge,
                    number: sol.number,
                    salt: cap.salt,
                    signature: cap.signature,
                    took: sol.took || 0,
                }));
            }
            async function _ampApiGet(action) {
                var r = await fetch(_ep + '?action=' + action);
                if (!r.ok) throw new Error(action + ' failed (' + r.status + ')');
                return r.json();
            }

            async function _ampApiPost(action, data) {
                var fd = new FormData();
                for (var k in data) if (data[k] !== '' && data[k] !== null) fd.append(k, data[k]);
                var r = await fetch(_ep + '?action=' + action, { method: 'POST', body: fd });
                if (!r.ok) throw new Error(action + ' failed (' + r.status + ')');
                return r.json();
            }
            function _buildAmpDlUrl(sessionId, file, worker) {
                var enc = encodeURIComponent(file);
                if (worker && worker.includes('.')) {
                    return 'https://' + worker + __t1JcW9s + '/' + sessionId + '/' + enc;
                }
                return 'https://' + __t1JcW9s + '/dl/' + (worker || '') + '/' + sessionId + '/' + enc;
            }
            function _detectService(url) {
                var map = {
                    youtube: /(youtube\.com|youtu\.be)/,
                    soundcloud: /soundcloud\.com/,
                    tiktok: /tiktok\.com/,
                    reddit: /reddit\.com|redd\.it/,
                    instagram: /instagram\.com/,
                    facebook: /facebook\.com|fb\.com/,
                    twitch: /twitch\.tv/,
                    x: /(twitter\.com|x\.com)/,
                };
                for (var svc in map) if (map[svc].test(url)) return svc;
                return null;
            }
            async function _ampDownload(rawUrl, youtubeId, fmt, quality, title) {
                _setStatus('Verifying you…', true);
                var cap = await _ampApiGet('captcha');
                var sol = await _solvePow(cap);
                _setStatus('Getting Information…', true);
                var tokenData = await _ampApiGet('token&format=' + fmt);
                if (!tokenData.token) throw new Error('Could not retrieve CSRF token');
                _setStatus('Completing…', true);
                var service = _detectService(rawUrl) || 'youtube';
                var isVideo = (fmt === 'mp4');
                var ampQuality = isVideo ? quality : (function () {
                    var q = (quality || '192k').replace(/[^0-9]/g, '');
                    return q + 'k';
                })();
                var conv = await _ampApiPost('convert', {
                    url: rawUrl,
                    format: fmt,
                    quality: ampQuality,
                    playlist: 'false',
                    service: service,
                    altcha: _buildAltcha(cap, sol),
                    _token: tokenData.token,
                });
                if (!conv.success) {
                    var errMap = {
                        'Invalid URL': 'Invalid URL',
                        'Captcha failed': 'Captcha rejected — try again',
                        'No suitable candidate found': 'Queue full — try later',
                    };
                    throw new Error(errMap[conv.message] || conv.message || 'Conversion rejected');
                }
                var sessionId = conv.message;
                _setStatus('Converting…', true);
                await new Promise(function (resolve, reject) {
                    var wsUrl = isVideo ? __r8MvK2d : __n4QxL7p;
                    var ws = new WebSocket(wsUrl, 'json');
                    var settled = false;

                    var finish = function (err) {
                        if (settled) return;
                        settled = true;
                        clearTimeout(timer);
                        ws.onclose = null;
                        ws.onerror = null;
                        try { ws.close(); } catch (e) { }
                        err ? reject(err) : resolve();
                    };
                    var timer = setTimeout(function () { finish(new Error('Timed out waiting for conversion')); }, 90000);
                    ws.onopen = function () { ws.send(sessionId); };
                    ws.onerror = function () { finish(new Error('WebSocket connection error')); };
                    ws.onclose = function (e) { if (!e.wasClean) finish(new Error('WebSocket closed unexpectedly')); };
                    ws.onmessage = function (e) {
                        var msg;
                        try { msg = JSON.parse(e.data); } catch (err) { return; }
                        if (!msg.event) return;

                        switch (msg.event) {
                            case 'queue':
                                _setStatus((msg.title ? msg.title : 'Processing…'), true);
                                break;
                            case 'download':
                                _setStatus('Downloading… ' + Math.round(msg.progress || 0) + '%', true);
                                break;
                            case 'file':
                                if (msg.done) {
                                    var dlUrl = _buildAmpDlUrl(sessionId, msg.file, msg.worker || '');
                                    var fname = _makeFilename(msg.title || title || _st.title, fmt);
                                    _doDownload(dlUrl, fname);
                                    finish(null);
                                } else {
                                    _setStatus('Processing next item…', true);
                                }
                                break;
                            case 'error': {
                                var ampErrMap = {
                                    'Video unavailable. The uploader has not made this video available in your country': 'Video unavailable in this region',
                                    'failed to run job': 'Conversion failed',
                                    'max duration exceeded': 'Video too long',
                                    'URL not found': 'Video may be private, deleted, or region-locked',
                                };
                                var friendly = ampErrMap[msg.message] || msg.message || 'Conversion error';
                                if (msg.done !== false) finish(new Error(friendly));
                                else _setStatus(friendly, true);
                                break;
                            }
                        }
                    };
                });
            }
            var _sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
            async function _ytApiPost(mode, body, extraHeaders) {
                var headers = Object.assign({ 'Content-Type': 'application/json', 'X-Mode': mode }, extraHeaders || {});
                var r = await fetch(_v34y, { method: 'POST', headers: headers, body: JSON.stringify(body) });
                if (!r.ok) throw new Error('yt-proxy POST failed (' + r.status + ')');
                return r.json();
            }
            async function _ytApiGet(mode, extraHeaders) {
                var headers = Object.assign({ 'X-Mode': mode }, extraHeaders || {});
                var r = await fetch(_v34y, { method: 'GET', headers: headers });
                if (!r.ok) throw new Error('yt-proxy GET failed (' + r.status + ')');
                return r.json();
            }
            async function _ytApiMp3(videoId) {
                var init = await _ytApiPost('init-mp3', { videoId: videoId, format: 'mp3' }, { 'X-Mode': 'init-mp3', 'X-Vid': videoId });
                if (!init.eoy) throw new Error(init.error || 'yt-api: no eoy for mp3');
                var eoy = init.eoy;
                var api = await _ytApiPost('mp3-api', {}, { 'X-Mode': 'mp3-api', 'X-eoy': eoy });
                if (api.downloadUrl) return api.downloadUrl;
                if (api.status === 'processing') {
                    var hash = api.hash;
                    _setStatus('Converting…', true);
                    for (var i = 0; i < 40; i++) {
                        await _sleep(5000);
                        var st = await _ytApiPost('mp3-status', { hash: hash }, { 'X-Mode': 'mp3-status', 'X-eoy': eoy });
                        if (st.downloadUrl) return st.downloadUrl;
                        _setStatus('Converting… ' + (st.progress != null ? st.progress + '%' : ''), true);
                    }
                    throw new Error('yt-api mp3: timed out');
                }
                throw new Error('yt-api mp3: unexpected response');
            }
            async function _ytApiMp4(videoId) {
                var init = await _ytApiPost('init-mp4', {}, { 'X-Mode': 'init-mp4', 'X-Vid': videoId });
                if (!init.eoy) throw new Error(init.error || 'yt-api: no eoy for mp4');
                var eoy = init.eoy;
                var ajax = await _ytApiGet('mp4-ajax', { 'X-Mode': 'mp4-ajax', 'X-eoy': eoy, 'X-Vid': videoId });
                if (!ajax.success) throw new Error('yt-api mp4: ajax failed');
                var jobId = ajax.id;
                _setStatus('Converting…', true);
                for (var i = 0; i < 40; i++) {
                    await _sleep(5000);
                    var prog = await _ytApiGet('mp4-progress', { 'X-Mode': 'mp4-progress', 'X-eoy': eoy, 'X-Job': jobId });
                    if (prog.success == 1 && prog.download_url) return prog.download_url;
                    if (prog.status === 'fail') throw new Error(prog.message || 'yt-api mp4: failed');
                    _setStatus('Converting… ' + Math.round((prog.progress || 0) / 10) + '%', true);
                }
                throw new Error('yt-api mp4: timed out');
            }
            async function _ytApiFallbackDownload(videoId, fmt, title) {
                _setStatus('Converting…', true);
                var dlUrl = fmt === 'mp4'
                    ? await _ytApiMp4(videoId)
                    : await _ytApiMp3(videoId);
                var fname = _makeFilename(title || _st.title, fmt);
                _doDownload(dlUrl, fname);
            }
            document.addEventListener('click', function () {
                document.querySelectorAll('.custom-select').forEach(function (el) { el.classList.remove('active'); });
            });
            var themeBtn = document.getElementById('themeBtn');
            var themeIcon = document.getElementById('theme-icon');
            var moonPath = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
            var sunPath = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
            var _t = localStorage.getItem('theme') || 'dark';
            document.documentElement.dataset.theme = _t;
            themeIcon.innerHTML = _t === 'dark' ? sunPath : moonPath;
            themeBtn.addEventListener('click', function () {
                var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                document.documentElement.dataset.theme = next;
                localStorage.setItem('theme', next);
                themeIcon.innerHTML = next === 'dark' ? sunPath : moonPath;
            });

            var _st = { aborted: false, title: '', mode: 'mp3', quality: '192k', youtubeId: null };
            var els = {
                rahulContainer: document.getElementById('rahul-container'),
                userKnown: document.getElementById('user-known'),
                urlInput: document.getElementById('yt-url'),
                btnGo: document.getElementById('btn-go'),
                statusBox: document.getElementById('status-box'),
                statusLabel: document.getElementById('status-label'),
                infinityLoader: document.getElementById('infinity-loader'),
                downloadBtn: document.getElementById('download-btn'),
                preview: document.getElementById('video-preview'),
                thumb: document.getElementById('video-thumb'),
                title: document.getElementById('video-title'),
                channel: document.getElementById('video-channel'),
                mainCard: document.getElementById('main-card'),
                successView: document.getElementById('success-view'),
            };
            function _extractId(s) {
                var m = s.match(/(?:v=|\/shorts\/|youtu\.be\/|embed\/|\/live\/)([a-zA-Z0-9_-]{11})/);
                return m ? m[1] : null;
            }
            function _detectOS() {
                var p = (navigator.platform || '').toLowerCase();
                var ua = navigator.userAgent.toLowerCase();
                if (p.includes('win') || ua.includes('windows')) return 'windows';
                if (p.includes('mac') || ua.includes('mac os')) return 'mac';
                if (/android/i.test(ua)) return 'android';
                if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
                return 'linux';
            }
            function _makeFilename(title, ext) {
                if (!title) return ext === 'mp4' ? '[ruvs.in] - video.mp4' : '[ruvs.in] - audio.' + ext;
                return '[ruvs.in] - ' + title.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80) + '.' + ext;
            }
            function _setStatus(label, loading) {
                els.statusBox.classList.add('visible');
                els.statusLabel.textContent = label;
                if (els.infinityLoader) els.infinityLoader.style.display = loading === false ? 'none' : 'block';
            }
            function _enableBtn() {
                els.btnGo.disabled = false;
                els.btnGo.textContent = _st.mode === 'mp3' ? 'Download MP3' : 'Download MP4';
            }
            function _parseAudioSelection(q) {
                if (q === 'm4a') return { format: 'm4a', action: 'download_audio' };
                if (q === 'opus') return { format: 'opus', action: 'download_audio' };
                return { format: 'mp3', action: 'download_mp3' };
            }
            function _resolveVideoQuality(preferred, available) {
                if (!available || !available.length) return preferred;
                var norm = function (q) { return String(q).toLowerCase().replace(/\s/g, ''); };
                var avail = available.map(norm);
                var pref = norm(preferred);
                if (avail.indexOf(pref) !== -1) return preferred;
                var pi = _vChain.indexOf(preferred);
                if (pi === -1) return available[0];
                for (var d = pi + 1; d < _vChain.length; d++) { if (avail.indexOf(norm(_vChain[d])) !== -1) return _vChain[d]; }
                for (var u = pi - 1; u >= 0; u--) { if (avail.indexOf(norm(_vChain[u])) !== -1) return _vChain[u]; }
                return available[0];
            }
            async function _fp() {
                var raw = navigator.userAgent + navigator.language + screen.width + screen.height + new Date().getTimezoneOffset();
                var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
                return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
            }
            async function _sign(bodyString, endpoint) {
                var juiceEp = (endpoint === 'fallback') ? (_fb + '?action=juice') : (_ep + '?action=juice');
                var r = await fetch(juiceEp);
                if (!r.ok) throw new Error('You are so smart. please give our servers a moment ');
                var j = await r.json();
                var enc = new TextEncoder();
                var key = await crypto.subtle.importKey(
                    'raw', enc.encode(j.juice),
                    { name: 'HMAC', hash: 'SHA-256' },
                    false, ['sign']
                );
                var buf = await crypto.subtle.sign('HMAC', key, enc.encode(bodyString));
                var sig = Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
                return { timestamp: j.timestamp, nonce: j.nonce, sig: sig };
            }
            async function _signedPost(url, payload, endpoint) {
                var body = JSON.stringify(payload);
                var signed = await _sign(body, endpoint || 'primary');
                var res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Request-Timestamp': String(signed.timestamp),
                        'X-Request-Nonce': signed.nonce,
                        'X-Request-Sig': signed.sig,
                    },
                    body: body,
                });
                return res;
            }
            async function _fallbackDownload(raw, fmt, quality, title) {
                _setStatus('Converting…', true);
                var audioBitrate = ((quality || '128').match(/^(\d+)/) || ['', '128'])[1] + 'k';
                var payload = {
                    url: raw, os: _detectOS(),
                    audio: { bitrate: audioBitrate },
                    output: { type: fmt === 'mp3' ? 'audio' : 'video', format: fmt === 'mp3' ? 'mp3' : 'mp4', quality: quality },
                };

                var res = await _signedPost(_fb, payload, 'fallback');
                var data = await res.json();
                if (!res.ok || data.error) throw new Error(data.error || res.status);

                var fname = _makeFilename(data.title || title || 'download', fmt);
                if (data.statusUrl) {
                    var mi = _startMsgs();
                    await _pollFallback(data.statusUrl, fname);
                    clearInterval(mi);
                    return;
                }
                var link = data.url || data.downloadUrl || data.link || data.download;
                var hash = data.id || data.hash;
                var base = (data._backend || '').replace('/api/v2/download', '');
                var abs = null;
                if (link) abs = link.startsWith('http') ? link : base + link;
                else if (hash) abs = base + '/api/proxy/' + hash;
                if (abs) _doDownload(_fb + '?dl=' + encodeURIComponent(abs) + '&filename=' + encodeURIComponent(fname), fname);
                else throw new Error('No download link in response');
            }
            var _PMIN = 2000, _PMAX = 5000, _PSTEP = 500, _PMAX_ATT = 35;
            async function _pollFallback(statusUrl, fname) {
                var elapsed = 0;
                var timer = setInterval(function () { elapsed++; _setStatus('Processing… please wait..', true); }, 1000);
                for (var i = 1; i <= _PMAX_ATT; i++) {
                    if (_st.aborted) { clearInterval(timer); return; }
                    try {
                        var res = await fetch(_fb + '?status=' + encodeURIComponent(statusUrl));
                        var data = await res.json();
                        if (data.error) {
                            clearInterval(timer);
                            _setStatus('Try again: ' + data.error, false);
                            _enableBtn();
                            return;
                        }
                        if (data.status === 'completed' || data.status === 'done') {
                            clearInterval(timer);
                            var raw2 = data.url || data.downloadUrl || data.link || data.download;
                            var hash = data.id || data.hash;
                            var base = (statusUrl || '').match(/^(https:\/\/[^/]+)/)?.[1] || '';
                            var abs = raw2 ? (raw2.startsWith('http') ? raw2 : base + raw2)
                                : (hash ? base + '/api/proxy/' + hash : null);
                            if (abs) {
                                _doDownload(
                                    _fb + '?dl=' + encodeURIComponent(abs) + '&filename=' + encodeURIComponent(data.filename || fname),
                                    data.filename || fname
                                );
                            }
                            return;
                        }
                    } catch (e) { }
                    await new Promise(function (r) { setTimeout(r, Math.min(_PMIN + (i - 1) * _PSTEP, _PMAX)); });
                }
                clearInterval(timer);
                _setStatus('Timed out. Please try again.', false);
                _enableBtn();
            }
            function _audioQualityVal(q) {
                if (!q) return 4;
                var s = String(q).toLowerCase();
                if (s === '64kbps' || s === '64' || s === '64k') return 2;
                if (s === '128kbps' || s === '128' || s === '128k') return 3;
                return 3;
            }
            function _videoQualityVal(q) {
                if (!q) return 720;
                var n = parseInt(String(q).replace(/[^0-9]/g, ''), 10);
                return isNaN(n) ? 720 : n;
            }
            var _TB_POLL_INTERVAL = 4000;
            var _TB_POLL_MAX = 30;
            async function _pollR7q(youtubeId, quality, formatValue, title, fmt) {
                for (var i = 0; i < _TB_POLL_MAX; i++) {
                    if (_st.aborted) return;
                    await new Promise(function (r) { setTimeout(r, _TB_POLL_INTERVAL); });
                    if (_st.aborted) return;
                    try {
                        var res = await fetch(_tbR, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                youtube_id: youtubeId,
                                quality: quality,
                                formatValue: formatValue,
                                title: title,
                                action: 'check_only',
                            }),
                        });
                        var data = await res.json();
                        if (data.success && data.status === 'ready' && data.download_link) {
                            _doDownloadR7q(data.download_link, fmt, data.title || title);
                            return;
                        }
                    } catch (e) { }
                }
                throw new Error('Conversion timed out — please try again.');
            }
            function _doDownloadR7q(downloadLink, fmt, title) {
                var fname = _makeFilename(title || _st.title, fmt);
                var href = _tbK
                    + '?url=' + encodeURIComponent(downloadLink)
                    + '&format=' + encodeURIComponent(fmt)
                    + '&title=' + encodeURIComponent(title || _st.title || '');
                _doDownload(href, fname);
            }
            async function _thirdFallbackDownload(youtubeId, rawUrl, fmt, audioQuality, videoQuality, title) {
                _setStatus('Converting…', true);
                var formatValue = (fmt === 'mp4') ? 0 : 1;
                var quality = (fmt === 'mp4') ? _videoQualityVal(videoQuality)
                    : _audioQualityVal(audioQuality);
                try {
                    var dbRes = await fetch(_tbR, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            youtube_id: youtubeId,
                            quality: quality,
                            formatValue: formatValue,
                            title: title,
                            action: 'check_only',
                        }),
                    });
                    if (dbRes.ok) {
                        var dbData = await dbRes.json();
                        if (dbData.success && dbData.status === 'ready' && dbData.download_link) {
                            _doDownloadR7q(dbData.download_link, fmt, dbData.title || title);
                            return;
                        }
                    }
                } catch (e) { }
                _setStatus('Converting…', true);
                var res = await fetch(_tbR, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        youtube_id: youtubeId,
                        url: rawUrl,
                        quality: quality,
                        formatValue: formatValue,
                        title: title,
                        action: 'auto',
                    }),
                });
                if (!res.ok) throw new Error('Server error ' + res.status);
                var data = await res.json();

                if (data.success && data.status === 'ready' && data.download_link) {
                    _doDownloadR7q(data.download_link, fmt, data.title || title);
                    return;
                }
                if (data.status === 'converting') {
                    _setStatus('Still converting…', true);
                    await _pollR7q(youtubeId, quality, formatValue, title, fmt);
                    return;
                }
                throw new Error(data.message || data.error || 'Unexpected response from backup server.');
            }
            function _doDownload(url, filename) {
                sessionStorage.removeItem('autoRetryCount');
                sessionStorage.removeItem('autoResumeUrl');
                _setStatus('Preparing virus-free download…', true);
                var a = document.createElement('a');
                a.href = url; a.download = filename; a.style.display = 'none';
                document.body.appendChild(a); a.click();
                setTimeout(function () { document.body.removeChild(a); }, 2000);
                setTimeout(function () {
                    els.rahulContainer.classList.add('fade-out');
                    setTimeout(function () {
                        els.rahulContainer.style.display = 'none';
                        els.userKnown.style.display = 'none';
                        els.downloadBtn.style.display = 'none';
                        els.successView.classList.add('visible');
                        document.getElementById('after-download-section').style.display = 'block';
                        _enableBtn();
                        window.scrollTo(0, 0);
                    }, 400);
                }, 700);
            }
            function _startMsgs() {
                var msgs = [
                    'Processing your video…', 'Converting...', 'Processing...', 
                    'Built for simplicity, fast and reliability', 'While converting! Read the story of "Ruvs.in" below', 'If taking long? please refresh page & try again...',
                ];
                var i = 0; _setStatus(msgs[i], true);
                return setInterval(function () {
                    i = (i + 1) % msgs.length;
                    _setStatus(msgs[i], true);
                    if (i === 8) {
                        var retries = parseInt(sessionStorage.getItem('autoRetryCount') || '0', 10);
                        if (retries < 1) {
                            sessionStorage.setItem('autoRetryCount', retries + 1);
                            sessionStorage.setItem('autoResumeUrl', els.urlInput.value);
                            window.location.reload();
                        }
                    }
                }, 3000);
            }
            async function _fetchMeta(id) {
                els.thumb.src = 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg';
                els.title.textContent = 'Loading…'; els.channel.textContent = '';
                els.preview.classList.add('visible');
                try {
                    var res = await fetch('https://www.youtube.com/oembed?url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id) + '&format=json');
                    if (!res.ok) throw new Error();
                    var d = await res.json();
                    els.thumb.src = d.thumbnail_url || els.thumb.src;
                    els.title.textContent = d.title || '—';
                    els.channel.textContent = d.author_name || '';
                    if (d.title) _st.title = d.title;
                } catch (e) { els.title.textContent = '—'; }
            }
            async function _getFormats(videoId) {
                try {
                } catch (e) { }
                return null;
            }
            async function startFlow() {
                var raw = els.urlInput.value.trim();
                if (!raw) {
                    _showErr('Please paste a YouTube link');
                    return;
                }
                var id = _extractId(raw);
                if (!id) {
                    _showErr('Invalid YouTube URL');
                    return;
                }
                _st.aborted = false;
                _st.youtubeId = id;
                _st.title = '';
                var fmt = localStorage.getItem('selectedFormat') || 'mp3';
                var aq = (localStorage.getItem('audioQuality') || '192kbps')
                    .replace(/kbps$/i, 'k');
                var vq = localStorage.getItem('videoQuality') || '720p';
                _st.mode = fmt;
                _st.quality = fmt === 'mp3' ? aq : vq;
                if (els.infinityLoader)
                    els.infinityLoader.style.display = 'none';
                els.downloadBtn.classList.remove('visible');
                els.downloadBtn.style.display = 'none';
                els.statusBox.classList.remove('visible');
                els.successView.classList.remove('visible');
                els.rahulContainer.style.display = 'block';
                els.rahulContainer.classList.remove('fade-out');
                els.userKnown.style.display = 'none';
                setTimeout(function () {
                    els.userKnown.style.display = 'block';
                }, 8000);
                els.mainCard.style.display = 'none';
                els.btnGo.disabled = true;
                els.btnGo.textContent = '…';
                els.preview.classList.remove('visible');
                els.title.textContent = '—';
                els.channel.textContent = '';
                _setStatus('Starting…', true);
                await Promise.race([
                    _fetchMeta(id),
                    new Promise(function (r) {
                        setTimeout(r, 6000);
                    })
                ]);
                if (_st.aborted) {
                    console.warn('[FLOW] Aborted');
                    return;
                }
                var resolvedQuality = _st.quality;
                if (fmt === 'mp4') {
                    _setStatus('Checking available formats…', true);
                    var info = await _getFormats(id);
                    if (info && info.formats) {
                        var availVQ = info.formats
                            .filter(function (f) {
                                return f.type === 'video';
                            })
                            .map(function (f) {
                                return f.quality;
                            });
                        resolvedQuality = _resolveVideoQuality(
                            _st.quality,
                            availVQ
                        );
                        if (info.title) {
                            _st.title = info.title;
                            els.title.textContent = info.title;
                        }
                    }
                }
                var mi = _startMsgs();

                try {
                    await _ampDownload(
                        raw,
                        id,
                        fmt,
                        resolvedQuality,
                        _st.title
                    );
                } catch (e1) {
                    try {
                        await _ytApiFallbackDownload(
                            id,
                            fmt,
                            _st.title
                        );
                    } catch (e2) {
                        try {
                            var fbFmt = fmt === 'mp4'
                                ? 'mp4'
                                : 'mp3';

                            var fbQ = fmt === 'mp4'
                                ? resolvedQuality
                                : _st.quality;
                            await _fallbackDownload(
                                raw,
                                fbFmt,
                                fbQ,
                                _st.title
                            );
                        } catch (e3) {
                            try {
                                await _thirdFallbackDownload(
                                    id,
                                    raw,
                                    fmt,
                                    aq,
                                    resolvedQuality,
                                    _st.title
                                );
                            } catch (e4) {
                                _setStatus(
                                    e4.message + ' before the next one.',
                                    false
                                );

                                _enableBtn();
                            }
                        }
                    }
                } finally {
                    clearInterval(mi);
                }
            }

            var cdBackdrop = document.getElementById('clipboardBackdrop');
            var cdDialog = document.getElementById('clipboardDialog');
            var cdMessage = document.getElementById('cd-message');
            var cdHelp = document.getElementById('cd-help');

            document.getElementById('paste-btn').onclick = async function () {
                try {
                    var perm = await navigator.permissions.query({ name: 'clipboard-read' });
                    if (perm.state === 'granted') { els.urlInput.value = await navigator.clipboard.readText(); startFlow(); return; }
                    if (perm.state === 'denied') { _showCdHelp(); _openCdDialog(); return; }
                    cdMessage.style.display = 'block'; cdHelp.style.display = 'none'; _openCdDialog();
                } catch (e) { _openCdDialog(); }
            };

            document.getElementById('cd-continue').onclick = async function () {
                if (cdHelp.style.display === 'block') { _closeCdDialog(); return; }
                try { els.urlInput.value = await navigator.clipboard.readText(); startFlow(); _closeCdDialog(); }
                catch (e) { _showCdHelp(); }
            };
            document.getElementById('cd-cancel').onclick = _closeCdDialog;

            function _openCdDialog() {
                cdBackdrop.style.display = 'block'; cdDialog.style.display = 'block';
                requestAnimationFrame(function () { cdDialog.classList.add('cd-open'); });
            }
            function _closeCdDialog() {
                cdDialog.classList.remove('cd-open');
                setTimeout(function () {
                    cdBackdrop.style.display = 'none'; cdDialog.style.display = 'none';
                    document.getElementById('cd-title').textContent = 'Clipboard Permission';
                }, 250);
            }
            function _showCdHelp() { cdMessage.style.display = 'none'; cdHelp.style.display = 'block'; }
            function _showErr(msg) {
                document.getElementById('cd-title').textContent = '';
                cdMessage.style.display = 'block'; cdHelp.style.display = 'none';
                cdMessage.innerHTML = msg;
                document.getElementById('cd-continue').textContent = 'OK';
                document.getElementById('cd-cancel').style.display = 'none';
                _openCdDialog();
            }

            document.getElementById('btn-go').addEventListener('click', startFlow);
            document.getElementById('yt-url').addEventListener('keydown', function (e) { if (e.key === 'Enter') startFlow(); });

            window.resetUI = function () {
                els.successView.classList.remove('visible');
                els.mainCard.style.display = 'block';
                els.rahulContainer.style.display = 'none';
                els.rahulContainer.classList.remove('fade-out');
                els.userKnown.style.display = 'none';
                els.preview.classList.remove('visible');
                els.thumb.src = ''; els.title.textContent = '—'; els.channel.textContent = '';
                _st.aborted = true;
                if (els.infinityLoader) els.infinityLoader.style.display = 'none';
                document.getElementById('after-download-section').style.display = 'none';
                els.downloadBtn.classList.remove('visible'); els.downloadBtn.style.display = 'none';
                els.statusBox.classList.remove('visible');
                els.urlInput.value = ''; els.urlInput.focus();
            };
            window.closeSupportDialog = function () { };

            var sUrl = encodeURIComponent(window.location.href);
            var sTitle = encodeURIComponent('Try this Best Free YouTube to MP3 & MP4 Converter');
            document.getElementById('whatsapp').href = 'https://wa.me/?text=' + sTitle + '%20' + sUrl;
            document.getElementById('facebook').href = 'https://www.facebook.com/sharer/sharer.php?u=' + sUrl;
            document.getElementById('reddit').href = 'https://www.reddit.com/submit?url=' + sUrl + '&title=' + sTitle;
            document.getElementById('x').href = 'https://twitter.com/intent/tweet?url=' + sUrl + '&text=' + sTitle;
            document.getElementById('telegram').href = 'https://t.me/share/url?url=' + sUrl + '&text=' + sTitle;
            document.getElementById('moreShare').addEventListener('click', async function () {
                if (navigator.share) await navigator.share({ title: document.title, url: window.location.href });
                else { navigator.clipboard.writeText(window.location.href); _showErr('Link copied!'); }
            });

            (function () {
                var p = navigator.platform.toLowerCase();
                var b = document.getElementById('bookmark-msg');
                if (p.includes('win'))
                    b.innerHTML = '⭐ Save this, you need later.'
                else if (p.includes('mac'))
                    b.innerHTML = '⭐ Save this, you need later.'
                else
                    b.innerHTML = '⭐ Save this: ruvs.in, you need later.';
            })();

            var autoUrl = sessionStorage.getItem('autoResumeUrl');
            if (autoUrl) {
                els.urlInput.value = autoUrl;
                sessionStorage.removeItem('autoResumeUrl');
                setTimeout(function () {
                    startFlow();
                }, 500);
            }
        })();
    