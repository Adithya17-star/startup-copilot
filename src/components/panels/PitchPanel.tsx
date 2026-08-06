import type { Pitch } from "../../types"
import { Card, CardTitle, Tag, ProgressRow, BodyText, BodyList } from "../ui"

export default function PitchPanel({ data }: { data: Pitch }) {
  const score = data.viabilityScore || 75
  const dash = 283 - (283 * score / 100)
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1.5rem",flexWrap:"wrap",padding:"1.5rem",marginBottom:"1.25rem",background:"var(--card)",border:"1px solid var(--border)",borderRadius:16}}>
        <div style={{position:"relative",width:100,height:100}}>
          <svg viewBox="0 0 100 100" width="100" height="100" style={{transform:"rotate(-90deg)"}}>
            <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#14B8A6"/></linearGradient></defs>
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="var(--border)"/>
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="url(#sg)" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={dash} style={{transition:"stroke-dashoffset 1s ease"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontFamily:"var(--font-display)",fontSize:"1.6rem",fontWeight:700}}>{score}</span>
            <span style={{fontSize:".65rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em"}}>Score</span>
          </div>
        </div>
        <div style={{flex:1,minWidth:200}}>
          {(data.scoreBreakdown||[]).map(s=><ProgressRow key={s.label} label={s.label} value={s.value + "%"} pct={s.value}/>)}
        </div>
      </div>
      <Card><CardTitle icon="🎯" bg="rgba(99,102,241,0.15)">One-Line Pitch</CardTitle><p style={{fontSize:"1.1rem",color:"var(--white)",fontWeight:500,lineHeight:1.6}}>"{data.oneLiner}"</p></Card>
      <Card><CardTitle icon="💡" bg="rgba(20,184,166,0.15)">Problem and Solution</CardTitle><h3 style={{fontFamily:"var(--font-display)",fontSize:"1rem",fontWeight:600,color:"var(--white)",marginBottom:".6rem"}}>The Problem</h3><BodyText>{data.problem}</BodyText><h3 style={{fontFamily:"var(--font-display)",fontSize:"1rem",fontWeight:600,color:"var(--white)",margin:"1.25rem 0 .6rem"}}>Our Solution</h3><BodyText>{data.solution}</BodyText></Card>
      <Card><CardTitle icon="⭐" bg="rgba(245,158,11,0.15)">Unique Value Proposition</CardTitle><BodyText>{data.uvp}</BodyText><div style={{marginTop:"1rem"}}>{(data.differentiators||[]).map(d=><Tag key={d} color="green">{d}</Tag>)}</div></Card>
      <Card><CardTitle icon="⚠️" bg="rgba(244,63,94,0.15)">Key Risks</CardTitle><BodyList items={data.risks||[]}/></Card>
    </>
  )
}
