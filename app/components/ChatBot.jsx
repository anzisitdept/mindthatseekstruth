"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, MessageCircle, X, Bot, User, Mail, Check, XCircle } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "👋 Hello! I'm here to help. What would you like to know?",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("askMessage");
  const messagesEndRef = useRef(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleUserSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    if (step === "askMessage") {
      setTimeout(() => {
        if (previousEmail) {
          // Ask if they want to use previous email
          const botResponse = {
            from: "bot", 
            text: "📧 Would you like to use your previous email or provide a new one?",
            timestamp: new Date(),
            showEmailOptions: true
          };
          setMessages((prev) => [...prev, botResponse]);
          setStep("askEmailChoice");
        } else {
          // First time - ask for email directly
          const botResponse = {
            from: "bot", 
            text: "📧 Thank you for your message! Could you please share your email address so we can get back to you?",
            timestamp: new Date()
          };
          setMessages((prev) => [...prev, botResponse]);
          setStep("askEmail");
        }
      }, 1000);
    } else if (step === "askEmail") {
      if (!validateEmail(input)) {
        const errorResponse = {
          from: "bot", 
          text: "⚠️ That doesn't look like a valid email address. Please check and try again.",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, errorResponse]);
        return;
      }
      setEmail(input);
      setPreviousEmail(input); // Store for future use
      handleSubmit(input);
    } else if (step === "askEmailChoice") {
      // Handle button choice from email options
      if (input.toLowerCase() === "previous") {
        setEmail(previousEmail);
        handleSubmit(previousEmail);
      } else if (input.toLowerCase() === "new") {
        const botResponse = {
          from: "bot", 
          text: "📧 Please enter your new email address:",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botResponse]);
        setStep("askEmail");
      }
    } else if (step === "done") {
      if (input.toLowerCase().includes("yes")) {
        const newTicketResponse = {
          from: "bot", 
          text: "🎉 Great! What would you like to ask about now?",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, newTicketResponse]);
        setStep("askMessage");
      } else {
        const goodbyeResponse = {
          from: "bot", 
          text: "👍 Thank you for chatting with us! Have a wonderful day!",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, goodbyeResponse]);
        // Reset conversation after goodbye
        setTimeout(() => {
          setIsOpen(false);
          // Reset conversation after a delay
          setTimeout(() => {
            setMessages([{ 
              from: "bot", 
              text: "👋 Hello! I'm here to help. What would you like to know?",
              timestamp: new Date()
            }]);
            setStep("askMessage");
          }, 1000);
        }, 2000);
      }
    }

    setInput("");
  };

  const handleEmailChoice = (choice) => {
    const userMessage = { 
      from: "user", 
      text: choice === "previous" ? "Use previous email" : "Use new email", 
      timestamp: new Date() 
    };
    setMessages((prev) => [...prev, userMessage]);

    if (choice === "previous") {
      setEmail(previousEmail);
      setTimeout(() => {
        handleSubmit(previousEmail);
      }, 500);
    } else {
      const botResponse = {
        from: "bot", 
        text: "📧 Please enter your new email address:",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      setStep("askEmail");
    }
  };

  const handleSubmit = async (userEmail) => {
    setLoading(true);
    try {
      const userMessage = messages.find((m) => m.from === "user" && m.text !== input)?.text || "";

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: ["md007@gmail.com", "anziandco@gmail.com", "djam4343@gmail.com"],
          subject: `New Support Request from ${userEmail} - Mind That Seeks Truth`,
          content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { 
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
            line-height: 1.6; 
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .email-container {
            background: white;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 20px;
            margin-bottom: 24px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4f46e5;
            margin-bottom: 8px;
        }
        .badge {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 8px;
        }
        .content {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
        }
        .user-message {
            background: #e0e7ff;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #4f46e5;
            margin: 16px 0;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin: 20px 0;
        }
        .info-item {
            background: #f1f5f9;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
        }
        .info-label {
            font-weight: 600;
            color: #64748b;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .footer {
            text-align: center;
            margin-top: 32px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 16px 0;
        }
        .signature {
            color: #4f46e5;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">Mind That Seeks Truth</div>
            <div class="badge">New Support Request</div>
        </div>
        
        <h2 style="color: #1e293b; margin-bottom: 8px;">You have a new message</h2>
        <p style="color: #64748b; margin-bottom: 24px;">A user has submitted a query through the website chatbot.</p>
        
        <div class="content">
            <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">User's Message:</div>
            <div class="user-message">
                ${userMessage}
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">User Email</div>
                <div style="color: #1e293b; font-weight: 500;">${userEmail}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Submitted</div>
                <div style="color: #1e293b; font-weight: 500;">${new Date().toLocaleString()}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Source</div>
                <div style="color: #1e293b; font-weight: 500;">Website Chatbot</div>
            </div>
            <div class="info-item">
                <div class="info-label">Priority</div>
                <div style="color: #059669; font-weight: 500;">● Normal</div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <a href="mailto:${userEmail}" class="button">Reply to User</a>
        </div>
        
        <div class="footer">
            <p>This email was automatically generated by the Mind That Seeks Truth support system.</p>
            <p>Please do not reply to this email. Use the button above to respond directly to the user.</p>
            <p style="margin-top: 16px;">
                <span class="signature">Best regards,</span><br>
                Mind That Seeks Truth Team<br>
                Powered by <a href="https://anziandco.com" style="color: #4f46e5;">Anzi & Co</a>
            </p>
        </div>
    </div>
</body>
</html>
          `,
        }),
      });

      if (res.ok) {
        const successResponse = {
          from: "bot", 
          text: "✅ Perfect! We've received your message and will get back to you within 24 hours. Is there anything else we can help with?",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, successResponse]);
        setStep("done");
      } else {
        const errorResponse = {
          from: "bot", 
          text: "❌ We're experiencing technical difficulties. Please try again in a few moments.",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, errorResponse]);
      }
    } catch (err) {
      console.error(err);
      const errorResponse = {
        from: "bot", 
        text: "❌ Sorry, something went wrong. Please try again later.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Button with Animation */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:rotate-12"
        >
          <MessageCircle size={28} />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse">
            💬
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border-0 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <p className="font-bold text-lg">Support Assistant</p>
                <p className="text-xs opacity-90 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Online • Usually replies in minutes
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.from === "bot" 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600" 
                    : "bg-gradient-to-r from-green-500 to-emerald-600"
                }`}>
                  {msg.from === "bot" ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm relative ${
                  msg.from === "bot"
                    ? "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-tr-none"
                }`}>
                  <div className="text-sm leading-relaxed">{msg.text}</div>
                  
                  {/* Email Choice Buttons */}
                  {msg.showEmailOptions && previousEmail && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-600 mb-2">Previous email: {previousEmail}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEmailChoice("previous")}
                          className="flex-1 bg-green-500 text-white text-xs py-2 px-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <Check size={14} />
                          Use Previous
                        </button>
                        <button
                          onClick={() => handleEmailChoice("new")}
                          className="flex-1 bg-blue-500 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <Mail size={14} />
                          New Email
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className={`text-xs mt-2 opacity-70 ${
                    msg.from === "bot" ? "text-gray-500" : "text-blue-100"
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Loader2 className="animate-spin" size={16} />
                    Sending your message...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Only show when not showing email options */}
          {step !== "askEmailChoice" && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      step === "askMessage"
                        ? "Type your message here..."
                        : step === "askEmail"
                        ? "Enter your email address..."
                        : "Type 'yes' to ask another question or 'no' to end..."
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleUserSend()}
                    disabled={loading}
                  />
                  {step === "askEmail" && (
                    <Mail size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  )}
                </div>
                <button
                  onClick={handleUserSend}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Your conversations are secure and private
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}