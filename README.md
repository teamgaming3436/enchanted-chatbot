# 👑 Enchanted AI – The Multi-Tool Productivity Agent

Enchanted is a modern, intelligent, and multi-tool AI assistant designed to be a versatile productivity partner.  
Built with Python, Flask, and the Google Gemini API, this agent goes beyond simple Q&A by dynamically selecting the best tool for a user's request, from live web searches to in-depth document analysis.

➡️ View the Live Demo Here
https://enchanted-chatbot.onrender.com
---

## ✨ Core Features & Capabilities

- 🧠 Intelligent Tool Router  
  Uses an LLM-powered router to analyze user intent and dynamically dispatch tasks to the most suitable tool.

- 🌐 Live Web Search  
  Provides real-time, up-to-date answers using the Google Search API.

- 📄 Document Analyst (RAG)  
  Upload .pdf, .txt, or .docx files and chat with their contents using Retrieval-Augmented Generation.

- 🖼️ Image Text Scraper (OCR)  
  Extracts text from images (.png, .jpg) using Tesseract OCR.

- 🧮 Smart Calculator  
  Handles instant and accurate mathematical calculations.

- 👑 "King Mode" Easter Egg  
  Special authentication system that recognizes the creator (Ansh) with a secret passphrase, unlocking hidden responses.

---

## 🛠️ Technology Stack

Backend: Python, Flask, Gunicorn  
AI & APIs: Google Gemini API, Google Custom Search API  
Frontend: HTML5, CSS3, JavaScript  
Data Tools: pdfplumber (PDFs), pytesseract & Pillow (OCR)  
Deployment: Render, Git, Docker (optional)

---

## 🚀 Getting Started

Follow these instructions to set up a local development environment.

### ✅ Prerequisites
- Python 3.8+  
- Git  
- Tesseract OCR Engine (for OCR tool)  
- Google Cloud account (for API keys)

### ⚙️ Installation & Setup

1. Clone the Repository
   git clone https://github.com/anshs-dev/enchanted-chatbot.git
   cd enchanted-chatbot

2. Create & Activate Virtual Environment
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate

3. Install Dependencies
   pip install -r requirements.txt

4. Configure Environment Variables  
   Create a .env file in the project root and add:

   GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
   SEARCH_API_KEY="YOUR_GOOGLE_SEARCH_API_KEY_HERE"
   SEARCH_ENGINE_ID="YOUR_SEARCH_ENGINE_ID_HERE"
   FLASK_SECRET_KEY="ANY_RANDOM_STRONG_STRING_HERE"
   # Optional for Windows if Tesseract is not in PATH
   # TESSERACT_CMD="C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

5. Run the Application
   python app.py
   Open browser: http://127.0.0.1:5000

---

## ☁️ Deployment (Render)

1. Push code to GitHub  
2. On Render, create a new Web Service and connect repo  
3. Settings:  
   Runtime: Python 3  
   Build Command: ./build.sh  
   Start Command: gunicorn app:app  

4. Add environment variables in Render dashboard  
5. Enable auto-deploy for updates  

---

## 🗺️ Future Roadmap

- Web Content Scraper (summarize URLs)  
- AI Image Generator (text → image)  
- Speech-to-Text & Text-to-Speech  
- Sandboxed Code Interpreter (secure Python execution)  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Check the issues page on GitHub.

---

## 📜 License

This project is licensed under the MIT License – see the LICENSE.md file for details.

---

## 📧 Contact

Ansh  
Email: anshs.dev@gmail.com  
LinkedIn: https://www.linkedin.com/in/anshs-dev  
GitHub: https://github.com/anshs-dev  

Project Link: https://github.com/anshs-dev/enchanted-chatbot
