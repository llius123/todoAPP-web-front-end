import { NgModule } from '@angular/core';
import { TagModule } from './tag/tag.module';
import { TodoListModule } from './todo/todo.module';


@NgModule({
declarations: [
],
imports: [
	TagModule,
	TodoListModule
]
})
export class ComponentModule { }
