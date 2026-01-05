import React, { useState } from 'react';
import { Todo } from '../../types';
// import { TodoListProps } from '../../types';

/**
 * Task 4: CompleteToDoList Component
 *
 * Theory: State Updates and Immutability
 *
 * React state updates must be immutable. This means you cannot directly modify the existing state
 * object or array. Instead, you must create a new object/array with the updated values.
 *
 * Why Immutability Matters:
 * 1. React uses reference equality to determine if state has changed
 * 2. Direct mutations don't trigger re-renders
 * 3. It enables time-travel debugging and undo/redo features
 * 4. It makes state changes predictable and traceable
 *
 * Common State Update Patterns:
 *
 * For Arrays:
 * - Adding: [...array, newItem]
 * - Removing: array.filter(item => item.id !== id)
 * - Updating: array.map(item => item.id === id ? {...item, updated: true} : item)
 *
 * For Objects:
 * - Updating: {...object, newProperty: value}
 * - Nested updates: {...object, nested: {...object.nested, updated: true}}
 *
 * Event Handling with Parameters:
 * - Use arrow functions to pass parameters to event handlers
 * - Example: onClick={() => handleClick(id)}
 * - Or use bind: onClick={handleClick.bind(null, id)}
 *
 * Key Concepts:
 * - Always create new objects/arrays when updating state
 * - Use spread operator (...) for shallow copies
 * - Consider using libraries like Immer for complex updates
 * - Think about state structure before implementing
 */

export const CompleteToDoList: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

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

        <ul style={{ display: 'flex', flexDirection: 'column', padding: 0, listStyle: 'none' }}>
          {todos.map((todo) => (
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
