import { InMemoryRepository } from './repository';
import { Todo, NewTodo, TodoStatus } from './types';

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Can not find todo with id ${id}`);
    this.name = 'TodoNotFoundError';
  }
}

// function delay(): Promise<void> {
//   const time = 300 + Math.random() * 300;
//   return new Promise((resolve) => setTimeout(resolve, time));
// }
export class TodoApi {
  private repo = new InMemoryRepository<Todo>();
  
  private delay(): Promise<void> {
    const time = 300 + Math.random() * 300;
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async getAll(): Promise<Todo[]> {
    await this.delay();
    return this.repo.findAll();
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await this.delay();
    const todo: Todo = {
      ...newTodo,
      id: Date.now(),
      status: TodoStatus.PENDING,
      createdAt: new Date(),
    };
    this.repo.add(todo);
    return todo;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await this.delay();
    const todo = this.repo.findById(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    return this.repo.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await this.delay();
    const todo = this.repo.findById(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    this.repo.remove(id);
  }
}
