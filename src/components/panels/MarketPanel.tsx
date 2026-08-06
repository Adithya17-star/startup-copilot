import type { Market } from '../../types'
import { Card, CardTitle, Tag, MetricGrid, BodyList, BodyText } from '../ui'

export default function MarketPanel({ data }: { data: Market }) {
  return (
    <>
      <MetricGrid items={data.metrics||[]}/>
      <Card><CardTitle icon="🎯" bg="rgba(99,102,241,0.15)">Target Segments</CardTitle>{(data.segments||[]).map(s=><div key={s.name} style={{marginBottom:'1rem'}}><div style={{fontWeight:600,color:'var(--white)',marginBottom:'.4rem'}}>{s.name} <Tag>{s.size}</Tag></div><BodyText>{s.description}</BodyText></div>)}</Card>
      <Card><CardTitle icon="🏆" bg="rgba(20,184,166,0.15)">Competitive Landscape</CardTitle><BodyText>{data.competitiveSummary}</BodyText><div style={{marginTop:'1rem'}}>{(data.competitors||[]).map(c=><div key={c.name} style={{padding:'.75rem',border:'1px solid var(--border)',borderRadius:10,marginBottom:'.75rem'}}><div style={{fontWeight:600,color:'var(--white)',marginBottom:'.4rem'}}>{c.name} <Tag color={c.threat==='High'?'red':c.threat==='Medium'?'gold':'green'}>{c.threat} threat</Tag></div><BodyText>{c.weakness}</BodyText></div>)}</div></Card>
      <Card><CardTitle icon="📈" bg="rgba(245,158,11,0.15)">Market Trends</CardTitle><BodyList items={data.trends||[]}/></Card>
    </>
  )
}
