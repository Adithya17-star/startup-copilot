import type { Roadmap } from '../../types'
import { Card, CardTitle, Tag, BodyList, BodyText } from '../ui'

export default function RoadmapPanel({ data }: { data: Roadmap }) {
  return (
    <>
      <Card><CardTitle icon="🗺️" bg="rgba(99,102,241,0.15)">Execution Roadmap</CardTitle><div style={{position:'relative',paddingLeft:'2rem'}}><div style={{position:'absolute',left:'.55rem',top:0,bottom:0,width:2,background:'linear-gradient(to bottom, #6366F1, #14B8A6)',borderRadius:2}}/>{(data.phases||[]).map((ph,i)=><div key={i} style={{position:'relative',marginBottom:'1.75rem'}}><div style={{position:'absolute',left:'-2rem',top:'.2rem',width:14,height:14,borderRadius:'50%',background:'var(--card)',border:'2px solid #6366F1',boxShadow:'0 0 10px rgba(99,102,241,0.4)'}}/><div style={{fontSize:'.78rem',fontWeight:600,color:'#14B8A6',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:'.3rem'}}>{ph.phase} · {ph.timeline}</div><div style={{fontSize:'1rem',fontWeight:600,color:'var(--white)',marginBottom:'.4rem'}}>{ph.title}</div><BodyText>{ph.description}</BodyText><div style={{marginTop:'.6rem'}}>{(ph.milestones||[]).map(m=><Tag key={m}>{m}</Tag>)}</div></div>)}</div></Card>
      <Card><CardTitle icon="👥" bg="rgba(20,184,166,0.15)">Team to Build</CardTitle><BodyList items={data.team||[]}/></Card>
      <Card><CardTitle icon="💰" bg="rgba(245,158,11,0.15)">Funding Requirements</CardTitle><BodyText>{data.funding}</BodyText></Card>
    </>
  )
}
