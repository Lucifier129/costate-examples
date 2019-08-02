import React from 'react'
import co, { useCoreducer, remove } from 'costate'
import useSessionStorage from '../hooks/useSessionStorage'

const coreducerForApp = (costate, action) => {
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
}

const initialStateForApp = {
  todos: [],
  text: {
    value: ''
  }
}

export default function App() {
  let [state, dispatch] = useCoreducer(coreducerForApp, initialStateForApp)

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

const coreducerForTodo = (costate, action) => {
  if (action.type === 'EDIT') {
    costate.edit.value = true
    costate.text.value = costate.todo.content
  }

  if (action.type === 'EDITED') {
    costate.edit.value = false
    costate.todo.content = costate.text.value
  }

  if (action.type === 'REMOVE') {
    remove(costate.todo)
  }

  if (action.type === 'TOGGLE') {
    costate.todo.completed = !costate.todo.completed
  }
}

function Todo({ todo }) {
  let [state, dispatch] = useCoreducer(coreducerForTodo, {
    edit: {
      value: false
    },
    text: {
      value: ''
    },
    todo: todo
  })

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
        {state.todo.completed ? 'completed' : 'active'}
      </button>
      {state.edit.value && (
        <TodoInput
          text={state.text}
          onBlur={handleEdited}
          onKeyUp={handleKeyUp}
        />
      )}
      {!state.edit.value && <span onClick={handleEdit}>{state.todo.content}</span>}
    </li>
  )
}

const coreducerForTodoInput = (costate, action) => {
  if (action.type === 'UPDATE_TEXT') {
    costate.text.value = action.text
  }
}

function TodoInput({ text, ...props }) {
  let [state, dispatch] = useCoreducer(coreducerForTodoInput, { text })
  let handleChange = event => {
    dispatch({
      type: 'UPDATE_TEXT',
      text: event.target.value
    })
  }
  return (
    <input
      type="text"
      {...props}
      onChange={handleChange}
      value={state.text.value}
    />
  )
}

const coreducerForFooter = (costate, action) => {
  if (action.type === 'CLEAR_COMPLETED') {
    let completedItems = costate.todos.filter(todo => todo.completed)
    completedItems.reverse().forEach(item => remove(item))
  }
}

function Footer({ todos }) {
  let [state, dispatch] = useCoreducer(coreducerForFooter, { todos })
  let activeItems = state.todos.filter(todo => !todo.completed)
  let completedItems = state.todos.filter(todo => todo.completed)

  let handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
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
