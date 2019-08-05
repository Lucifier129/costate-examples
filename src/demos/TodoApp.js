import React from 'react'
import { co, remove } from 'costate'
import { useCostate } from 'costate/react'
import useSessionStorage from '../hooks/useSessionStorage'

export default function App() {
  let state = useCostate({
    todos: [],
    text: {
      value: ''
    }
  })

  useSessionStorage({
    key: 'todos-json',
    getter: () => state,
    setter: source => Object.assign(co(state), source)
  })

  let handleAddTodo = () => {
    if (!state.text.value) {
      return alert('empty content')
    }

    co(state).todos.push({
      id: Date.now(),
      content: state.text.value,
      completed: false
    })
    co(state).text.value = ''
  }

  let handleKeyUp = event => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  let handleToggleAll = () => {
    let hasActiveItem = state.todos.some(todo => !todo.completed)

    co(state).todos.forEach(todo => {
      todo.completed = hasActiveItem
    })
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
  let edit = useCostate({ value: false })
  let text = useCostate({ value: '' })

  let handleEdit = () => {
    co(edit).value = !edit.value
    co(text).value = todo.content
  }

  let handleEdited = () => {
    co(edit).value = false
    co(todo).content = text.value
  }

  let handleKeyUp = event => {
    if (event.key === 'Enter') {
      handleEdited()
    }
  }

  let handleRemove = () => {
    remove(co(todo))
  }

  let handleToggle = () => {
    co(todo).completed = !todo.completed
  }

  return (
    <li>
      <button onClick={handleRemove}>remove</button>
      <button onClick={handleToggle}>
        {todo.completed ? 'completed' : 'active'}
      </button>
      {edit.value && (
        <TodoInput text={text} onBlur={handleEdited} onKeyUp={handleKeyUp} />
      )}
      {!edit.value && <span onClick={handleEdit}>{todo.content}</span>}
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
    ;[...completedItems].reverse().forEach(item => remove(co(item)))
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
