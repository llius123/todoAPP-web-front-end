import { NgModule } from '@angular/core';
import { TagModule } from './tag/tag.module';
import { TodoListModule } from './todo/todo.module';
import { SvgService } from '../global/svg.service';


@NgModule({
declarations: [
],
imports: [
	TagModule,
	TodoListModule
],
providers: [
	SvgService
]
})
export class ComponentModule { }
