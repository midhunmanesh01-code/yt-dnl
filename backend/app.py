from flask import request, jsonify


@app.route('/download', methods=['POST'])
def download():

    data = request.json

    url = data['url']
    quality = data['quality']

    print("URL:", url)
    print("Quality:", quality)

    return jsonify({

        'success': True,

        'message': f'Downloading {quality}',

        'url': url

    })