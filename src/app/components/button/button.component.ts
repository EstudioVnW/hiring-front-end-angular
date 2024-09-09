import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() text: string = '';
  @Input() iconPath: string | null = null;
  @Input() isSubmit: boolean = false;
  @Input() isExport: boolean = false;
  @Input() isDanger: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() clickEvent = new EventEmitter<void>();

  
  onClick() {
    this.clickEvent.emit(); 
    if (this.isSubmit) {
      console.log('Submit action not implemented yet'); 
    } else if (this.isExport){
      console.log('Export action not implemented yet');
    }else {
      console.log('Click action not implemented yet');
    }
  }

  
}
