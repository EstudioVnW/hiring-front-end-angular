import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() isVisible: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();

  onClose(): void {
    this.isVisible = false;
    this.closeDialog.emit(); 
    console.log('Diálogo fechado');
  }

  onConfirm(): void {
    console.log('Ação confirmada');
    this.onClose();
  }
}
