import type { Product } from '../../types'
import { Card, CardTitle, Tag, BodyList, BodyText, SectionH3 } from '../ui'

export default function ProductPanel({ data }: { data: Product }) {
  return (
    <>
      <Card><CardTitle icon="✨" bg="rgba(99,102,241,0.15)">Core Features</CardTitle>{(data.features||[]).map(f=><div key={f.name} style={{marginBottom:'1rem'}}><div style={{fontWeight:600,color:'var(--white)',marginBottom:'.3rem'}}>{f.name} <Tag color={f.priority==='MVP'?'green':f.priority==='V2'?'gold':'indigo'}>{f.priority}</Tag></div><BodyText>{f.description}</BodyText></div>)}</Card>
      <Card><CardTitle icon="💎" bg="rgba(20,184,166,0.15)">Business Model</CardTitle><SectionH3>Revenue Streams</SectionH3><BodyList items={data.revenueStreams||[]}/><SectionH3>Pricing Strategy</SectionH3><BodyText>{data.pricing}</BodyText></Card>
      <Card><CardTitle icon="🔑" bg="rgba(245,158,11,0.15)">Key Metrics to Track</CardTitle><div style={{display:'flex',flexWrap:'wrap',gap:'.5rem'}}>{(data.kpis||[]).map(k=><Tag key={k}>{k}</Tag>)}</div></Card>
    </>
  )
}
