import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { keyBy, omit } from "lodash";
import * as todoApi from "../api";
import { TodoItem } from "../types";

export const todosSelector = (state: any) => ({
  ...state.todoItem.todoItems,
  ...state.todoItem.updatingTodoItems,
});

type SliceState = {
  todoItems: {
    [idKey: string]: TodoItem;
  };
  updatingTodoItems: {
    [idKey: string]: TodoItem;
  };
  deletingTodoItems: {
    [idKey: string]: TodoItem;
  };
};

const todoItemSlice = createSlice({
  name: "todoItem",
  initialState: {
    todoItems: {},
    updatingTodoItems: {},
    deletingTodoItems: {},
  } as SliceState,
  reducers: {
    todoItemsFetched: (state, { payload: todoItems }: PayloadAction<TodoItem[]>) => {
      state.todoItems = keyBy(todoItems, "id");
    },
    itemCreateOrUpdateRequested: (state, { payload: todoItem }: PayloadAction<TodoItem>) => {
      state.updatingTodoItems[todoItem.id] = todoItem;
    },
    itemCreateSuccess: (
      state,
      {
        payload: { temporaryId, createdTodoItem },
      }: PayloadAction<{ temporaryId: number; createdTodoItem: TodoItem }>
    ) => {
      state.todoItems[createdTodoItem.id] = createdTodoItem;
      state.updatingTodoItems = omit(state.updatingTodoItems, temporaryId);
    },
    itemCreateFailure: (state, { payload: temporaryId }: PayloadAction<number>) => {
      state.updatingTodoItems = omit(state.updatingTodoItems, temporaryId);
    },
    itemDeleteRequested: (state, { payload: itemId }: PayloadAction<number>) => {
      state.deletingTodoItems[itemId] = state.todoItems[itemId];
      state.todoItems = omit(state.todoItems, itemId);
    },
    itemDeleteSuccess: (state, { payload: itemId }: PayloadAction<number>) => {
      state.deletingTodoItems = omit(state.deletingTodoItems, itemId);
    },
    itemDeleteFailure: (state, { payload: itemId }: PayloadAction<number>) => {
      state.todoItems[itemId] = state.deletingTodoItems[itemId];
      state.deletingTodoItems = omit(state.deletingTodoItems, itemId);
    },
    itemUpdateSuccess: (state, { payload: todo }: PayloadAction<TodoItem>) => {
      state.todoItems[todo.id] = todo;
      state.updatingTodoItems = omit(state.updatingTodoItems, todo.id);
    },
    itemUpdateFailure: (state, { payload: todoId }: PayloadAction<number>) => {
      state.updatingTodoItems = omit(state.updatingTodoItems, todoId);
    },
  },
});

export const { reducer, actions } = todoItemSlice;
export const {} = todoItemSlice.actions;

export const getTodoItems = (keyword?: string) => async (dispatch: any) => {
  const todoItems = await todoApi.getTodoItems(keyword);
  dispatch(actions.todoItemsFetched(todoItems));
};

export const updateTodoItem = (todo: TodoItem) => async (dispatch: any) => {
  try {
    dispatch(actions.itemCreateOrUpdateRequested(todo));
    const updatedTodo = await todoApi.updateTodo(todo);
    dispatch(actions.itemUpdateSuccess(updatedTodo));
  } catch (error) {
    dispatch(actions.itemUpdateFailure(todo.id));
  }
};

export const createTodoItem = (description: string) => async (dispatch: any) => {
  const temporaryTodoItem = {
    id: Date.now(),
    description,
    finished: false,
  };
  try {
    dispatch(actions.itemCreateOrUpdateRequested(temporaryTodoItem));
    const createdTodoItem = await todoApi.createTodoItem(description);
    dispatch(
      actions.itemCreateSuccess({
        temporaryId: temporaryTodoItem.id,
        createdTodoItem,
      })
    );
  } catch (error) {
    dispatch(actions.itemCreateFailure(temporaryTodoItem.id));
  }
};

export const deleteTodoItem = (itemId: number) => async (dispatch: any) => {
  try {
    dispatch(actions.itemDeleteRequested(itemId));
    await todoApi.deleteTodo(itemId);
    dispatch(actions.itemDeleteSuccess(itemId));
  } catch (error) {
    dispatch(actions.itemDeleteFailure(itemId));
  }
};
