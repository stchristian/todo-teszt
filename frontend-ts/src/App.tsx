import React, { useEffect, useCallback } from "react";
import TodoList from "./components/TodoList";
import TodoItemCreator from "./components/TodoItemCreator";
import { createTodoItem, getTodoItems, todosSelector } from "./store/todo-item";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../src/components/TextInput";
import { debounce } from "lodash";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);
  const onItemSubmitted = (description: string) => {
    dispatch(createTodoItem(description));
  };

  const searchCallback = useCallback(
    debounce((keyword: string) => {
      dispatch(getTodoItems(keyword));
    }, 1000),
    []
  );

  useEffect(() => {
    dispatch(getTodoItems());
  }, []);

  return (
    <div className="App">
      <TextInput
        placeholder="Search..."
        onChange={(event) => {
          searchCallback(event.target.value);
        }}
      />
      <TodoItemCreator onItemSubmitted={onItemSubmitted}></TodoItemCreator>
      <TodoList todos={Object.values(todos)}></TodoList>
    </div>
  );
}

export default App;
