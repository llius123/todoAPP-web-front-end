import { NgModule } from "@angular/core";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TagModule } from "../tag/tag.module";

@NgModule({
	declarations: [TodoListComponent],
	imports: [CommonModule, BrowserModule, DragDropModule, TagModule],
	providers: [],
	exports: [TodoListComponent]
})
export class TodoListModule {}
