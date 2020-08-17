import React, { FunctionComponent } from "react";
import TodoItem from "../TodoItem";
import { TodoItem as TodoItemType } from "../../types";
import { useDispatch } from "react-redux";
import { deleteTodoItem as deleteTodoItemAction, updateTodoItem } from "../../store/todo-item";

interface TodoListProps {
  todos: TodoItemType[];
}
const TodoList: FunctionComponent<TodoListProps> = ({ todos }) => {
  const dispatch = useDispatch();
  const onCheckToggled = (todoItem: TodoItemType) => {
    dispatch(
      updateTodoItem({
        ...todoItem,
        finished: !todoItem.finished,
      })
    );
  };

  const deleteTodoItem = (todoItem: TodoItemType) => {
    dispatch(deleteTodoItemAction(todoItem.id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          onDelete={deleteTodoItem.bind(null, todo)}
          onCheckToggled={onCheckToggled.bind(null, todo)}
        />
      ))}
    </div>
  );
};

export default TodoList;
