'use client'

import { useState } from 'react'

export default function ChatPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    language: '',
    target: '',
    purpose: ''
  })
  const [feedback, setFeedback] = useState('')

  const next = () => setStep(step + 1)

  return (
    <main style={{padding:'40px',maxWidth:'800px',margin:'0 auto'}}>
      <h1>Borderless AI Assistant</h1>

      {step === 0 && (
        <div>
          <p>What language do you speak?</p>
          <input
            value={answers.language}
            onChange={(e)=>setAnswers({...answers,language:e.target.value})}
          />
          <button onClick={next}>Next</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p>What language do you need help with?</p>
          <input
            value={answers.target}
            onChange={(e)=>setAnswers({...answers,target:e.target.value})}
          />
          <button onClick={next}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>What is your situation?</p>
          <select
            onChange={(e)=>setAnswers({...answers,purpose:e.target.value})}
          >
            <option value="">Choose</option>
            <option>Travel</option>
            <option>School</option>
            <option>Work</option>
            <option>Daily Life</option>
          </select>
          <button onClick={next}>Generate</button>
        </div>
      )}

      {step >= 3 && (
        <div>
          <h2>Recommendation</h2>
          <p>
            Based on your answers, Borderless AI recommends
            language support for {answers.purpose}.
          </p>

          <h3>Guardrail Example</h3>
          <p>
            Borderless AI cannot provide legal or medical advice.
            Please consult a qualified professional when needed.
          </p>

          <h3>Human Checkpoint</h3>
          <p>
            If your case is complex, a human review is recommended.
          </p>

          <h3>Feedback</h3>
          <button onClick={()=>setFeedback('👍 Helpful')}>
            👍 Helpful
          </button>

          <button onClick={()=>setFeedback('👎 Not Helpful')}>
            👎 Not Helpful
          </button>

          <p>{feedback}</p>
        </div>
      )}
    </main>
  )
}
