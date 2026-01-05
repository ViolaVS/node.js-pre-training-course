import React, { useMemo, useState } from 'react';
import { Todo } from '../../types';

/**
 * Task 5: FilteredToDoList Component
 *
 * Theory: Derived State and Computed Values
 *
 * In React, you often need to compute values based on your state. These are called "derived state"
 * or "computed values" and should be calculated during render rather than stored in state.
 *
 * Why Use Derived State:
 * 1. Avoids state synchronization issues
 * 2. Reduces complexity by having a single source of truth
 * 3. Automatically updates when source data changes
 * 4. Prevents stale state bugs
 *
 * Common Derived State Patterns:
 *
 * Filtering:
 * - const activeTodos = todos.filter(todo => !todo.completed)
 * - const completedTodos = todos.filter(todo => todo.completed)
 *
 * Searching:
 * - const filteredTodos = todos.filter(todo =>
 *     todo.title.toLowerCase().includes(searchTerm.toLowerCase())
 *   )
 *
 * Sorting:
 * - const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title))
 *
 * Aggregations:
 * - const completedCount = todos.filter(todo => todo.completed).length
 * - const totalCount = todos.length
 *
 * Multiple Filters:
 * - Use multiple filter conditions or combine them
 * - Consider using useMemo for expensive computations
 *
 * Key Concepts:
 * - Calculate derived values during render
 * - Don't store computed values in state
 * - Use useMemo for expensive calculations
 * - Keep state minimal and derive the rest
 */
export const FilteredToDoList: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: inputValue.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue('');
  };

  const markCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  return (
    <div>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <form
          onSubmit={handleAddTodo}
          style={{ display: 'flex', gap: 8, marginBottom: 12 }}
        >
          <input
            type="text"
            placeholder="Please add todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ display: 'flex', width: '100%', padding: '8px 10px' }}
          ></input>
          <button
            type="submit"
            style={{ padding: '8px 12px' }}
          >
            Add
          </button>
        </form>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              width: '100px',
              padding: '5px',

              backgroundColor: filter === 'all' ? '#868282ff' : 'rgb(240, 240, 240)',
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            style={{
              width: '100px',
              backgroundColor: filter === 'active' ? '#868282ff' : 'rgb(240, 240, 240)',
            }}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              width: '100px',
              backgroundColor: filter === 'completed' ? '#868282ff' : 'rgb(240, 240, 240)',
            }}
          >
            Completed
          </button>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', padding: 0, listStyle: 'none' }}>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid gray',

                color: todo.completed ? 'gray' : 'green',
              }}
            >
              <strong style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </strong>
              <span style={{ marginLeft: '10px' }}>{todo.completed && 'Completed'}</span>
              {todo.completed || (
                <button
                  onClick={() => markCompleted(todo.id)}
                  style={{ marginLeft: '10px', padding: '5px' }}
                >
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
