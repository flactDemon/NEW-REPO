import React, { useState } from 'react';
import { Menu, Bell, Mic, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const startVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes('support') || transcript.includes('help')) {
        navigate('/support');
      } else if (transcript.includes('dashboard') || transcript.includes('home')) {
        navigate('/dashboard');
      } else if (transcript.includes('market') || transcript.includes('finance')) {
        navigate('/market');
      } else if (transcript.includes('crop') || transcript.includes('recommendation')) {
        navigate('/crop-ai');
      } else {
        alert(`You said: "${event.results[0][0].transcript}". Please try saying a page name like "Support" or "Dashboard".`);
      }
    };
    recognition.start();
  };

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'var(--panel-bg)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={toggleSidebar}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: window.innerWidth > 768 ? 'none' : 'block' }}
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.25rem', margin: 0, display: window.innerWidth > 768 ? 'block' : 'none' }}>
            Welcome back, Farmer Ramesh! 👋
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        
        {/* Voice Assistant */}
        <button 
          className="btn btn-primary" 
          onClick={startVoiceCommand}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '20px', 
            gap: '0.5rem', 
            fontSize: '0.85rem',
            background: isListening ? 'var(--danger)' : 'var(--primary)',
            borderColor: isListening ? 'var(--danger)' : 'var(--primary)'
          }}
        >
          <Mic size={16} />
          <span>{isListening ? 'Listening...' : 'Tap to Speak'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
          <button 
            onClick={() => alert("You have 2 pending tasks! Check your Dashboard.")}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative' }}
          >
            <Bell size={20} color="var(--text-muted)" />
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
          </button>
          
          <button 
             onClick={() => alert("Language Switcher opened. Select: English, हिंदी, मराठी")}
             style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Globe size={20} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
}
