import { TodoService } from '../JS-TS/solutions/todo-service';
import { TodoStatus } from '../JS-TS/solutions/types';
import { TodoApi, TodoNotFoundError } from '../JS-TS/solutions/todo-api';
describe('Todo service', () => {
  let service: TodoService;
  let api: TodoApi;
  beforeEach(() => {
    api = new TodoApi();
    service = new TodoService(api);
  });
  test('create todo with fill in all values', async () => {
    const todo = await service.create('My todo', 'Create first todo');
    expect(todo.id).toBeDefined();
    expect(todo.title).toBe('My todo');
    expect(todo.description).toBe('Create first todo');
    expect(todo.status).toBe(TodoStatus.PENDING);
    expect(todo.createdAt).toBeInstanceOf(Date);
  });
  test('create todo with empty description', async () => {
    const todo = await service.create('Second todo');
    expect(todo.description).toBe('');
  });

  test('toggle status', async () => {
    const todo = await service.create('My todo');
    expect(todo.title).toBe('My todo');
    expect(todo.status).toBe(TodoStatus.PENDING);
    const toggledTodo = await service.toggleStatus(todo.id);
    expect(todo.status).toBe(TodoStatus.COMPLETED);
  });

  test('throw error if id is not a positive number', async () => {
    await expect(service.toggleStatus(-5)).rejects.toThrow('ID must be a positive number');
  });
  test('throw error if todo with given id is not existed', async () => {
    const id = 11111;
    await expect(service.toggleStatus(id)).rejects.toThrow(`Todo with id ${id} is not find`);
  });
  test('search input returns matching todos', async () => {
    await service.create('Buy milk', '2 items');
    await service.create('Buy bread', '1 item');
    const res = await service.search('milk');
    expect(res.length).toBe(1);
    expect(res[0].title).toBe('Buy milk');
  });

});
