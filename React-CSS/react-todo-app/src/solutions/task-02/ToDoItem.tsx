import React from 'react';
import { TodoItemProps } from '../../types';

export const ToDoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div style={{ padding: '10px', margin: '10px 0', border: '1px solid gray' }}>
      <span
        style={{
          color: todo.completed ? 'gray' : 'green',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.title}
      </span>
      {todo.completed && (
        <span
          style={{
            color: 'gray',
            textDecoration: 'line-through',
          }}
        >
          {' '}
          completed
        </span>
      )}
    </div>
  );
};
