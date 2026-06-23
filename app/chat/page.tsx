'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
// Storage helper — saves to localStorage, no backend needed
const storage = {
  saveFeedback(data: Record<string, unknown>) {
    try {
      const existing = JSON.parse(localStorage.getItem('bai_feedback') || '[]')
      existing.push({ ...data, created_at: new Date().toISOString() })
      localStorage.setItem('bai_feedback', JSON.stringify(existing))
    } catch { /* silent fail */ }
  },
  saveChatLog(data: Record<string, unknown>) {
    try {
      const existing = JSON.parse(localStorage.getItem('bai_chat_logs') || '[]')
      existing.push({ ...data, created_at: new Date().toISOString() })
      localStorage.setItem('bai_chat_logs', JSON.stringify(existing))
    } catch { /* silent fail */ }
  },
}

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
interface IntakeData {
  country: string
  workType: string
  goal: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  type?: 'guardrail' | 'response'
  needsCheckpoint?: boolean
  feedback?: 'up' | 'down' | null
}

interface HistoryItem {
  role: 'user' | 'assistant'
  content: string
}

// ─────────────────────────────────────────────
//  INTAKE FLOW
// ─────────────────────────────────────────────
function IntakeFlow({ onComplete }: { onComplete: (data: IntakeData) => void }) {
  const [step, setStep] = useState(0)
  const [country, setCountry] = useState('')
  const [workType, setWorkType] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 0) inputRef.current?.focus()
  }, [step])

  const handleCountry = () => {
    if (country.trim().length > 0) setStep(1)
  }

  const handleWorkType = (val: string) => {
    setWorkType(val)
    setStep(2)
  }

  const handleGoal = (val: string) => {
    setTimeout(() => onComplete({ country: country.trim(), workType, goal: val }), 300)
  }

  const steps = ['Where you live', 'Work situation', 'Your goal']

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        gap: '32px',
      }}
    >
      {/* Progress */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#a78bfa',
            marginBottom: '16px',
          }}
        >
          Help us personalize your advice — 3 quick questions
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
          {steps.map((label, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  height: '3px',
                  width: '72px',
                  borderRadius: '2px',
                  background: i <= step ? 'linear-gradient(90deg,#7c3aed,#06b6d4)' : 'rgba(255,255,255,0.08)',
                  transition: 'background 0.4s',
                }}
              />
              <span style={{ fontSize: '10px', color: i <= step ? '#a78bfa' : 'rgba(255,255,255,0.2)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
          {step + 1} / 3
        </div>
      </div>

      {/* Cards */}
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {step === 0 && (
          <div className="intake-card">
            <div className="intake-q-label">Question 1 of 3</div>
            <div className="intake-q-text">Where do you currently live?</div>
            <input
              ref={inputRef}
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCountry()}
              placeholder="e.g. Mexico City, Mexico"
              className="intake-text-input"
            />
            <button
              onClick={handleCountry}
              disabled={!country.trim()}
              className="intake-primary-btn"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="intake-card">
            <div className="intake-q-label">Question 2 of 3</div>
            <div className="intake-q-text">What is your work situation?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Remote Employee', 'Freelancer', 'Founder / Entrepreneur'].map(opt => (
                <button key={opt} onClick={() => handleWorkType(opt)} className="intake-option-btn">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="intake-card">
            <div className="intake-q-label">Question 3 of 3</div>
            <div className="intake-q-text">What is your main goal?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Find the right visa', 'Optimize my taxes', 'Plan my relocation', 'All of the above'].map(opt => (
                <button key={opt} onClick={() => handleGoal(opt)} className="intake-option-btn">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  SINGLE MESSAGE
// ─────────────────────────────────────────────
function ChatMessage({
  msg,
  onFeedback,
}: {
  msg: Message
  onFeedback: (id: string, val: 'up' | 'down') => void
}) {
  const isUser = msg.role === 'user'
  const isGuardrail = msg.type === 'guardrail'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: '10px',
        alignItems: 'flex-end',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
          background: isUser
            ? 'rgba(139,92,246,0.25)'
            : 'linear-gradient(135deg,#7c3aed,#06b6d4)',
          border: isUser ? '1px solid rgba(139,92,246,0.45)' : 'none',
          color: '#fff',
        }}
      >
        {isUser ? 'You' : 'B'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '78%' }}>
        {/* Bubble */}
        <div
          className={
            isUser
              ? 'msg-user'
              : isGuardrail
              ? 'msg-guardrail'
              : 'msg-ai'
          }
        >
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.65', whiteSpace: 'pre-wrap' }}>
            {msg.content}
          </p>
        </div>

        {/* Human Checkpoint */}
        {msg.needsCheckpoint && (
          <div className="checkpoint-card">
            <span style={{ fontSize: '18px' }}>👤</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#fcd34d' }}>
                Human advisor recommended
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(252,211,77,0.65)', marginTop: '2px' }}>
                For this level of complexity, a licensed professional can help you avoid costly mistakes.
              </div>
            </div>
            <a
              href="mailto:advisors@borderless-ai.com?subject=I need a human advisor"
              className="checkpoint-btn"
            >
              Connect →
            </a>
          </div>
        )}

        {/* Feedback */}
        {msg.role === 'assistant' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '2px' }}>
            <button
              onClick={() => onFeedback(msg.id, 'up')}
              className={`fb-btn${msg.feedback === 'up' ? ' fb-active' : ''}`}
              aria-label="Helpful"
            >
              👍
            </button>
            <button
              onClick={() => onFeedback(msg.id, 'down')}
              className={`fb-btn${msg.feedback === 'down' ? ' fb-active' : ''}`}
              aria-label="Not helpful"
            >
              👎
            </button>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
              Was this helpful?
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  TYPING INDICATOR
// ─────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0,
        }}
      >
        B
      </div>
      <div className="msg-ai" style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '14px 16px' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#a78bfa',
              animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────
export default function ChatPage() {
  const [intakeDone, setIntakeDone] = useState(false)
  const [intakeData, setIntakeData] = useState<IntakeData>({ country: '', workType: '', goal: '' })
  const [messages, setMessages] = useState<Message[]>([])
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const msgCountRef = useRef(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleIntakeComplete = (data: IntakeData) => {
    setIntakeData(data)
    setIntakeDone(true)
    const welcome: Message = {
      id: 'welcome-' + Date.now(),
      role: 'assistant',
      content: `Welcome! 🌍 I'm your Borderless AI advisor.\n\nYou're a ${data.workType.toLowerCase()} based in ${data.country}, and you want to ${data.goal.toLowerCase()}. I've got you.\n\nI can help you find the right visa, understand tax residency rules, compare countries, and plan your move — all in plain language, no legal jargon.\n\nWhat's your first question?`,
      type: 'response',
      feedback: null,
    }
    setMessages([welcome])
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  const saveToSupabase = useCallback(
    async (allMessages: Message[], data: IntakeData) => {
      try {
        storage.saveChatLog({
          session_messages: allMessages,
          intake_context: data,
        })
      } catch (e) {
        console.warn('chat_logs save failed:', e)
      }
    },
    []
  )

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const text = input.trim()
    const userMsg: Message = {
      id: 'u-' + Date.now(),
      role: 'user',
      content: text,
    }

    const nextHistory: HistoryItem[] = [
      ...history,
      { role: 'user', content: text },
    ]

    setMessages(prev => [...prev, userMsg])
    setHistory(nextHistory)
    setInput('')
    setIsLoading(true)
    msgCountRef.current += 1

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          intakeContext: intakeData,
          history: nextHistory.slice(-10),
        }),
      })

      const data = await res.json()

      const assistantMsg: Message = {
        id: 'a-' + Date.now(),
        role: 'assistant',
        content: res.ok
          ? data.response
          : data.error || 'Something went wrong. Please try again.',
        type: res.ok ? data.type : 'response',
        needsCheckpoint: res.ok ? data.needsCheckpoint : false,
        feedback: null,
      }

      const updatedMessages = (prev: Message[]) => [...prev, assistantMsg]
      setMessages(prev => {
        const next = [...prev, assistantMsg]
        // Save chat log every 5 assistant messages
        if (msgCountRef.current % 5 === 0) {
          saveToSupabase(next, intakeData)
        }
        return next
      })

      if (res.ok) {
        setHistory(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: 'Connection error. Please check your internet and try again.',
          type: 'response',
          feedback: null,
        },
      ])
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleFeedback = async (id: string, val: 'up' | 'down') => {
    // Optimistic update
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, feedback: val } : m))
    )

    const allMsgs = messages
    const idx = allMsgs.findIndex(m => m.id === id)
    const aiMsg = allMsgs[idx]
    const userMsg = allMsgs[idx - 1]

    try {
      storage.saveFeedback({
        message: userMsg?.content || '',
        response: aiMsg?.content || '',
        rating: val,
        intake_context: intakeData,
      })
    } catch (e) {
      console.warn('Feedback save failed:', e)
    }
  }

  return (
    <>
      <style>{`
        .intake-card {
          background: rgba(139,92,246,0.07);
          border: 1px solid rgba(139,92,246,0.28);
          border-radius: 18px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          backdrop-filter: blur(16px);
        }
        .intake-q-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
          font-weight: 600;
        }
        .intake-q-text {
          font-size: 18px;
          font-weight: 600;
          color: #f3f0ff;
          line-height: 1.35;
        }
        .intake-text-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(139,92,246,0.35);
          border-radius: 12px;
          padding: 13px 16px;
          color: #e2d9f3;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .intake-text-input:focus { border-color: rgba(139,92,246,0.8); }
        .intake-text-input::placeholder { color: rgba(226,217,243,0.3); }
        .intake-primary-btn {
          background: linear-gradient(135deg,#7c3aed,#06b6d4);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 13px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          font-family: inherit;
        }
        .intake-primary-btn:hover:not(:disabled) { opacity: 0.88; }
        .intake-primary-btn:active:not(:disabled) { transform: scale(0.98); }
        .intake-primary-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .intake-option-btn {
          background: rgba(139,92,246,0.09);
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: 12px;
          padding: 14px 18px;
          color: #c4b5fd;
          font-size: 14px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
          font-family: inherit;
        }
        .intake-option-btn:hover {
          background: rgba(139,92,246,0.2);
          border-color: rgba(139,92,246,0.65);
          color: #f3f0ff;
        }
        .msg-ai {
          background: rgba(10,12,28,0.7);
          border: 1px solid rgba(6,182,212,0.22);
          border-left: 2.5px solid rgba(6,182,212,0.65);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 12px 16px;
          color: #e2d9f3;
          backdrop-filter: blur(8px);
        }
        .msg-user {
          background: rgba(139,92,246,0.18);
          border: 1px solid rgba(139,92,246,0.4);
          border-radius: 16px;
          border-bottom-right-radius: 4px;
          padding: 12px 16px;
          color: #f3f0ff;
        }
        .msg-guardrail {
          background: rgba(220,38,38,0.08);
          border: 1px solid rgba(220,38,38,0.35);
          border-left: 2.5px solid rgba(220,38,38,0.7);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 12px 16px;
          color: #fca5a5;
        }
        .checkpoint-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.35);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .checkpoint-btn {
          background: rgba(245,158,11,0.15);
          border: 1px solid rgba(245,158,11,0.4);
          border-radius: 8px;
          color: #fcd34d;
          font-size: 12px;
          padding: 6px 14px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          font-family: inherit;
          font-weight: 500;
        }
        .checkpoint-btn:hover { background: rgba(245,158,11,0.25); }
        .fb-btn {
          font-size: 15px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 4px 10px;
          cursor: pointer;
          transition: all 0.15s;
          color: rgba(255,255,255,0.45);
          line-height: 1;
        }
        .fb-btn:hover { border-color: rgba(139,92,246,0.5); color: #c4b5fd; }
        .fb-active {
          background: rgba(139,92,246,0.2);
          border-color: rgba(139,92,246,0.7);
          color: #a78bfa;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .messages-scroll::-webkit-scrollbar { width: 4px; }
        .messages-scroll::-webkit-scrollbar-track { background: transparent; }
        .messages-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 4px; }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          height: '100vh',
          background: 'linear-gradient(135deg,#0d0f1c 0%,#12102a 45%,#1a0d2e 75%,#0d1528 100%)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-geist-sans), Inter, system-ui, sans-serif',
        }}
      >
        {/* Background orbs */}
        {[
          { w: 360, h: 360, bg: '#7c3aed', top: '-100px', left: '-80px', delay: '0s' },
          { w: 280, h: 280, bg: '#1d4ed8', bottom: '-60px', right: '-60px', delay: '-4s' },
          { w: 220, h: 220, bg: '#06b6d4', top: '38%', right: '8%', delay: '-7s' },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: orb.w,
              height: orb.h,
              borderRadius: '50%',
              background: orb.bg,
              top: (orb as { top?: string }).top,
              bottom: (orb as { bottom?: string }).bottom,
              left: (orb as { left?: string }).left,
              right: (orb as { right?: string }).right,
              filter: 'blur(80px)',
              opacity: 0.13,
              pointerEvents: 'none',
              animation: `orbFloat 10s ease-in-out ${orb.delay} infinite`,
            }}
          />
        ))}

        <style>{`
          @keyframes orbFloat {
            0%,100%{transform:translate(0,0)}
            33%{transform:translate(22px,-22px)}
            66%{transform:translate(-14px,14px)}
          }
          @keyframes statusPulse{0%,100%{opacity:1}50%{opacity:0.3}}
        `}</style>

        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 24px',
            borderBottom: '1px solid rgba(139,92,246,0.18)',
            position: 'relative',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '15px',
              }}
            >
              B
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#e2d9f3', letterSpacing: '0.02em' }}>
              Borderless AI
            </span>
            <span
              style={{
                fontSize: '10px',
                color: '#8b5cf6',
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.32)',
                padding: '2px 9px',
                borderRadius: '20px',
                letterSpacing: '0.06em',
              }}
            >
              BETA
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: '#6ee7b7' }}>
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                animation: 'statusPulse 2s ease-in-out infinite',
              }}
            />
            AI online
          </div>
        </header>

        {/* Main */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {!intakeDone ? (
            <IntakeFlow onComplete={handleIntakeComplete} />
          ) : (
            <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

              {/* ── LEFT PROFILE PANEL ── */}
              <div style={{
                width: '220px',
                flexShrink: 0,
                borderRight: '1px solid rgba(139,92,246,0.18)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 16px',
                gap: '16px',
                overflowY: 'auto',
              }}>
                {/* Avatar + name */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#fff' }}>
                    {intakeData.country.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2d9f3' }}>Tu perfil</div>
                    <div style={{ fontSize: '11px', color: 'rgba(226,217,243,0.4)', marginTop: '2px' }}>Sesión activa</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#6ee7b7' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    En línea
                  </div>
                </div>

                {/* Profile cards */}
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(139,92,246,0.7)', fontWeight: 600 }}>Mis datos</div>

                <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(226,217,243,0.45)', marginBottom: '4px' }}>📍 Ubicación</div>
                  <div style={{ fontSize: '12px', color: '#e2d9f3', fontWeight: 500 }}>{intakeData.country}</div>
                </div>

                <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(226,217,243,0.45)', marginBottom: '4px' }}>💼 Situación</div>
                  <div style={{ fontSize: '12px', color: '#e2d9f3', fontWeight: 500 }}>{intakeData.workType}</div>
                </div>

                <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(226,217,243,0.45)', marginBottom: '4px' }}>🎯 Objetivo</div>
                  <div style={{ fontSize: '12px', color: '#e2d9f3', fontWeight: 500 }}>{intakeData.goal}</div>
                </div>

                {/* Stats */}
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(139,92,246,0.7)', fontWeight: 600, marginTop: '4px' }}>Sesión</div>

                <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#a78bfa' }}>{messages.filter(m => m.role === 'user').length}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(226,217,243,0.4)' }}>Preguntas</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#6ee7b7' }}>{messages.filter(m => m.feedback === 'up').length}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(226,217,243,0.4)' }}>Útiles</div>
                  </div>
                </div>

                {/* Guardrail indicator */}
                <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '10px', padding: '10px 12px', marginTop: 'auto' }}>
                  <div style={{ fontSize: '10px', color: '#fca5a5', fontWeight: 600, marginBottom: '4px' }}>🛡️ Guardarraíles activos</div>
                  <div style={{ fontSize: '10px', color: 'rgba(252,165,165,0.65)', lineHeight: 1.5 }}>Solicitudes fuera de alcance son bloqueadas automáticamente.</div>
                </div>

                {/* Reset button */}
                <button
                  onClick={() => { setIntakeDone(false); setMessages([]); setHistory([]); setInput('') }}
                  style={{ background: 'transparent', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '8px', padding: '7px', fontSize: '11px', color: 'rgba(226,217,243,0.4)', cursor: 'pointer', textAlign: 'center' }}
                >
                  Nueva sesión →
                </button>
              </div>

              {/* ── RIGHT CHAT PANEL ── */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                {/* Messages */}
                <div
                  className="messages-scroll"
                  style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '16px' }}>
                    {messages.map(msg => (
                      <ChatMessage key={msg.id} msg={msg} onFeedback={handleFeedback} />
                    ))}
                    {isLoading && <TypingDots />}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {/* Input bar */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '14px 20px', borderTop: '1px solid rgba(139,92,246,0.15)', flexShrink: 0 }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Ask about visas, taxes, relocation..."
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      background: 'rgba(139,92,246,0.07)',
                      border: '1px solid rgba(139,92,246,0.28)',
                      borderRadius: '24px',
                      padding: '12px 20px',
                      color: '#e2d9f3',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'inherit',
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.7)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(139,92,246,0.28)')}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                    style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: !input.trim() || isLoading ? 'rgba(139,92,246,0.25)' : 'linear-gradient(135deg,#7c3aed,#06b6d4)',
                      border: 'none', color: '#fff', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
                      flexShrink: 0, transition: 'all 0.2s',
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
