# 💡 ITI - Generative AI Course

---

## 💻 Practical Application: Building a Website with AI Tools and API Integration

This project is a practical application within the **ITI Generative AI Course**, demonstrating how to use AI tools to build a website and integrate them via API keys.

### 🧠 ChatGPT Clone (Frontend Only)

An interactive ChatGPT-like chat application built entirely with **Next.js** and **TailwindCSS**. This app allows you to interact with multiple AI models and includes advanced features for image generation and audio processing.

---

### 🔗 Live Demo

You can try the live version of the application here:
[https://chat-gpt-clone-et11-72s0uzu3j-abdelmonem-mareis-projects.vercel.app/](https://chat-gpt-clone-et11-72s0uzu3j-abdelmonem-mareis-projects.vercel.app/)

---

## ✨ Features

### 💬 Advanced Chat Interface
- **Multiple Models**: Supports **OpenAI GPT-4o-mini**, **GPT-3.5-turbo**, **Google Gemini Pro**, and **DeepSeek Chat**.
- **Streaming Responses**: Get instant responses with engaging visual effects.
- **Conversation Management**: Save, retrieve, and export conversations easily.
- **Interactive Tools**: Regenerate, edit, and delete messages.

### 🎨 Image Generation
- **HiDream**: Use an advanced model for fast, high-quality image generation.
- **Advanced Display**: View images clearly with the ability to download them.
- **Easy Interface**: Switch seamlessly between chat and image generation modes.

### 🔊 Audio Processing
- **Text-to-Speech (TTS)**: Utilizes the Web Speech API.
- **Speech-to-Text (STT)**: Full support for the Arabic language.
- **Full Control**: Pause and play audio as needed.

### 📁 File Management
- **Multiple Uploads**: Supports uploading **PDFs**, **images**, and **audio files**.
- **File Preview**: Preview files before sending them.
- **Smart Management**: Delete and edit attached files.

### 💾 Local Storage
- **Auto-Save**: Conversations are automatically saved every 30 seconds.
- **JSON Export**: Export conversations for backup.
- **Sidebar**: Quickly browse saved conversations.

---

## 🚀 Installation and Running

```bash
# Install dependencies
npm install

# Run the application
npm run dev
````

-----

## ⚙️ Setup

1.  **Create a `.env.local` file in the project's root directory**:

<!-- end list -->

```bash
# OpenAI API Key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here

# Google Gemini API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here

# DeepSeek API Key
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_key_here

# Replicate API Key (for image generation)
NEXT_PUBLIC_REPLICATE_API_KEY=your_replicate_key_here
```

2.  **Get your API keys**:

      - [OpenAI API Key](https://platform.openai.com/api-keys)
      - [Google Gemini API Key](https://makersuite.google.com/app/apikey)
      - [DeepSeek API Key](https://platform.deepseek.com/api_keys)
      - [Replicate API Key](https://replicate.com/account/api-tokens)

3.  **Restart the server**:

    ```bash
    npm run dev
    ```

-----


## 🔧 Technologies Used

  - **Frontend**: Next.js 13, React, TypeScript.
  - **Styling**: TailwindCSS, Shadcn/ui.
  - **Icons**: Lucide React.
  - **APIs**: OpenAI, Google Gemini, DeepSeek, Replicate.
  - **Image Generation**: Replicate (Stable Diffusion XL, HiDream).
  - **Audio**: Web Speech API, SpeechRecognition.

-----

