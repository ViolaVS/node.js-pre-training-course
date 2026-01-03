#!/usr/bin/env ts-node
// CLI entry for Task 10 – placeholder only
import { ToDoManager } from './todo-manager';

const manager = new ToDoManager();

async function run() {
  await manager.init();
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add': {
      await manager.add(args[1], args[2] || '');
      console.log('Todo successfully added');
    }
    case 'complete': {
      await manager.complete(Number(args[1]));
      console.log('Todo  was completed');
    }
    case 'list': {
      const list = await manager.list();
      console.log(list);
    }
  }
}
run();
