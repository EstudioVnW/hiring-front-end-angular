import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.sass']
})
export class DeleteConfirmationComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  confirmDelete() {
    this.confirm.emit(); 
  }

  cancel() {
    this.cancelAction.emit(); 
  }
}
