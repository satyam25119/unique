"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, MessageSquare } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

const SUGGESTED_CHIPS = [
  "What services do you offer?",
  "How quickly can you respond?",
  "Do you operate Pan-India?",
];

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return generateId() + generateId();
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSessionId(generateUUID());
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId,
          }),
        });

        const data = await res.json();

        if (data.success && data.response) {
          const aiMsg: ChatMessage = {
            id: generateId(),
            role: "ai",
            content: data.response,
          };
          setMessages((prev) => [...prev, aiMsg]);
          if (data.sessionId && data.sessionId !== sessionId) {
            setSessionId(data.sessionId);
          }
        } else {
          const errMsg: ChatMessage = {
            id: generateId(),
            role: "ai",
            content:
              data.error ||
              "I'm sorry, something went wrong. Please try again.",
          };
          setMessages((prev) => [...prev, errMsg]);
        }
      } catch {
        const errMsg: ChatMessage = {
          id: generateId(),
          role: "ai",
          content:
            "Network error. Please check your connection and try again.",
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, sessionId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-24 left-4 z-[9999] sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="mb-3 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-xl w-[calc(100vw-2rem)] max-w-[380px] h-[70vh] max-h-[500px] sm:w-[380px] sm:h-[500px]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F05A00] shadow-lg shadow-[#F05A00]/30">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    AI Assistant
                  </h3>
                  <p className="text-[11px] leading-tight text-white/50">
                    Powered by Unique Engineering
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="chat-scrollbar flex-1 overflow-y-auto px-4 py-3">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F05A00]/10">
                    <MessageSquare className="h-7 w-7 text-[#F05A00]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/80">
                      Hello! How can I help you?
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Ask me anything about our engineering services
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-all hover:border-[#F05A00]/40 hover:bg-[#F05A00]/10 hover:text-[#F05A00]"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap break-words ${
                          msg.role === "user"
                            ? "rounded-br-md bg-[#F05A00] text-white"
                            : "rounded-bl-md border border-white/10 bg-white/5 text-white/85"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/50" />
                          <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/50" />
                          <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t border-white/10 p-3">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 transition-colors focus-within:border-[#F05A00]/40"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F05A00] text-white transition-all hover:bg-[#F05A00]/80 disabled:opacity-30 disabled:hover:bg-[#F05A00]"
                  aria-label="Send message"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#F05A00] text-white shadow-lg shadow-[#F05A00]/30 transition-shadow hover:shadow-xl hover:shadow-[#F05A00]/40"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {/* Pulse ring animation (idle only) */}
        {!isOpen && (
          <span className="chat-pulse-ring absolute inset-0 rounded-full bg-[#F05A00]" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
