import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface AstraVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstraVoiceModal: React.FC<AstraVoiceModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>(
    language === 'sq' ? 'Gati për të nisur bisedën zanore me SHBBSH Live AI' : 'Ready to initiate live voice session'
  );
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopLiveSession();
    }
  }, [isOpen]);

  const startLiveSession = async () => {
    try {
      setStatusText(language === 'sq' ? 'Duke u lidhur me AstraVoice Live (gemini-3.8-live)...' : 'Connecting to AstraVoice Live (gemini-3.8-live)...');
      
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;

      ws.onopen = async () => {
        setIsLiveActive(true);
        setStatusText(language === 'sq' ? 'Audio Live është aktive! Flisni lirisht me asistentin shkencor...' : 'Live Audio Active. Speak naturally to AstraVoice...');

        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processorRef.current = processor;

          source.connect(processor);
          processor.connect(inputCtx.destination);

          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            
            let sum = 0;
            for (let i = 0; i < inputData.length; i++) {
              sum += inputData[i] * inputData[i];
            }
            const rms = Math.sqrt(sum / inputData.length);
            setAudioLevel(Math.min(100, Math.round(rms * 400)));

            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              const s = Math.max(-1, Math.min(1, inputData[i]));
              pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
            }

            const bytes = new Uint8Array(pcm16.buffer);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            const base64Audio = btoa(binary);

            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ audio: base64Audio }));
            }
          };
        } catch (err) {
          console.error('Microphone error:', err);
          setStatusText(language === 'sq' ? 'Kërkohet leje mikrofoni për AstraVoice Live' : 'Microphone access required for AstraVoice Live');
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio && outputAudioCtxRef.current) {
            playRawPcm24k(outputAudioCtxRef.current, data.audio);
          }
        } catch (err) {
          console.error('Audio playback parse error:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket Live Error:', err);
        setStatusText('Gabim gjatë lidhjes me serverin e zërit.');
      };

      ws.onclose = () => {
        setIsLiveActive(false);
        setStatusText('Seanca e zërit përfundoi.');
      };

    } catch (err) {
      console.error('Failed to start Live session:', err);
      setStatusText('Nuk u arrit lidhja me shërbimin e zërit.');
    }
  };

  const playRawPcm24k = (ctx: AudioContext, base64Pcm: string) => {
    try {
      const binary = atob(base64Pcm);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (err) {
      console.error('Error playing 24kHz PCM:', err);
    }
  };

  const stopLiveSession = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsLiveActive(false);
    setAudioLevel(0);
    setStatusText(language === 'sq' ? 'Seanca përfundoi' : 'Session ended');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className={`rounded-2xl border w-full max-w-lg p-6 shadow-2xl space-y-6 relative transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
            theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-cyan-500/40 p-0.5 bg-white shrink-0">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-22_at_20.10.21_541bb7ba.jpeg"
              alt="SHBBSH Emblem"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">AstraVoice Live (SHBBSH)</h3>
            <p className="text-xs font-mono text-cyan-500">Real-time Audio (`gemini-3.8-live`)</p>
          </div>
        </div>

        {/* Visualizer Wave Animation */}
        <div className={`rounded-2xl border p-8 flex flex-col items-center justify-center gap-4 transition-colors ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 h-16">
            {[40, 70, 30, 90, 50, 80, 45, 95, 60].map((h, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-cyan-600 to-teal-400 rounded-full transition-all duration-100"
                style={{
                  height: isLiveActive ? `${Math.max(12, Math.round((h * audioLevel) / 60))}px` : '12px',
                }}
              />
            ))}
          </div>

          <p className="text-xs font-mono text-slate-400 text-center max-w-xs">{statusText}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {!isLiveActive ? (
            <button
              onClick={startLiveSession}
              className="px-6 py-3 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Mic className="w-4 h-4" />
              <span>{language === 'sq' ? 'Lidhu me AstraVoice Live' : 'Connect AstraVoice Live'}</span>
            </button>
          ) : (
            <button
              onClick={stopLiveSession}
              className="px-6 py-3 text-xs font-bold text-rose-200 bg-rose-950 border border-rose-800/80 hover:bg-rose-900 rounded-xl transition-all font-mono flex items-center gap-2"
            >
              <MicOff className="w-4 h-4 text-rose-400" />
              <span>{language === 'sq' ? 'Ndërprit Bisedën' : 'Disconnect Session'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
