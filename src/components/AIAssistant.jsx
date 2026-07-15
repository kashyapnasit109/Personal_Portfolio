import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { assistantResponses, suggestedQuestions } from '../data/assistant';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: assistantResponses.greetings[0] },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findAnswer = (query) => {
    const lower = query.toLowerCase();
    for (const q of assistantResponses.questions) {
      if (q.patterns.some((p) => lower.includes(p))) {
        return q.answer;
      }
    }
    return assistantResponses.fallback;
  };

  const handleSend = (text) => {
    const query = text || input;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setInput('');

    setTimeout(() => {
      const answer = findAnswer(query);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    }, 500);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[55] w-16 h-16 flex items-center justify-center transition-colors border-2 ${
          isOpen
            ? 'bg-surface border-surface-border text-white'
            : 'bg-accent border-accent text-primary-dark hover:bg-white hover:border-white'
        }`}
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMessageSquare className="text-2xl" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 right-8 z-[55] w-[400px] max-w-[calc(100vw-64px)] h-[500px] bg-primary-dark border-2 border-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-white flex items-center justify-between bg-white">
              <span className="font-heading font-black uppercase text-primary-dark text-xl tracking-tight">Kashyap_AI</span>
              <span className="font-mono text-[10px] text-primary-dark/60 uppercase tracking-widest">Active</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 font-mono text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-primary-dark'
                      : 'bg-surface border border-surface-border text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested */}
            {messages.length <= 2 && (
              <div className="px-6 py-3 border-t border-surface-border bg-surface">
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 2).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="font-mono text-[10px] px-2 py-1 border border-surface-border text-text-muted hover:text-accent hover:border-accent uppercase"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-6 py-4 border-t-2 border-white bg-primary-dark flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="QUERY..."
                className="flex-1 bg-transparent text-white font-mono text-sm placeholder-text-muted focus:outline-none uppercase"
              />
              <button
                onClick={() => handleSend()}
                className="text-accent hover:text-white transition-colors"
              >
                <FiSend className="text-xl" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
