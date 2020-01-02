import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { TagComponent } from "./tag-component/tag-component.component";
import { AcortadorTextoPipe } from './tag-component/acortador-texto.pipe';

@NgModule({
	declarations: [TagComponent, AcortadorTextoPipe],
	imports: [CommonModule, BrowserModule],
	providers: [],
	exports: [TagComponent]
})
export class TagModule {}
