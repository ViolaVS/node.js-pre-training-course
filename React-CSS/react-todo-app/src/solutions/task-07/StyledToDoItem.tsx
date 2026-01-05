import React from 'react';
import { TodoItemProps } from '../../types';
import './StyledToDoItem.css';

export const StyledToDoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span>{todo.title}</span>
      {todo.completed && <span>completed</span>}
    </div>
  );
};
