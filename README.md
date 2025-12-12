# Arogya Wellness Assistant

> **Built with LangChain 🦜🔗**

**Arogya Wellness Assistant** is a full-stack, multi-agent health and wellness assistant.  
The backend (Flask + LangChain + Groq Llama‑3.3‑70B‑Versatile) coordinates specialized agents for symptoms, lifestyle, diet, and fitness, then synthesizes a **safe wellness plan**.
The frontend (React + Vite) provides a guided experience for login, profile management, wellness queries, and follow-up questions.

## Core Features

### Multi-Agent Wellness Pipeline
- **Symptom Triage Agent** – identifies general wellness concerns (non-diagnostic)
- **Lifestyle Guidance Agent** – sleep, routine, stress-related advice
- **Diet & Nutrition Agent** – food and hydration guidance
- **Fitness & Activity Agent** – low-intensity, safety-first movement suggestions

### Shared Conversational Memory
- Short-term memory shared between agents during orchestration  
- Ensures agents are context-aware of each other’s outputs

### Structured Orchestration Output
The orchestrator combines all agent outputs into a single structured JSON response:

- `synthesized_guidance` – markdown wellness plan with:
  - Overview  
  - When to See a Doctor  
  - Lifestyle & Rest  
  - Hydration & Diet  
  - Hygiene & Environment  
  - Movement & Activity  
  - Final Note  
- `recommendations` – concise bullet-point takeaways  
- Raw agent outputs:
  - `symptom_analysis`
  - `lifestyle`
  - `diet`
  - `fitness`

### Follow-up Q&A
- Users can ask follow-up questions after receiving a wellness plan  
- Backend uses the **last stored plan + recommendations** as context  
- Ensures continuity and safer responses

### Frontend Experience
- Username/password login (demo JSON-based store)  
- Profile management:
  - height
  - weight
  - medications  
- **Streaming Responses**: Real-time "thought process" visualization using Server-Sent Events (SSE).

***

## Tech Stack

### Backend
- **Language**: Python 3.11+
- **Framework**: Flask (REST API, routing, error handling)
- **AI/LLM orchestration**: 
  - `langchain-openai` (configured for Groq API compatibility)
  - `langchain` (core abstractions)
- **Model**: `llama-3.3-70b-versatile` on GroqCloud
- **Data Storage** (JSON-based for demo):
  - User credentials 
  - User profiles
  - Session & orchestration history
- **External Integration**: YouTube Data API (for video recommendations)

### Frontend
- React + Vite  
- Axios for API communication  
- `react-markdown` for rendering markdown responses  
- Tailwind CSS

### Configuration & Security
- Environment variables using `.env`  
- Groq API key & model configuration  
  - `GROQ_API_KEY`  
  - `GROQ_MODEL_NAME`  
  - `YOUTUBE_API_KEY` (optional)
- Username/password authentication via `/login`  
- CORS enabled for local development

***

## API Endpoints

### Authentication

**POST** `/register` (New)
```json
{
  "username": "user1",
  "password": "password",
  "full_name": "User One"
}
```

**POST** `/login`  
```json
{
  "username": "user1",
  "password": "password"
}
```

### Health Assistance

**POST** `/health-assist`  
Analyzes symptoms and generates a wellness plan.
```json
{
  "symptoms": "fever and headache",
  "medical_report": "",
  "user_id": "user1"
}
```

**POST** `/chat_stream` (Streaming)  
Provides real-time thought process and answer via Server-Sent Events (SSE).
```json
{
  "symptoms": "I feel tired and have a headache",
  "medical_report": ""
}
```

### Recommendations & Media

**POST** `/recommendations`  
Returns only the concise recommendations list.

**POST** `/youtube-recommendations`  
Fetches relevant YouTube videos based on symptoms.
```json
{
  "symptom": "lower back pain",
  "max_videos": 4
}
```

### Follow-Up Questions

**POST** `/follow-up`  
```json
{
  "user_id": "user1",
  "question": "Can I exercise lightly with these symptoms?"
}
```

***

## Running the Project

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd healthbackend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in `healthbackend/config/`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL_NAME=llama-3.3-70b-versatile
   YOUTUBE_API_KEY=your_youtube_api_key (optional)
   ```

5. Run the Flask app:
   ```bash
   python app.py
   ```
   Backend runs at: `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd wellness-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://127.0.0.1:5173`
