import React from 'react'

export default {
  Counter: React.lazy(() => import('./Counter')),
  TodoApp: React.lazy(() => import('./TodoApp')),
  'Co-reducer-TodoApp': React.lazy(() => import('./Co-reducer-TodoApp'))
}
