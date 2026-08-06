import type { Finance } from '../../types'
import { Card, CardTitle, MetricGrid, ProgressRow, BodyList, BodyText, SectionH3 } from '../ui'

export default function FinancePanel({ data }: { data: Finance }) {
  return (
    <>
      <MetricGrid items={data.metrics||[]}/>
      <Card><CardTitle icon="📊" bg="rgba(99,102,241,0.15)">3-Year Revenue Projection</CardTitle>{(data.projections||[]).map(p=><ProgressRow key={p.year} label={p.year} value={p.revenue} pct={p.pct}/>)}</Card>
      <Card><CardTitle icon="💸" bg="rgba(20,184,166,0.15)">Cost Structure</CardTitle><BodyList items={data.costs||[]}/></Card>
      <Card><CardTitle icon="🎯" bg="rgba(245,158,11,0.15)">Funding Strategy</CardTitle><BodyText>{data.fundingStrategy}</BodyText><SectionH3>Investor Pitch Points</SectionH3><BodyList items={data.pitchPoints||[]}/></Card>
    </>
  )
}
