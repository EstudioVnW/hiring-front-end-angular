import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>(); 

  closeModal(): void {
    this.close.emit(); 
  }

  confirm(): void {
    this.confirmDelete.emit(); 
  }
}
