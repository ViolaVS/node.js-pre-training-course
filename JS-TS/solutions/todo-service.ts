import { TodoApi } from './todo-api';
import { Todo, TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) {}

  async create(title: string, description = ''): Promise<Todo> {
    if (!title) {
      throw new Error('Title is required');
    }

    return this.api.add({
      title: title.trim(),
      description: description?.trim(),
    });
  }

  async toggleStatus(id: number): Promise<Todo> {
    if (id <= 0) {
      throw new Error('ID must be a positive number');
    }
    const todos = await this.api.getAll();
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const newStatus =
      todo.status === TodoStatus.PENDING ? TodoStatus.COMPLETED : TodoStatus.PENDING;
    return this.api.update(id, { status: newStatus });
  }

  async search(keyword: string): Promise<Todo[]> {
    const todos = await this.api.getAll();
    const lowerKeyword = keyword.toLocaleLowerCase();

    const res = todos.filter((todo) => {
      const titleMatch = todo.title.toLocaleLowerCase().includes(lowerKeyword);
      const descriptionMatch =
        todo.description && todo.description.toLocaleLowerCase().includes(lowerKeyword);

      return titleMatch || descriptionMatch;
    });

    return res;
  }
}
