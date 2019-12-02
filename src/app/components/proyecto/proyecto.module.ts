import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ProyectoComponent } from "./proyecto/proyecto.component";

@NgModule({
	declarations: [ProyectoComponent],
	imports: [CommonModule, BrowserModule],
	providers: [],
	exports: [ProyectoComponent]
})
export class ProyectoModule {}
