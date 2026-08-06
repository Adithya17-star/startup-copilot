import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

const STAGES = [
  'Analyzing your idea',
  'Researching market opportunity',
  'Designing product roadmap',
  'Selecting tech stack',
  'Modeling financials',
  'Writing pitch narrative',
  'Generating landing page',
]

const Loading = forwardRef(function Loading(_props, ref) {
  const [current, setCurrent] = useState(0)

  useImperativeHandle(ref, () => ({ advance: () => setCurrent(c => c + 1) }))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c < STAGES.length - 1 ? c + 1 : c))
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', gap: '1.5rem',
      padding: '5rem 1.5rem', textAlign: 'center',
    }}>
      {/* Spinner */}
      <div style={{
        width: 64, height: 64,
        border: '3px solid var(--border)',
        borderTopColor: '#6366F1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600 }}>
        Building your blueprint...
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'flex-start' }}>
        {STAGES.map((stage, i) => (
          <div
            key={stage}
            style={{
              fontSize: '.9rem',
              color: i < current ? '#10B981' : i === current ? '#14B8A6' : 'var(--muted)',
              fontWeight: i === current ? 500 : 400,
              transition: 'color .4s',
            }}
          >
            {i < current ? `✓ ${stage}` : stage}
          </div>
        ))}
      </div>
    </div>
  )
})

export default Loading