import React, { useState } from 'react';
import { MessageSquare, Send, PhoneCall, Mic, FileText, Users } from 'lucide-react';

export default function Support() {
  const [lang, setLang] = useState('en');
  const initialMessages = {
    en: [
      { text: "Hello! I am CropGenie Assistant. How can I help you today?", sender: 'bot', time: '10:00 AM' },
      { text: "Can you tell me about the PM-Kisan subsidy scheme?", sender: 'user', time: '10:02 AM' },
      { text: "The PM-KISAN scheme offers an income support of ₹6,000 per year in three equal installments. Would you like me to guide you to the registration portal?", sender: 'bot', time: '10:02 AM' }
    ],
    hi: [
      { text: "नमस्ते! मैं क्रॉपजिनी सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?", sender: 'bot', time: '10:00 AM' },
      { text: "क्या आप मुझे पीएम-किसान सब्सिडी योजना के बारे में बता सकते हैं?", sender: 'user', time: '10:02 AM' },
      { text: "पीएम-किसान योजना तीन समान किस्तों में प्रति वर्ष ₹6,000 की आय सहायता प्रदान करती है। क्या आप चाहते हैं कि मैं आपको पंजीकरण पोर्टल पर ले चलूं?", sender: 'bot', time: '10:02 AM' }
    ]
  };
  const [messagesEn, setMessagesEn] = useState(initialMessages.en);
  const [messagesHi, setMessagesHi] = useState(initialMessages.hi);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const messages = lang === 'en' ? messagesEn : messagesHi;
  const setMessages = lang === 'en' ? setMessagesEn : setMessagesHi;

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const handleSend = (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    
    const currentInput = input;
    setInput('');
    
    setMessages(prev => [...prev, { 
      text: currentInput, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    
    setTimeout(() => {
      let botResponse = lang === 'en' ? "I have recorded your query. An agricultural expert will respond shortly, or you can check our community forum for similar questions." : "मैंने आपका प्रश्न दर्ज कर लिया है। एक कृषि विशेषज्ञ जल्द ही उत्तर देंगे, या आप इसी तरह के प्रश्नों के लिए हमारे सामुदायिक फ़ोरम की जाँच कर सकते हैं।";
      const lowerInput = currentInput.toLowerCase();
      
      if (lowerInput.includes('scheme') || lowerInput.includes('kisan')) {
        botResponse = lang === 'en' ? "You can learn more about PM-Kisan or other schemes from our Help & Support Hub's Government Schemes section." : "आप हमारे सहायता केंद्र के सरकारी योजना अनुभाग से पीएम-किसान या अन्य योजनाओं के बारे में अधिक जान सकते हैं।";
      } else if (lowerInput.includes('weather') || lowerInput.includes('rain')) {
         botResponse = lang === 'en' ? "The weather is currently clear in your area, with no rain expected for the next 48 hours." : "आपके क्षेत्र में वर्तमान में मौसम साफ है, अगले 48 घंटों तक बारिश की कोई उम्मीद नहीं है।";
      } else if (lowerInput.includes('pest') || lowerInput.includes('disease') || lowerInput.includes('sick')) {
        botResponse = lang === 'en' ? "For disease or pest detection, please use our Disease Detection tool from the main menu by uploading a picture of your crop." : "रोग या कीट का पता लगाने के लिए, कृपया अपनी फसल की तस्वीर अपलोड करके मुख्य मेनू से हमारे रोग पहचान उपकरण का उपयोग करें।";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = lang === 'en' ? "Hello again! How can I assist you with your farming needs today?" : "नमस्ते! मैं आज आपकी खेती की जरूरतों में कैसे सहायता कर सकता हूँ?";
      }

      setMessages(prev => [...prev, { 
        text: botResponse, 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>{lang === 'en' ? 'Help & Support Hub' : 'सहायता और समर्थन केंद्र'}</h2>
          <p className="text-muted" style={{ margin: 0 }}>{lang === 'en' ? '24x7 Multilingual Chatbot & Community Forum' : '24x7 बहुभाषी चैटबॉट और सामुदायिक मंच'}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
           <button className="btn btn-outline" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
             {lang === 'en' ? 'अ Hindi' : 'A English'}
           </button>
           <a href="tel:18001801551" onClick={(e) => { e.preventDefault(); alert(lang === 'en' ? 'Connecting to Agricultural Expert at 1800-180-1551...' : 'कृषि विशेषज्ञ (1800-180-1551) से जुड़ रहे हैं...'); }} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
             <PhoneCall size={16} /> {lang === 'en' ? 'Contact Expert' : 'विशेषज्ञ से संपर्क करें'}
           </a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse' }}>
        
        {/* Support Options */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel p-6">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText className="text-primary"/> {lang === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>{lang === 'en' ? 'PM Fasal Bima Yojana Guide' : 'पीएम फसल बीमा योजना'}</a></li>
              <li><a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>{lang === 'en' ? 'PM-KISAN Samman Nidhi Portal' : 'पीएम-किसान सम्मान निधि'}</a></li>
              <li><a href="https://www.myscheme.gov.in/schemes/kcc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>{lang === 'en' ? 'Kisan Credit Card Factsheet' : 'किसान क्रेडिट कार्ड'}</a></li>
            </ul>
          </div>

          <div className="glass-panel p-6">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users className="text-secondary"/> {lang === 'en' ? 'Community Forum' : 'सामुदायिक मंच'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>{lang === 'en' ? 'Best organic pesticide for aphids?' : 'एफिड्स के लिए बेहतरीन जैविक कीटनाशक?'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lang === 'en' ? 'Posted by Vijay S. • 12 Replies' : 'विजय एस. द्वारा पोस्ट किया गया • 12 उत्तर'}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{lang === 'en' ? 'Soil testing labs near Solapur' : 'सोलापुर के पास मृदा परीक्षण प्रयोगशालाएँ'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lang === 'en' ? 'Posted by Amit K. • 4 Replies' : 'अमित के. द्वारा पोस्ट किया गया • 4 उत्तर'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Interface */}
        <div className="glass-panel" style={{ flex: '2 1 450px', display: 'flex', flexDirection: 'column', height: '550px' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: '#f8fafc', borderRadius: '16px 16px 0 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'en' ? 'CropGenie Assistant' : 'क्रॉपजिनी सहायक'}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{lang === 'en' ? 'Online' : 'ऑनलाइन'}</div>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ 
                  background: msg.sender === 'user' ? 'var(--primary)' : '#e2e8f0',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                  padding: '1rem',
                  borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  fontSize: '0.95rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.time}</div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'white', borderRadius: '0 0 16px 16px' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={handleVoiceInput} style={{ background: isListening ? '#fecaca' : '#f1f5f9', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: isListening ? 'var(--danger)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={lang === 'en' ? "Type your question or click mic..." : "अपना प्रश्न टाइप करें या माइक पर क्लिक करें..."}
                style={{ flex: 1, padding: '0 1rem', border: '1px solid var(--border-color)', borderRadius: '24px', outline: 'none' }} 
              />
              <button type="submit" style={{ background: 'var(--primary)', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}>
                <Send size={18} style={{ marginLeft: '4px' }} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
