import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Store} from "@ngrx/store";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Todo} from "./todo/todo.model";
import {TodoState} from "./todo/todo.reducer";
import {selectAllTodos, selectLoading} from "./todo/todo.selectors";
import {loadTodos, addTodo} from "./todo/todo.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet, AsyncPipe, NgForOf, NgIf],
})
export class AppComponent {
  title = 'ngrx-todo-app';
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<TodoState>) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  addTodo() {
    const newTodo: Todo = { id: 2, title: 'New Todo', completed: false };
    this.store.dispatch(addTodo({ todo: newTodo }));
  }
}
