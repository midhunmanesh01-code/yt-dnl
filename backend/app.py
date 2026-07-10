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

        print(traceback.format_exc())   # Shows full error in Render logs

        return """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Download Failed | StreamVault</title>

            <style>
                *{
                    margin:0;
                    padding:0;
                    box-sizing:border-box;
                    font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
                }

                body{
                    background:#0f172a;
                    color:white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    padding:20px;
                }

                .card{
                    background:#1e293b;
                    max-width:650px;
                    width:100%;
                    border-radius:18px;
                    padding:40px;
                    text-align:center;
                    box-shadow:0 20px 45px rgba(0,0,0,.45);
                }

                .icon{
                    font-size:70px;
                    margin-bottom:20px;
                }

                h1{
                    margin-bottom:15px;
                    color:#ff6b6b;
                }

                p{
                    color:#d1d5db;
                    line-height:1.7;
                    margin-bottom:18px;
                }

                .info{
                    background:#0f172a;
                    border-left:5px solid #3b82f6;
                    padding:16px;
                    border-radius:10px;
                    margin:25px 0;
                    text-align:left;
                }

                code{
                    color:#60a5fa;
                    word-break:break-all;
                }

                .btn{
                    display:inline-block;
                    margin-top:20px;
                    padding:14px 30px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:10px;
                    transition:.25s;
                    font-weight:600;
                }

                .btn:hover{
                    background:#1d4ed8;
                }

            </style>
        </head>
        <body>
        <div class="card">
        <div class="icon">⚠️</div>
        <h1>Download Failed</h1>
        <p>
        This video couldn't be downloaded because YouTube requested additional verification.
        </p>
        <div class="info">
        <b>Why did this happen?</b>
        <br><br>
        Some YouTube videos require additional verification before they can be downloaded from cloud-hosted applications.
        </div>
        <p>
        You can:
        <br><br>
        ✅ Try another public video.
        <br>
        ✅ Try the official demo video.
        </p>
        <p>
        Demo Video:
        <br><br>
        <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>
        </p>
        <a class="btn" href="/">⬅ Back to StreamVault</a>
        </div>
        </body>
        </html>
        """,400

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