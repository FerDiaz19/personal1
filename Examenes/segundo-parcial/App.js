import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';

const todoAPI = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [menuChoice, setMenuChoice] = useState('');
  const [displayedTodos, setDisplayedTodos] = useState([]);

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

  const displayMenu = () => {
    return (
      <View>
        <Text>===== Todo List Menu =====</Text>
        <Text>1. List all todos (IDs only)</Text>
        <Text>2. List all todos (IDs and Title)</Text>
        <Text>3. List all todos unresolved (ID and Title)</Text>
        <Text>4. List all todos resolved (ID and Title)</Text>
        <Text>5. List all todos (IDs and userId)</Text>
        <Text>6. List all todos resolved (ID and userId)</Text>
        <Text>7. List all todos unresolved (ID and userId)</Text>
        <Text>8. Exit</Text>
        <Text>==========================</Text>
      </View>
    );
  };

  const handleMenuChoice = async choice => {
    setMenuChoice(choice);
    switch (choice) {
      case '1':
        setDisplayedTodos(todos.map(todo => todo.id));
        break;
      case '2':
        setDisplayedTodos(todos);
        break;
      case '3':
        setDisplayedTodos(todos.filter(todo => !todo.completed));
        break;
      case '4':
        setDisplayedTodos(todos.filter(todo => todo.completed));
        break;
      case '5':
        setDisplayedTodos(todos.map(todo => ({ id: todo.id, userId: todo.userId })));
        break;
      case '6':
        setDisplayedTodos(todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId })));
        break;
      case '7':
        setDisplayedTodos(todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId })));
        break;
      case '8':
        setDisplayedTodos([]);
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 8.');
        break;
    }
  };

  return (
    <ScrollView>
      {displayMenu()}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleMenuChoice(text)}
        value={menuChoice}
      />
      {displayedTodos.map((todo, index) => (
        <Text key={index}>{JSON.stringify(todo)}</Text>
      ))}
    </ScrollView>
  );
};

export default App;

