import { useState } from 'react'

const EXAMPLES = [
  'AI fitness coach that builds personalized workout plans',
  'On-demand home repair marketplace connecting homeowners and tradespeople',
  'B2B SaaS for restaurant inventory management and waste reduction',
  'Sustainable fashion resale platform with AI style matching',
  'Mental wellness app with AI therapy tools for students',
]

interface HeroProps {
  onLaunch: (idea: string) => void
  error: string
}

export default function Hero({ onLaunch, error }: HeroProps) {
  const [idea, setIdea] = useState('')

  function handleLaunch() {
    if (idea.trim()) onLaunch(idea.trim())
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleLaunch()
  }

  return (
    <section style={{
      position: 'relative', zIndex: 1,
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '7rem 1.5rem 4rem',
      textAlign: 'center',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%, -60%)',
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(10,14,26,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
          background: 'linear-gradient(135deg, #6366F1, #14B8A6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>⚡ Startup Copilot</span>
        <span style={{
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.3)',
          color: '#6366F1', padding: '.35rem .9rem', borderRadius: 99,
          fontSize: '.75rem', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase',
        }}>AI Powered</span>
      </nav>

      {/* Eyebrow */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '.5rem',
        background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)',
        color: '#14B8A6', padding: '.4rem 1rem', borderRadius: 99,
        fontSize: '.8rem', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
        marginBottom: '1.75rem',
      }}>
        <span className="animate-pulse-dot">●</span> AI Powered
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
        fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em',
        marginBottom: '1.25rem',
      }}>
        Turn your idea into a<br />
        <span style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>complete startup blueprint</span>
      </h1>

      <p style={{
        fontSize: '1.15rem', color: 'var(--light)', maxWidth: 560,
        lineHeight: 1.7, marginBottom: '3rem',
      }}>
        Type your startup idea below. Get a full business plan, pitch deck, tech stack,
        roadmap, financial model, and a live landing page — in seconds.
      </p>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.3)',
          borderRadius: 12, padding: '1rem 1.25rem', color: '#FDA4AF',
          fontSize: '.9rem', marginBottom: '1.5rem', maxWidth: 600, textAlign: 'left',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Input box */}
      <div style={{
        width: '100%', maxWidth: 740,
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '1.25rem', position: 'relative', zIndex: 2,
        boxShadow: '0 0 60px rgba(99,102,241,0.1)',
      }}>
        <textarea
          value={idea}
          onChange={e => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={2000}
          placeholder='Describe your startup idea... e.g. "An AI-powered app that matches remote workers with coworking spaces based on their work style, budget, and location preferences."'
          style={{
            width: '100%', minHeight: 120,
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--white)', fontFamily: 'var(--font-body)',
            fontSize: '1rem', lineHeight: 1.7, resize: 'none',
          }}
        />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '.75rem',
        }}>
          <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
            {idea.length} / 2000 · Cmd+Enter to submit
          </span>
          <button
            onClick={handleLaunch}
            disabled={!idea.trim()}
            style={{
              display: 'flex', alignItems: 'center', gap: '.6rem',
              background: idea.trim()
                ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                : 'rgba(99,102,241,0.3)',
              color: '#fff', border: 'none',
              cursor: idea.trim() ? 'pointer' : 'not-allowed',
              padding: '.75rem 1.75rem', borderRadius: 12,
              fontFamily: 'var(--font-display)', fontSize: '.95rem', fontWeight: 600,
              transition: 'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => idea.trim() && ((e.target as HTMLElement).style.transform = 'translateY(-2px)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.transform = '')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Generate Blueprint
          </button>
        </div>
      </div>

      {/* Example chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'center', marginTop: '1.5rem', zIndex: 2, position: 'relative' }}>
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            onClick={() => setIdea(ex)}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              color: 'var(--light)', padding: '.4rem .9rem', borderRadius: 99,
              fontSize: '.8rem', cursor: 'pointer', transition: 'all .2s',
            }}
            onMouseEnter={e => {
              const t = e.target as HTMLElement
              t.style.background = 'rgba(99,102,241,0.12)'
              t.style.borderColor = 'rgba(99,102,241,0.4)'
              t.style.color = 'var(--white)'
            }}
            onMouseLeave={e => {
              const t = e.target as HTMLElement
              t.style.background = 'rgba(255,255,255,0.04)'
              t.style.borderColor = 'var(--border)'
              t.style.color = 'var(--light)'
            }}
          >
            {ex}
          </button>
        ))}
      </div>
    </section>
  )
}
