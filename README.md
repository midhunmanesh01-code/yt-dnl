# 🎥 StreamVault

<div align="center">

![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.1-black?style=for-the-badge&logo=flask)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7?style=for-the-badge)

*A modern web-based YouTube video downloader built using Flask and yt-dlp.*

</div>

---

## 📖 Overview

**StreamVault** is a lightweight web application that allows users to download YouTube videos and audio in multiple quality options through a simple and responsive interface.

The application uses **Flask** as the backend and **yt-dlp** for video extraction. Downloads are processed on the server and delivered directly to the user's browser using native browser downloads.

---

## ✨ Features

- 🎬 Download YouTube videos in multiple resolutions
- 🎵 Download audio-only format
- 📥 Native browser download support
- 📱 Responsive user interface
- ⚡ Fast Flask backend
- 🧹 Automatic cleanup of temporary files
- 🛡 Graceful error handling
- ☁ Hosted on Render
- 🔄 Uses yt-dlp Android client for improved compatibility

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Python | Backend |
| Flask | Web Framework |
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Client-side functionality |
| yt-dlp | Video extraction |
| FFmpeg | Audio/Video merging |
| Render | Deployment |

---

## 📂 Project Structure

```text
StreamVault/
│
├── backend/
│   ├── app.py
│   ├── templates/
│   │   └── index.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   └── downloads/
│
├── requirements.txt
├── Procfile
└── README.md
```

---

## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/midhunmanesh01-code/yt-dnl.git
cd yt-dnl
```

---

### 2️⃣ Create a virtual environment

```bash
python -m venv venv
```

Activate it:

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

---

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Install FFmpeg

Download FFmpeg from:

https://www.gyan.dev/ffmpeg/builds/

Add the `bin` folder to your system PATH.

---

### 5️⃣ Run the application

```bash
python backend/app.py
```

Open:

```
http://127.0.0.1:5000
```

---

## 🌐 Deployment

This project is deployed using **Render**.

Deployment includes:

- Flask backend
- Static frontend
- yt-dlp
- FFmpeg support
- Native browser downloads

---

## ⚙️ How It Works

```text
User
 │
 ▼
Paste YouTube URL
 │
 ▼
Choose Quality
 │
 ▼
Flask Backend
 │
 ▼
yt-dlp extracts video
 │
 ▼
FFmpeg merges streams (if needed)
 │
 ▼
Temporary file created
 │
 ▼
Browser downloads file
 │
 ▼
Temporary file deleted
```

---

## 🧹 Automatic Cleanup

Downloaded files are stored temporarily on the server.

After the browser receives the file, the server automatically deletes it to prevent unnecessary storage usage.

---

## ⚠ Known Limitations

- Some YouTube videos may trigger bot verification.
- Age-restricted or private videos require authentication.
- Very large videos may exceed free hosting limitations.
- Availability depends on YouTube's current restrictions.

---

## 🔮 Future Improvements

- Thumbnail preview
- Video title preview
- File size estimation
- Download progress indicator
- Playlist support
- Better error pages
- Dark mode
- Search functionality
- Download history

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📜 License

This project is intended for educational and personal learning purposes.

Users are responsible for complying with YouTube's Terms of Service and applicable copyright laws when downloading content.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ using Flask, yt-dlp and Python**

**Made by Midhun Manesh**

</div>