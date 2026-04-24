'use client';

import React, { useState, useEffect, useRef } from 'react';
import { systemService } from '@/lib/services';
import { initWebsocket } from '@/lib/api-client';

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  const wsRef = useRef(null);
  const chatContainerRef = useRef(null); 

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, type }]);
  };

  useEffect(() => {
    let wsInstance = null;
    let isMounted = true;

    const setupChat = async () => {
      try {
        const result = await systemService.getGuestToken();
        
        if (!isMounted) return;

        const token = result.data ? result.data.token : result.token;

        if (token) {
          wsInstance = initWebsocket('/ws/chat', {
            token: token,
            onOpen: () => {
              setIsConnected(true);
              addMessage("✅ Securely connected to the server!", "system");
            },
            onMessage: (event) => {
              addMessage(event.data, "bot");
            },
            onError: () => {
              addMessage("❌ WebSocket connection error!", "system");
            },
            onClose: () => {
              setIsConnected(false);
              addMessage("⚠️ Disconnected. Please refresh the page (F5).", "system");
            }
          });

          wsRef.current = wsInstance;
        } else {
          addMessage("❌ Error: Token not found in response.", "system");
        }
      } catch (error) {
        if (!isMounted) return; 
        
        addMessage("❌ Network Error: Could not fetch Token API.", "system");
        console.error(error);
      }
    };

    setupChat();

    return () => {
      isMounted = false; 
      
      if (wsInstance) {
        wsInstance.close();
      }
    };
  }, []);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault(); 

    const text = inputText.trim();
    if (text && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);
      addMessage(text, "user");
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div style={{ border: '1px solid #eaeaea', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        <div style={{ backgroundColor: '#007bff', color: 'white', padding: '15px 20px', fontWeight: 'bold' }}>
          Dropship Support Chat
        </div>

        <div 
          ref={chatContainerRef} 
          style={{ height: '500px', overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '15px', scrollBehavior: 'smooth' }}
        >
          {messages.map((msg) => (
            <div key={msg.id} style={{
              alignSelf: msg.type === 'user' ? 'flex-end' : (msg.type === 'system' ? 'center' : 'flex-start'),
              maxWidth: msg.type === 'system' ? '100%' : '75%'
            }}>
              {msg.type === 'system' ? (
                <div style={{ color: 'gray', fontSize: '0.85em', fontStyle: 'italic', textAlign: 'center' }}>
                  {msg.text}
                </div>
              ) : (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  lineHeight: '1.5',
                  wordWrap: 'break-word',
                  backgroundColor: msg.type === 'user' ? '#c8e6c9' : '#e3f2fd',
                  color: msg.type === 'user' ? '#1b5e20' : '#0d47a1',
                }}>
                  <b>{msg.type === 'user' ? 'You:' : 'Shop:'}</b><br/>
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}<br/>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '15px', backgroundColor: 'white', borderTop: '1px solid #eaeaea' }}>
          <form 
            onSubmit={handleSendMessage} 
            style={{ display: 'flex', width: '100%' }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
              placeholder={isConnected ? "Type your message..." : "Connecting to system..."}
              style={{
                flex: 1, padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', 
                outline: 'none', marginRight: '10px', backgroundColor: isConnected ? 'white' : '#e9ecef'
              }}
            />
            <button
              type="submit"
              disabled={!isConnected || !inputText.trim()}
              style={{
                padding: '10px 25px', backgroundColor: isConnected ? '#007bff' : '#ccc', 
                color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', 
                cursor: isConnected ? 'pointer' : 'not-allowed'
              }}
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}