import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { loadTodos, loadTodosSuccess, addTodo, addTodoSuccess } from './todo.actions';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodos),
    mergeMap(() => this.todoService.getTodos()
      .pipe(
        map(todos => loadTodosSuccess({ todos })),
        catchError(error => EMPTY)
      )
    )
  ));

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodo),
    mergeMap(action => this.todoService.addTodo(action.todo)
      .pipe(
        map(todo => addTodoSuccess({ todo })),
        catchError(error => EMPTY)
      )
    )
  ));
}
