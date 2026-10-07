import { createContext, useContext, useState } from 'react'

const GameProgressContext = createContext(null)

export function GameProgressProvider({ children }) {
  const [progress, setProgress] = useState({ chapter: 1, credibility: 0, stateJson: '{}' })
  return (
    <GameProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </GameProgressContext.Provider>
  )
}

export function useGameProgress() {
  return useContext(GameProgressContext)
}
