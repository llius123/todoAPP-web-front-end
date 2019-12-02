import { NgModule } from "@angular/core";
import { TagModule } from "./tag/tag.module";
import { TodoListModule } from "./todo/todo.module";
import { SvgService } from "../global/svg.service";
import { ProyectoModule } from './proyecto/proyecto.module';

@NgModule({
	declarations: [],
	imports: [TagModule, TodoListModule, ProyectoModule],
	providers: [SvgService]
})
export class ComponentModule {}
