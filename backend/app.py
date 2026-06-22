from flask import Flask, request, jsonify, render_template, send_file
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

            'extractor_args': {
                'youtube': {
                    'player_client': ['android']
                }
            },

            'geo_bypass': True,
            'noplaylist': True,
            'quiet': False,
            'nocheckcertificate': True
        }

    else:

        height = quality.replace('p', '')

        ydl_opts = {
            'format': f'bestvideo[height<={height}]+bestaudio/best',
            'merge_output_format': 'mp4',
            'outtmpl': f'{DOWNLOAD_FOLDER}/%(title)s.%(ext)s',

            'extractor_args': {
                'youtube': {
                    'player_client': ['android']
                }
            },

            'geo_bypass': True,
            'noplaylist': True,
            'quiet': False,
            'nocheckcertificate': True
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

        return send_file(
            filename,
            as_attachment=True
        )

    except Exception as e:

        return jsonify({
            'success': False,
            'message': str(e)
        })


if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port
    )