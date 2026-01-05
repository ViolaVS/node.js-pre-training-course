import React from 'react';
import { TodoListProps } from '../../types';

export const ToDoList: React.FC<TodoListProps> = ({ todos }) => {
  if (!todos || todos.length === 0) {
    return <p>Todo list is empty.</p>;
  }
  return (
    <div>
      <h3>Todo List</h3>
      <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none' }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              margin: '10px 0',
              border: '1px solid gray',
            }}
          >
            {todo.title} - {todo.completed ? 'completed' : 'not completed'}
          </li>
        ))}
      </ul>
    </div>
  );
};
