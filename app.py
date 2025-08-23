import os
import google.generativeai as genai
from googleapiclient.discovery import build
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- API Configuration ---
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel('gemini-1.5-flash')

SEARCH_API_KEY = os.getenv("SEARCH_API_KEY")
SEARCH_ENGINE_ID = os.getenv("SEARCH_ENGINE_ID")

# --- Helper Functions ---
def google_search(query):
    """Performs a Google search and returns a list of snippets."""
    try:
        service = build("customsearch", "v1", developerKey=SEARCH_API_KEY)
        # Get top 3 results
        res = service.cse().list(q=query, cx=SEARCH_ENGINE_ID, num=3).execute()
        snippets = [item.get('snippet', '') for item in res.get('items', [])]
        return snippets
    except Exception as e:
        print(f"An error occurred during search: {e}")
        return []

# --- Flask App Initialization ---
app = Flask(__name__)

# --- Routes ---
@app.route('/')
def index():
    """Renders the main chat page."""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handles the main chat logic."""
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "Message not provided"}), 400

    # Perform a Google search with the user's message
    search_results = google_search(user_message)
    search_context = "\n".join(search_results)

    # Create a smart prompt for the Gemini API
    prompt = f"""
    You are a helpful and friendly AI assistant. Your goal is to answer the user's question based on your own knowledge, but use the provided search results to help with recent or specific topics.

    User's Question: "{user_message}"

    Search Results (use these to inform your answer if relevant):
    {search_context}
    """

    # Call the Gemini API to get the final answer
    try:
        response = gemini_model.generate_content(prompt)
        bot_response = response.text
    except Exception as e:
        print(f"An error occurred with the Gemini API: {e}")
        bot_response = "Sorry, I'm having a little trouble thinking right now. Please try again in a moment."

    # Send the answer back as JSON
    return jsonify({"response": bot_response})

# --- Main Execution ---
if __name__ == '__main__':
    app.run(debug=True)
