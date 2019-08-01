import React from 'react'
import co, { useCostate } from 'costate'
import useSessionStorage from '../hooks/useSessionStorage'

export default function Counter() {
  let state = useCostate({ count: 0 })

  let handleIncre = () => {
    co(state).count += 1
  }

  let handleDecre = () => {
    co(state).count -= 1
  }

  useSessionStorage({
    key: 'counter-json',
    getter: () => state,
    setter: source => Object.assign(co(state), source)
  })

  return (
    <div>
      <button onClick={handleIncre}>+1</button>
      {state.count}
      <button onClick={handleDecre}>-1</button>
    </div>
  )
}
