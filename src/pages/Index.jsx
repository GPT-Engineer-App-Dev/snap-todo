import React, { useState } from "react";
import { Box, Heading, VStack, Input, IconButton, List, ListItem, ListIcon, HStack, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Can't add an empty todo!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTodo = {
      id: Date.now(),
      content: inputValue,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleCompleteTodo = (id) => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    setTodos(newTodos);
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        <HStack>
          <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          <IconButton icon={<FaPlus />} onClick={handleAddTodo} aria-label="Add todo" colorScheme="blue" />
        </HStack>
        <List spacing={3} width="100%">
          {todos.map((todo) => (
            <ListItem key={todo.id} display="flex" alignItems="center">
              <ListIcon as={todo.isCompleted ? FaCheckCircle : FaRegCircle} color={todo.isCompleted ? "green.500" : "gray.500"} cursor="pointer" onClick={() => handleCompleteTodo(todo.id)} />
              <Text as={todo.isCompleted ? "s" : undefined}>{todo.content}</Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Index;
