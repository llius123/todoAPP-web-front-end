import { TodoListModule } from './../components/todo/todo.module';
import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentModule } from '../components/components.module';

@NgModule({
  declarations: [
	TodoComponent,

  ],
  imports: [
	BrowserModule,
	TodoListModule
  ],
  providers: [TodoService],
  bootstrap: []
})
export class TodoModule { }
