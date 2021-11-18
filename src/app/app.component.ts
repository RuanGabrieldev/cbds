import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from 'src/shared/models/Todo.model';
import { TodoService } from 'src/shared/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todolist';

  todo = {} as Todo;
  todos: Todo[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, public todoService: TodoService) { 
    this.form = this.fb.group({
      titulo: []
    });
  }

  ngOnInit(): void {
    this.listarTodos()
  }
  
  listarTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
    
  }
  checkTodo($event: any, todo: Todo){
    todo.concluido = !todo.concluido
    this.todoService.atualizarTodo(todo).subscribe(todos => {});
  }

  adicionar($event: any){
    this.todoService.adicionarTodo({titulo: this.form.controls.titulo.value}).subscribe(todos => {});
    this.listarTodos();
  }

}
