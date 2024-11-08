import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import {
  loadTodosSuccess,
  loadTodosFailure,
  addTodoSuccess,
  addTodoFailure
} from './todo.actions';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
  on(loadTodosFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(addTodoSuccess, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
  on(addTodoFailure, (state, { error }) => ({ ...state, error }))
);
