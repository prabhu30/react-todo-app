import { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos((existingTodos) => [{ id: Date.now(), completed: false, ...todo}, ...existingTodos])
  }

  function updateTodo(todoId, newTodo) {
    setTodos(existingTodos => existingTodos.map((todo) => todo.id === todoId ? newTodo : todo))
  }

  function deleteTodo(todoId) {
    setTodos(existingTodos => existingTodos.filter((todo) => todo.id !== todoId))
  }

  function toggleTodo(todoId) {
    setTodos(existingTodos => existingTodos.map((todo) => todo.id === todoId ? {...todo, completed: !todo.completed} : todo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    
    if (todos && todos.length > 0) 
    {
      setTodos(todos);
    }

  }, [])

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {
                    todos.map(todo => (
                      <div key={todo.id} className='w-full'>
                        <TodoItem todo={todo} />
                      </div>
                    ))
                  }
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
