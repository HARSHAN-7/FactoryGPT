'use client';

import React, { useState } from 'react';
import { 
  Send, Cpu, RefreshCw, Copy, Check, FileText, 
  AlertCircle, Languages, Mic, Volume2, VolumeX, Square
} from 'lucide-react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatTopBar } from '@/components/chat/ChatTopBar';
import { SuggestedPrompts } from '@/components/chat/SuggestedPrompts';
import { VoiceControlModal } from '@/components/chat/VoiceControlModal';
import { INITIAL_CONVERSATIONS, MOCK_CHAT_MESSAGES } from '@/lib/mock-data';
import { ChatMessage, ChatConversation, ChatCitation } from '@/lib/types';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n/language-detector';
import { speakText, stopSpeechSynthesis } from '@/lib/voice/speech-service';

interface ExtendedChatMessage extends ChatMessage {
  language?: SupportedLanguage;
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv-01');
  const [messagesMap, setMessagesMap] = useState<Record<string, ExtendedChatMessage[]>>(MOCK_CHAT_MESSAGES as any);
  
  const [inputText, setInputText] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [speakerEnabled, setSpeakerEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [selectedCitation, setSelectedCitation] = useState<ChatCitation | null>(null);

  const activeMessages = messagesMap[activeConvId] || [];

  const handleNewChat = () => {
    stopSpeechSynthesis();
    setIsSpeaking(false);
    const newId = `conv-${Date.now()}`;
    const newConv: ChatConversation = {
      id: newId,
      title: 'New Factory Query Thread',
      updatedAt: 'Just now',
      category: 'General',
      messageCount: 0,
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setMessagesMap({ ...messagesMap, [newId]: [] });
  };

  const handleSendMessage = async (textToSend?: string, overrideLang?: SupportedLanguage) => {
    const query = textToSend || inputText;
    if (!query.trim() || isGenerating) return;

    stopSpeechSynthesis();
    setIsSpeaking(false);
    setErrorMsg(null);

    const userMsg: ExtendedChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...activeMessages, userMsg];
    setMessagesMap((prev) => ({ ...prev, [activeConvId]: updatedMessages }));
    setInputText('');
    setIsGenerating(true);

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId && (c.title.includes('New Factory Query') || c.messageCount === 0)) {
          return { ...c, title: query.slice(0, 35) + '...', messageCount: updatedMessages.length };
        }
        return c;
      })
    );

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationId: activeConvId,
          language: overrideLang || selectedLanguage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process RAG query');
      }

      const assistantMsg: ExtendedChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        sender: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        language: data.language || 'en',
      };

      setMessagesMap((prev) => ({
        ...prev,
        [activeConvId]: [...(prev[activeConvId] || []), assistantMsg],
      }));

      // Speak answer aloud if speaker is enabled
      if (speakerEnabled) {
        setIsSpeaking(true);
        speakText(data.answer, data.language || 'en', () => {
          setIsSpeaking(false);
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'RAG Pipeline query failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleToggleSpeaker = () => {
    if (isSpeaking) {
      stopSpeechSynthesis();
      setIsSpeaking(false);
    }
    setSpeakerEnabled(!speakerEnabled);
  };

  const getLanguageLabel = (langCode?: SupportedLanguage) => {
    if (!langCode || !SUPPORTED_LANGUAGES[langCode]) return 'EN';
    return SUPPORTED_LANGUAGES[langCode].nativeName;
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-amber-500 selection:text-white">
      {/* Left Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConvId={activeConvId}
        onSelectConv={setActiveConvId}
        onNewChat={handleNewChat}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
        {/* Header Bar */}
        <ChatTopBar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={(lang: any) => setSelectedLanguage(lang)}
        />

        {/* Voice Banner */}
        <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-amber-900">
          <div className="flex items-center gap-2">
            <Mic className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>VOICE ASSISTANT ACTIVE — STT & TTS Ready</span>
          </div>

          <div className="flex items-center gap-3">
            {isSpeaking && (
              <button
                onClick={() => {
                  stopSpeechSynthesis();
                  setIsSpeaking(false);
                }}
                className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Stop Audio</span>
              </button>
            )}
            <button
              onClick={handleToggleSpeaker}
              className="flex items-center gap-1 text-amber-800 hover:text-slate-900"
              title={speakerEnabled ? 'Speaker Audio Output Enabled' : 'Speaker Audio Output Muted'}
            >
              {speakerEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline-block">{speakerEnabled ? 'Audio ON' : 'Audio OFF'}</span>
            </button>
          </div>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeMessages.length === 0 ? (
            <SuggestedPrompts onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-sm ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Assistant Avatar */}
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-amber-500 border border-amber-600 flex items-center justify-center text-slate-950 shrink-0 mt-0.5 shadow-sm font-bold">
                      <Cpu className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-4 space-y-3 shadow-sm relative group ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 rounded-br-none font-medium'
                        : 'bg-white border border-slate-200 text-slate-900 rounded-bl-none'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-2 text-[11px] font-mono text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">
                          {msg.sender === 'user' ? 'OPERATOR (YOU)' : 'FACTORYGPT ASSISTANT'}
                        </span>
                        {msg.sender === 'assistant' && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-700 font-mono font-bold">
                            {getLanguageLabel(msg.language)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'assistant' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setIsSpeaking(true);
                                speakText(msg.content, msg.language || 'en', () => setIsSpeaking(false));
                              }}
                              title="Listen to response"
                              className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCopyText(msg.id, msg.content)}
                              title="Copy Answer"
                              className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                            >
                              {copiedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-xs max-w-none text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                      {msg.content}
                    </div>

                    {/* Source Citations */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-3 border-t border-slate-200/80 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-bold">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Original Manual Citations ({msg.citations.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.citations.map((c, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedCitation(c)}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 text-[11px] font-mono text-slate-700 hover:border-amber-500 hover:text-slate-950 transition-colors"
                            >
                              <span className="text-emerald-700 font-bold">[{idx + 1}]</span>
                              <span>{c.documentName}</span>
                              <span className="text-slate-500">({c.pageOrSection})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-amber-600 text-slate-950 font-mono font-bold text-xs shrink-0 mt-0.5 shadow-sm flex items-center justify-center">
                      YOU
                    </div>
                  )}
                </div>
              ))}

              {/* Generating Loading State */}
              {isGenerating && (
                <div className="flex gap-3 items-center text-xs font-mono text-slate-600 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <div className="w-6 h-6 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span>RAG Engine searching vector database & generating answer...</span>
                </div>
              )}

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs font-mono text-red-700 rounded flex items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleSendMessage(activeMessages[activeMessages.length - 1]?.content)}>
                    Retry
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-slate-50 border border-slate-300 rounded-lg shadow-xs focus-within:border-amber-500 transition-colors"
            >
              <button
                type="button"
                onClick={() => setIsVoiceModalOpen(true)}
                className="pl-3 pr-2 text-slate-500 hover:text-amber-600 transition-colors"
                title="Voice Input (Speech-to-Text)"
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Ask in English, தமிழ் (Tamil), or हिन्दी (Hindi)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-sans"
              />

              <div className="flex items-center gap-2 pr-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!inputText.trim() || isGenerating}
                  icon={<Send className="w-4 h-4" />}
                  className="font-mono text-xs uppercase tracking-wider bg-amber-500 text-slate-950 font-bold"
                >
                  Query
                </Button>
              </div>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <Mic className="w-3 h-3 text-amber-600" />
                Voice Assistant Active
              </span>
              <span>English | தமிழ் | हिन्दी</span>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Control Modal */}
      <VoiceControlModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSendQuery={(query, lang) => {
          setInputText('');
          handleSendMessage(query, lang);
        }}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Citation Inspector Modal */}
      {selectedCitation && (
        <Dialog
          isOpen={Boolean(selectedCitation)}
          onClose={() => setSelectedCitation(null)}
          title={`Document Source Inspector`}
          description={`Original Document Reference Metadata`}
        >
          <div className="space-y-4 text-xs font-mono text-slate-700">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div>Source File: <span className="text-slate-900 font-bold">{selectedCitation.documentName}</span></div>
              <div>Page / Section: <span className="text-emerald-700 font-bold">{selectedCitation.pageOrSection}</span></div>
              <div>Relevance Score: <span className="text-amber-600 font-bold">{(selectedCitation.relevanceScore * 100).toFixed(1)}%</span></div>
            </div>

            <Button variant="secondary" onClick={() => setSelectedCitation(null)} className="w-full">
              Close Inspector
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
