import { TodoService } from './todo-service';
import { TodoApi } from './todo-api';
import { Todo } from './types';

export class ToDoManager {
  private service = new TodoService(new TodoApi());

  async init(): Promise<void> {
    await this.service.create('Buy eat', 'Milk, Eggs, Bread');
    await this.service.create('Visit doctor', '15:30, Robins str. 5');
    await this.service.create('Learn React', 'Read about optimisation');
  }

  async add(title: string, description = ''): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }

  async list(): Promise<Todo[]> {
    return this.service.search('');
  }
}
