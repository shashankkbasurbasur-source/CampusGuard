CampusGuard – Cybersecurity Learning Prototype

CampusGuard is a beginner-friendly cybersecurity learning platform where students can practice various labs such as port scanning, log analysis, password strength analysis, phishing email analysis, and more.

This prototype includes:
- A Python/Flask backend
- A React (Vite) frontend
- An AI Feedback system powered by the OpenAI API
  
# How to Test CampusGuard

1. Download or clone the project.
2. Install Python dependencies:
   pip install -r backend/requirements.txt

3. Create a .env file inside backend folder:
   OPENAI_API_KEY=your_own_openai_key_here

4. Run backend:
   python backend/app.py

5. Go to frontend folder:
   cd frontend
   npm install
   npm run dev
