from flask import Flask, request, jsonify, render_template
import yt_dlp
import os

app = Flask(__name__)

DOWNLOAD_FOLDER = "downloads"

if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():

    data = request.json

    url = data['url']
    quality = data['quality']

    if quality == 'audio':

        ydl_opts = {
            'format': 'bestaudio',
            'outtmpl': f'{DOWNLOAD_FOLDER}/%(title)s.%(ext)s'
        }

    else:

        height = quality.replace('p', '')

        ydl_opts = {
            'format': f'bestvideo[height<={height}]+bestaudio/best',
            'merge_output_format': 'mp4',
            'outtmpl': f'{DOWNLOAD_FOLDER}/%(title)s.%(ext)s'
        }


    try:

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        return jsonify({
            'success': True,
            'message': 'Download completed!'
        })

    except Exception as e:

        return jsonify({
            'success': False,
            'message': str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)