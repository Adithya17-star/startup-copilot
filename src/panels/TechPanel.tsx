import type { Tech } from '../../types'
import { Card, CardTitle, Tag, BodyList, BodyText, SectionH3 } from '../ui'

export default function TechPanel({ data }: { data: Tech }) {
  return (
    <>
      <Card>
        <CardTitle icon="💻" bg="rgba(99,102,241,0.15)">Recommended Tech Stack</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1rem' }}>
          {(data.stack || []).map(s => (
            <div key={s.role} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem 1.2rem' }}>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.07em', color: '#14B8A6', fontWeight: 600, marginBottom: '.4rem' }}>{s.role}</div>
              <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: '.95rem' }}>{s.tech}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.3rem', lineHeight: 1.5 }}>{s.reason}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle icon="🏗️" bg="rgba(20,184,166,0.15)">Architecture Overview</CardTitle>
        <BodyText>{data.architecture}</BodyText>
        <SectionH3>MVP Build Timeline</SectionH3>
        <BodyText>{data.mvpTimeline}</BodyText>
      </Card>
      <Card>
        <CardTitle icon="⚡" bg="rgba(245,158,11,0.15)">Key Technical Challenges</CardTitle>
        <BodyList items={data.challenges || []} />
      </Card>
      <Card>
        <CardTitle icon="🔧" bg="rgba(16,185,129,0.15)">Third-Party Services</CardTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
          {(data.services || []).map(s => <Tag key={s}>{s}</Tag>)}
        </div>
      </Card>
    </>
  )
}