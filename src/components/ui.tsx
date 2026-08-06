import type { ReactNode, CSSProperties } from 'react'

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 16, padding: '1.75rem', marginBottom: '1.25rem',
      ...style,
    }}>{children}</div>
  )
}

export function CardTitle({ icon, bg, children }: { icon: string; bg: string; children: ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '.6rem',
      fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600,
      color: 'var(--white)', marginBottom: '1rem',
    }}>
      <span style={{
        width: 32, height: 32, borderRadius: 8, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
        background: bg,
      }}>{icon}</span>
      {children}
    </div>
  )
}

export function Tag({ children, color = 'indigo' }: { children: ReactNode; color?: 'indigo'|'green'|'gold'|'red' }) {
  const colors = {
    indigo: { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.25)', text: '#6366F1' },
    green:  { bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.25)', text: '#10B981' },
    gold:   { bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.25)', text: '#F59E0B' },
    red:    { bg: 'rgba(244,63,94,0.10)',   border: 'rgba(244,63,94,0.25)',  text: '#F43F5E' },
  }
  const c = colors[color]
  return (
    <span style={{
      display: 'inline-block',
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      padding: '.25rem .65rem', borderRadius: 6,
      fontSize: '.78rem', fontWeight: 500, margin: '.2rem .15rem',
    }}>{children}</span>
  )
}

export function MetricGrid({ items }: { items: { label: string; value: string; color?: string }[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '1rem', marginBottom: '1.25rem',
    }}>
      {items.map(m => (
        <div key={m.label} style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '1.25rem', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700,
            color: m.color || '#6366F1',
          }}>{m.value}</div>
          <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.25rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>{m.label}</div>
        </div>
      ))}
    </div>
  )
}

export function ProgressRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div style={{ marginBottom: '.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem', fontSize: '.85rem', color: 'var(--light)' }}>
        <span>{label}</span><span>{value}</span>
      </div>
      <div style={{ height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
        <div className="animate-grow" style={{
          height: '100%', width: `${pct}%`, borderRadius: 99,
          background: 'linear-gradient(90deg, #6366F1, #14B8A6)',
        }} />
      </div>
    </div>
  )
}

export function SectionH3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600,
      color: 'var(--white)', margin: '1.25rem 0 .6rem',
    }}>{children}</h3>
  )
}

export function BodyList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ color: 'var(--light)', lineHeight: 1.75, fontSize: '.95rem' }}>{item}</li>
      ))}
    </ul>
  )
}

export function BodyText({ children }: { children: ReactNode }) {
  return <p style={{ color: 'var(--light)', lineHeight: 1.75, fontSize: '.95rem' }}>{children}</p>
}