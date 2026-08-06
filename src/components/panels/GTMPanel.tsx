import type { GTM } from '../../types'
import { Card, CardTitle, Tag, BodyList, BodyText } from '../ui'

export default function GTMPanel({ data }: { data: GTM }) {
  return (
    <>
      <Card><CardTitle icon="🚀" bg="rgba(99,102,241,0.15)">Launch Strategy</CardTitle><BodyText>{data.launchStrategy}</BodyText></Card>
      <Card><CardTitle icon="📣" bg="rgba(20,184,166,0.15)">Acquisition Channels</CardTitle>{(data.channels||[]).map(ch=><div key={ch.name} style={{marginBottom:'1rem'}}><div style={{fontWeight:600,color:'var(--white)',marginBottom:'.3rem'}}>{ch.name} <Tag color={ch.priority==='Primary'?'green':'gold'}>{ch.priority}</Tag></div><BodyText>{ch.description}</BodyText></div>)}</Card>
      <Card><CardTitle icon="🤝" bg="rgba(245,158,11,0.15)">Partnerships and Growth</CardTitle><BodyList items={data.partnerships||[]}/></Card>
      <Card><CardTitle icon="📅" bg="rgba(16,185,129,0.15)">First 90-Day Action Plan</CardTitle><BodyList items={data.actionPlan||[]}/></Card>
    </>
  )
}
