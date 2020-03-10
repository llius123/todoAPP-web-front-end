import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ModalTagComponent } from './modal-tag-component/modal-tag.component';

@NgModule({
	declarations: [ModalTagComponent],
	imports: [CommonModule, BrowserModule],
	providers: [],
	exports: [ModalTagComponent]
})
export class ModalTagModule {}
