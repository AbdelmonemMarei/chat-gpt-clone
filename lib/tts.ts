import { useState, useCallback } from 'react';

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 1;
    newUtterance.pitch = 1;
    newUtterance.volume = 1;
    
    // Try to use Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(voice => 
      voice.lang.startsWith('ar') || voice.name.includes('Arabic')
    );
    
    if (arabicVoice) {
      newUtterance.voice = arabicVoice;
    }

    newUtterance.onstart = () => setIsPlaying(true);
    newUtterance.onend = () => setIsPlaying(false);
    newUtterance.onerror = () => setIsPlaying(false);

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return { speak, stop, isPlaying };
}