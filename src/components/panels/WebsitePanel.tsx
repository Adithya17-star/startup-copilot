interface WebsitePanelProps { html: string }

export default function WebsitePanel({ html }: WebsitePanelProps) {
  function download() {
    const blob = new Blob([html],{type:'text/html'})
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'landing-page.html'
    a.click()
  }
  return (
    <>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:'1.25rem'}}>
        <div style={{background:'rgba(255,255,255,0.03)',borderBottom:'1px solid var(--border)',padding:'.75rem 1.25rem',display:'flex',alignItems:'center',gap:'.75rem'}}>
          <div style={{display:'flex',gap:'.4rem'}}>{['#FF5F56','#FFBD2E','#27C93F'].map(c=><div key={c} style={{width:10,height:10,borderRadius:'50%',background:c}}/>)}</div>
          <div style={{flex:1,background:'rgba(255,255,255,0.06)',border:'1px solid var(--border)',borderRadius:6,padding:'.3rem .8rem',fontSize:'.78rem',color:'var(--muted)',fontFamily:'monospace'}}>your-startup.com</div>
        </div>
        <iframe srcDoc={html} style={{width:'100%',height:600,border:'none',display:'block'}} title="Landing page preview" sandbox="allow-scripts"/>
      </div>
      <div style={{textAlign:'center'}}>
        <button onClick={download} style={{background:'linear-gradient(135deg,#6366F1,#14B8A6)',color:'#fff',border:'none',padding:'.8rem 2rem',borderRadius:12,fontFamily:'var(--font-display)',fontSize:'.95rem',fontWeight:600,cursor:'pointer'}}>
          Download HTML
        </button>
      </div>
    </>
  )
}
