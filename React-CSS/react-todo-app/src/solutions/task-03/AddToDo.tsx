import React, { FormEvent, useState } from 'react';
import { Todo } from '../../types';

export const AddToDo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClick = (e: FormEvent) => {
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

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <form
        onSubmit={handleClick}
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
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
