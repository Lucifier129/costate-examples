import React from 'react'
import { co, remove } from 'costate'
import { useCoreducer } from 'costate/react'
import useSessionStorage from '../hooks/useSessionStorage'

export default function App() {
  let [state, dispatch] = useCoreducer(
    (costate, action) => {
      if (action.type === 'ADD_TODO') {
        let todo = {
          id: Date.now(),
          content: costate.text.value,
          completed: false
        }
        costate.todos.push(todo)
        costate.text.value = ''
      }

      if (action.type === 'TOGGLE_ALL') {
        let hasActiveItem = costate.todos.some(todo => !todo.completed)

        costate.todos.forEach(todo => {
          todo.completed = hasActiveItem
        })
      }
    },
    {
      todos: [],
      text: {
        value: ''
      }
    }
  )

  useSessionStorage({
    key: 'coreducer-todos-json',
    getter: () => state,
    setter: source => Object.assign(co(state), source)
  })

  let handleAddTodo = () => {
    if (!state.text.value) {
      return alert('empty content')
    }
    dispatch({ type: 'ADD_TODO' })
  }

  let handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL' })
  }

  let handleKeyUp = event => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <>
      <div>
        <TodoInput text={state.text} onKeyUp={handleKeyUp} />
        <button onClick={handleAddTodo}>add</button>
        <button onClick={handleToggleAll}>toggle-all</button>
      </div>
      <Todos todos={state.todos} />
      <Footer todos={state.todos} />
    </>
  )
}

function Todos({ todos }) {
  return (
    <ul>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} />
      })}
    </ul>
  )
}

function Todo({ todo }) {
  let [state, dispatch] = useCoreducer(
    (costate, action) => {
      if (action.type === 'EDIT') {
        costate.edit.value = true
        costate.text.value = todo.content
      }

      if (action.type === 'EDITED') {
        costate.edit.value = false
        co(todo).content = costate.text.value
      }

      if (action.type === 'REMOVE') {
        remove(co(todo))
      }

      if (action.type === 'TOGGLE') {
        co(todo).completed = !todo.completed
      }
    },
    {
      edit: {
        value: false
      },
      text: {
        value: ''
      }
    }
  )

  let handleEdit = () => {
    dispatch({ type: 'EDIT' })
  }

  let handleEdited = () => {
    dispatch({ type: 'EDITED' })
  }

  let handleKeyUp = event => {
    if (event.key === 'Enter') {
      handleEdited()
    }
  }

  let handleRemove = () => {
    dispatch({ type: 'REMOVE' })
  }

  let handleToggle = () => {
    dispatch({ type: 'TOGGLE' })
  }

  return (
    <li>
      <button onClick={handleRemove}>remove</button>
      <button onClick={handleToggle}>
        {todo.completed ? 'completed' : 'active'}
      </button>
      {state.edit.value && (
        <TodoInput
          text={state.text}
          onBlur={handleEdited}
          onKeyUp={handleKeyUp}
        />
      )}
      {!state.edit.value && <span onClick={handleEdit}>{todo.content}</span>}
    </li>
  )
}

function TodoInput({ text, ...props }) {
  let handleChange = event => {
    co(text).value = event.target.value
  }
  return (
    <input type="text" {...props} onChange={handleChange} value={text.value} />
  )
}

function Footer({ todos }) {
  let activeItems = todos.filter(todo => !todo.completed)
  let completedItems = todos.filter(todo => todo.completed)

  let handleClearCompleted = () => {
    let completedItems = todos.filter(todo => todo.completed)
    completedItems.reverse().forEach(item => remove(co(item)))
  }

  return (
    <div>
      {activeItems.length} item{activeItems.length > 1 && 's'} left |{' '}
      {completedItems.length > 0 && (
        <button onClick={handleClearCompleted}>Clear completed</button>
      )}
    </div>
  )
}
