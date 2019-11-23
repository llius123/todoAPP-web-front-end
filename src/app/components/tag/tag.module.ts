import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { TagComponent } from "./tag-component/tag-component.component";

@NgModule({
	declarations: [TagComponent],
	imports: [CommonModule, BrowserModule],
	providers: [],
	exports: [TagComponent]
})
export class TagModule {}
