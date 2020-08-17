import axios from "axios";
import { omit } from "lodash";
import { TodoItem } from "../types";

const api = axios.create();

export async function getTodoItems(keyword?: string): Promise<TodoItem[]> {
  const { data } = await api.get("/todos", {
    ...(keyword && {
      params: {
        q: keyword,
      },
    }),
  });
  return data;
}

export async function createTodoItem(description: string): Promise<TodoItem> {
  const { data } = await api.post("/todos", {
    description,
  });
  return data;
}

export async function updateTodo(todo: TodoItem): Promise<TodoItem> {
  const { data } = await api.put(`/todos/${todo.id}`, omit(todo, "id"));
  return data;
}

export async function deleteTodo(todoId: number): Promise<void> {
  const { data } = await api.delete(`/todos/${todoId}`);
  return;
}
