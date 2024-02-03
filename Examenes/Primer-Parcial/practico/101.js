const axios = require('axios');
const readline = require('readline');

const todoAPI = 'https://jsonplaceholder.typicode.com/todos';

async function fetchTodos() {
  try {
    const response = await axios.get(todoAPI);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    throw error;
  }
}

function displayTodoList(todoList, fields = ['id', 'title']) {
  for (const todo of todoList) {
    const displayText = fields.map(field => `${field}: ${todo[field]}`).join(' - ');
    console.log(displayText);
  }
}

async function displayMenu() {
  console.log('\n===== Todo List Menu =====');
  console.log('1. List all todos (IDs only)');
  console.log('2. List all todos (IDs and Title)');
  console.log('3. List all todos unresolved (ID and Title)');
  console.log('4. List all todos resolved (ID and Title)');
  console.log('5. List all todos (IDs and userId)');
  console.log('6. List all todos resolved (ID and userId)');
  console.log('7. List all todos unresolved (ID and userId)');
  console.log('8. Exit');
  console.log('==========================');

  const choice = await prompt('Enter your choice: ');

  switch (choice) {
    case '1':
      const todosIds = todos.map(todo => todo.id);
      console.log('List of all todos (IDs only):', todosIds);
      break;
    case '2':
      console.log('List of all todos (IDs and Title):');
      displayTodoList(todos);
      break;
    case '3':
      const unresolvedTodos = todos.filter(todo => !todo.completed);
      console.log('List of all todos unresolved (ID and Title):');
      displayTodoList(unresolvedTodos);
      break;
    case '4':
      const resolvedTodos = todos.filter(todo => todo.completed);
      console.log('List of all todos resolved (ID and Title):');
      displayTodoList(resolvedTodos);
      break;
    case '5':
      console.log('List of all todos (IDs and userId):');
      displayTodoList(todos, ['id', 'userId']);
      break;
    case '6':
      const resolvedTodosWithUserId = resolvedTodos.map(todo => ({ id: todo.id, userId: todo.userId }));
      console.log('List of all todos resolved (ID and userId):');
      displayTodoList(resolvedTodosWithUserId, ['id', 'userId']);
      break;
    case '7':
      const unresolvedTodosWithUserId = unresolvedTodos.map(todo => ({ id: todo.id, userId: todo.userId }));
      console.log('List of all todos unresolved (ID and userId):');
      displayTodoList(unresolvedTodosWithUserId, ['id', 'userId']);
      break;
    case '8':
      console.log('Exiting application.');
      process.exit();
      break;
    default:
      console.log('Invalid choice. Please enter a number between 1 and 8.');
      break;
  }

  // Display the menu again after processing the choice
  await displayMenu();
}

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

let todos;

(async () => {
  try {
    todos = await fetchTodos();
    await displayMenu();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
