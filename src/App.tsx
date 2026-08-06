import { useState, useRef } from 'react'
import Hero from './components/Hero'
import Loading from './components/Loading'
import Output from './components/Output'
import { generateBlueprint } from './lib/api'
import type { Blueprint } from './types'

type AppState = 'hero' | 'loading' | 'output'

export default function App() {
  const [state, setState] = useState<AppState>('hero')
  const [idea, setIdea] = useState('')
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [error, setError] = useState('')
  const loadingRef = useRef<{ advance: () => void }>(null)

  async function handleLaunch(userIdea: string) {
    setIdea(userIdea)
    setError('')
    setState('loading')
    window.scrollTo({ top: 0 })

    try {
      const data = await generateBlueprint(userIdea)
      setBlueprint(data)
      setState('output')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      setState('hero')
    }
  }

  function handleReset() {
    setState('hero')
    setBlueprint(null)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {state === 'hero' && (
        <Hero onLaunch={handleLaunch} error={error} />
      )}
      {state === 'loading' && (
        <Loading ref={loadingRef} />
      )}
      {state === 'output' && blueprint && (
        <Output blueprint={blueprint} idea={idea} onReset={handleReset} />
      )}
    </>
  )
}