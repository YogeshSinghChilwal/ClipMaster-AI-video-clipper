# 🎙️ AI Podcast Clipper

AI-powered podcast video processing pipeline built with **FastAPI**, **Modal**, **WhisperX**, **Gemini AI**, and **OpenCV**.  
This application takes a podcast video from S3, transcribes it, detects interesting Q&A segments, and generates **vertical, subtitle-enhanced clips** for sharing.

---

## 📌 Features
- **Automatic Transcription** using WhisperX (GPU-accelerated)
- **Smart Clip Detection** using Gemini AI
- **Vertical Video Creation** with face tracking
- **Subtitles** with custom styling
- **S3 Upload** for processed clips
- **End-to-End Automation** via Modal's cloud execution

---

## 🏗 Project Architecture
1. **Download Video** from AWS S3.
2. **Transcribe Audio** using WhisperX and align words.
3. **Identify Moments** with Gemini AI (Q&A extraction).
4. **Generate Clips**:
   - Trim original video
   - Track faces and crop for vertical format
   - Add styled subtitles
5. **Upload to S3** and clean up temporary files.

---

## 📂 Main Components

### 1. **Class: `ProcessVideoRequest`**
- **Type**: `pydantic.BaseModel`
- **Purpose**: Request validation model for the `/process_video` endpoint.
- **Fields**:
  - `s3_key` → Path to the video file in S3.

---

### 2. **Function: `create_vertical_video(...)`**
- **Purpose**: Convert a horizontal clip into a vertical, face-focused video.
- **Key Logic**:
  - Read all frames from the extracted images.
  - Use **face tracking scores** to find the most relevant face.
  - Choose between:
    - **Crop mode** → Focus on detected face.
    - **Resize mode** → Add blurred background.
  - Save output video with **FFmpeg**.

---

### 3. **Function: `create_subtitles_with_ffmpeg(...)`**
- **Purpose**: Generate `.ass` subtitles and embed them into the video.
- **Key Logic**:
  - Select transcript segments within the clip's time range.
  - Group words into lines (max 5 words each).
  - Style subtitles using `pysubs2` (Anton font, shadow, centered alignment).
  - Burn subtitles into the video with FFmpeg.

---

### 4. **Function: `process_clip(...)`**
- **Purpose**: Create a single processed clip from the original video.
- **Workflow**:
  1. Trim original video to `start_time` → `end_time`.
  2. Extract audio track.
  3. Run `Columbia_test.py` for face tracking.
  4. Load tracking data from `.pckl` files.
  5. Generate vertical version with `create_vertical_video`.
  6. Add subtitles with `create_subtitles_with_ffmpeg`.
  7. Upload to S3.

---

### 5. **Class: `AiPodcastClipper`**
Modal App class with GPU execution.  
Handles **model loading**, transcription, moment detection, and video processing.

#### **Method: `load_model()`**
- Loads **WhisperX transcription model** (`large-v2`).
- Loads alignment model for word-level timestamps.
- Initializes Gemini AI client.

#### **Method: `transcribe_video(...)`**
- Extracts audio from video using FFmpeg.
- Runs WhisperX to transcribe and align words.
- Returns a JSON list of `{start, end, word}` objects.

#### **Method: `identify_moments(...)`**
- Sends transcript to Gemini AI with instructions for Q&A extraction.
- Returns list of `{start, end}` objects for each clip.

#### **Method: `process_video(...)`**
FastAPI endpoint (`POST /process_video`)
1. **Auth check** (Bearer token).
2. Download video from S3.
3. Transcribe and identify moments.
4. Process up to **5 clips** with `process_clip`.
5. Clean up temp files.

---

### 6. **Function: `main()`**
- Local test entry point.
- Creates an instance of `AiPodcastClipper`.
- Sends a test request to the `process_video` endpoint.

---

## 🛠 Requirements
- Python 3.12
- CUDA-enabled GPU (for WhisperX)
- AWS S3 credentials
- Gemini API Key
- FFmpeg
- Required Python packages in `requirements.txt`

---

## 🚀 Running the Project

### **1. Install Dependencies**
```bash
pip install -r requirements.txt
