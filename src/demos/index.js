import React from 'react'

export default {
  TodoApp: React.lazy(() => import('./TodoApp')),
  Counter: React.lazy(() => import('./Counter'))
}
