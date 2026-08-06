import { useState, useRef } from 'react'
import type { Blueprint } from '../types'
import PitchPanel from './panels/PitchPanel'
import MarketPanel from './panels/MarketPanel'
import ProductPanel from './panels/ProductPanel'
import RoadmapPanel from './panels/RoadmapPanel'
import TechPanel from './panels/TechPanel'
import FinancePanel from './panels/FinancePanel'
import GTMPanel from './panels/GTMPanel'
import WebsitePanel from './panels/WebsitePanel'

const TABS = [
  { id: 'pitch',   icon: '🎯', label: 'Pitch' },
  { id: 'market',  icon: '📊', label: 'Market' },
  { id: 'product', icon: '🛠️', label: 'Product' },
  { id: 'roadmap', icon: '🗺️', label: 'Roadmap' },
  { id: 'tech',    icon: '💻', label: 'Tech Stack' },
  { id: 'finance', icon: '💰', label: 'Financials' },
  { id: 'gtm',     icon: '🚀', label: 'Go-to-Market' },
  { id: 'website', icon: '🌐', label: 'Landing Page' },
]

interface OutputProps {
  blueprint: Blueprint
  idea: string
  onReset: () => void
}

export default function Output({ blueprint, idea, onReset }: OutputProps) {
  const [activeTab, setActiveTab] = useState('pitch')

  function renderPanel() {
    switch (activeTab) {
      case 'pitch':   return <PitchPanel data={blueprint.pitch} />
      case 'market':  return <MarketPanel data={blueprint.market} />
      case 'product': return <ProductPanel data={blueprint.product} />
      case 'roadmap': return <RoadmapPanel data={blueprint.roadmap} />
      case 'tech':    return <TechPanel data={blueprint.tech} />
      case 'finance': return <FinancePanel data={blueprint.finance} />
      case 'gtm':     return <GTMPanel data={blueprint.gtm} />
      case 'website': return <WebsitePanel html={blueprint.website} />
      default:        return null
    }
  }

  return (
    <section style={{ position: 'relative', zIndex: 1 }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
          background: 'linear-gradient(135deg, #6366F1, #14B8A6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>⚡ Startup Copilot</span>
        <button onClick={onReset} style={{
          display: 'flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
          color: 'var(--light)', padding: '.5rem 1.1rem', borderRadius: 10,
          fontSize: '.85rem', cursor: 'pointer',
        }}>← New Idea</button>
      </nav>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '7rem 1.5rem 2rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          color: '#6366F1', padding: '.5rem 1.25rem', borderRadius: 99,
          fontSize: '.9rem', fontWeight: 500, marginBottom: '1.25rem',
          maxWidth: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          💡 {idea.length > 80 ? idea.slice(0, 77) + '...' : idea}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '.75rem',
        }}>Your Startup Blueprint</h2>
        <p style={{ color: 'var(--light)' }}>Complete analysis powered by AI</p>
      </div>

      {/* Tabs */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 50,
        background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'flex', overflowX: 'auto', maxWidth: 1100,
          margin: '0 auto', padding: '0 1.5rem', gap: '.25rem',
          scrollbarWidth: 'none',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '.5rem',
                padding: '1rem 1.25rem', background: 'none', border: 'none',
                cursor: 'pointer', whiteSpace: 'nowrap',
                color: activeTab === tab.id ? '#6366F1' : 'var(--muted)',
                fontFamily: 'var(--font-body)', fontSize: '.875rem', fontWeight: 500,
                borderBottom: activeTab === tab.id
                  ? '2px solid #6366F1'
                  : '2px solid transparent',
                transition: 'color .2s',
              }}
            >
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>
        <div key={activeTab} className="animate-fade-up">
          {renderPanel()}
        </div>
      </div>
    </section>
  )
}
