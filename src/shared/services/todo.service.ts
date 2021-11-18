import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Todo } from '../models/Todo.model';

@Injectable()
export class TodoService {

  url = 'http://localhost:8001/todolist/'; 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getTodoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  adicionarTodo(titulo: any): Observable<Todo> {
    return this.httpClient.post<Todo>(this.url, titulo, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  atualizarTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.url + '/' + todo.id, JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  removerTodo(todo: Todo) {
    return this.httpClient.delete<Todo>(this.url + '/' + todo.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}