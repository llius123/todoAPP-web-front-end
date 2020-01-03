import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ModalComponent } from './modal-component/modal.component';

@NgModule({
	declarations: [ModalComponent],
	imports: [CommonModule, BrowserModule],
	providers: [],
	exports: [ModalComponent]
})
export class ModalModule {}
