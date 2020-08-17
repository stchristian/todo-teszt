import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as todoItemReducer } from "./todo-item";

const store = configureStore({
  reducer: {
    todoItem: todoItemReducer,
  },
  middleware: [...getDefaultMiddleware()],
});

export default store;
