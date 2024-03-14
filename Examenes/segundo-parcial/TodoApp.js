import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [menuChoice, setMenuChoice] = useState('');
  const [displayText, setDisplayText] = useState('');

  const todoAPI = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(todoAPI);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const displayTodoList = (todoList, fields = ['id', 'title']) => {
    const text = todoList.map(todo => {
      return fields.map(field => `${field}: ${todo[field]}`).join(' - ');
    }).join('\n');
    setDisplayText(text);
  };

  const handleMenuChoice = async () => {
    switch (menuChoice) {
      case '1':
        const todosIds = todos.map(todo => todo.id);
        setDisplayText(`List of all todos (IDs only):\n${todosIds.join(', ')}`);
        break;
      case '2':
        setDisplayText('List of all todos (IDs and Title):\n');
        displayTodoList(todos);
        break;
      case '3':
        const unresolvedTodos = todos.filter(todo => !todo.completed);
        setDisplayText('List of all todos unresolved (ID and Title):\n');
        displayTodoList(unresolvedTodos);
        break;
      case '4':
        const resolvedTodos = todos.filter(todo => todo.completed);
        setDisplayText('List of all todos resolved (ID and Title):\n');
        displayTodoList(resolvedTodos);
        break;
      case '5':
        setDisplayText('List of all todos (IDs and userId):\n');
        displayTodoList(todos, ['id', 'userId']);
        break;
      case '6':
        const resolvedTodosWithUserId = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        setDisplayText('List of all todos resolved (ID and userId):\n');
        displayTodoList(resolvedTodosWithUserId, ['id', 'userId']);
        break;
      case '7':
        const unresolvedTodosWithUserId = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        setDisplayText('List of all todos unresolved (ID and userId):\n');
        displayTodoList(unresolvedTodosWithUserId, ['id', 'userId']);
        break;
      case '8':
        setDisplayText('Exiting application.');
        break;
      default:
        setDisplayText('Invalid choice. Please enter a number between 1 and 8.');
        break;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{displayText}</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        placeholder="Enter your choice"
        onChangeText={text => setMenuChoice(text)}
        value={menuChoice}
        keyboardType="numeric"
      />
      <Button onPress={handleMenuChoice} title="Submit" />
    </View>
  );
};

export default TodoApp;
