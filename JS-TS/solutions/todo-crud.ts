import { Todo } from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  return [...state, todo];
}

export function updateTodo(
  state: Todo[],
  id: number,
  update: Partial<Omit<Todo, 'id' | 'createdAt'>>
): Todo[] {

  let found: boolean = false;

  const result = state.map((todo) => {
    if (todo.id === id) {
      found = true;
      return { ...todo, ...update };
    } else {
      return todo;
    }
  });

  if (!found) throw new Error(`Todo with id ${id} not found`);

  return result;
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  
  let result = state.filter((todo) => {
    if (todo.id) return todo.id !== id;
  });

  if (result.length === state.length) {
    throw new Error(`Todo with id ${id} not found`);
  }

  return result;
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find((todo) => todo.id === id);
}
