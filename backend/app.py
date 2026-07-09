from flask import Flask, request, jsonify, render_template, send_file, after_this_request
import yt_dlp
import os

app = Flask(__name__)

DOWNLOAD_FOLDER = "downloads"

if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/download')
def download():

    url = request.args.get('url')
    quality = request.args.get('quality')

    if quality == 'audio':

        ydl_opts = {
            'format': 'bestaudio',
            'outtmpl': f'{DOWNLOAD_FOLDER}/%(title)s.%(ext)s',
            'impersonate': 'chrome-136',
            'http_headers': {
                'User-Agent': (
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                    'AppleWebKit/537.36 (KHTML, like Gecko) '
                    'Chrome/120.0.0.0 Safari/537.36'
                ),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            'extractor_args': {
                'youtube': {
                    'player_client': ['android']
                }
            },

            'geo_bypass': True,
            'noplaylist': True,
            'quiet': True,
            'no_warnings': True,
            'retries': 5,
            'extractor_retries': 5
        }

    else:

        height = quality.replace('p', '')

        ydl_opts = {
            'format': f'bestvideo[height<={height}]+bestaudio/best',
            'merge_output_format': 'mp4',
            'outtmpl': f'{DOWNLOAD_FOLDER}/%(title)s.%(ext)s',
            'impersonate': 'chrome-136',
            'http_headers': {
                'User-Agent': (
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                    'AppleWebKit/537.36 (KHTML, like Gecko) '
                    'Chrome/120.0.0.0 Safari/537.36'
                ),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            'extractor_args': {
                'youtube': {
                    'player_client': ['android']
                }
            },

            'geo_bypass': True,
            'noplaylist': True,
            'quiet': True,
            'no_warnings': True,
            'retries': 5,
            'extractor_retries': 5
        }

    try:

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)

        if not os.path.exists(filename):

            base = os.path.splitext(filename)[0]

            mp4 = base + '.mp4'
            webm = base + '.webm'

            if os.path.exists(mp4):
                filename = mp4

            elif os.path.exists(webm):
                filename = webm
        
        @after_this_request
        def cleanup(response):
            try:
                os.remove(filename)
            except Exception:
                pass
            return response
        
        return send_file(
            filename,
            as_attachment=True
        )

    except Exception as e:
     import traceback
     print(traceback.format_exc())

    return f"""
    <h2>Download Failed</h2>
    <pre>{traceback.format_exc()}</pre>
    """, 400

@app.route('/storage')
def storage():

    total = 0

    for root, dirs, files in os.walk("downloads"):

        for file in files:

            path = os.path.join(root, file)

            total += os.path.getsize(path)

    return f"{total/1024/1024:.2f} MB"

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port
    )