import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { PopoverService } from "src/app/services/popover.service";
import { Employee } from "src/types/employee.interface";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  @Input() popoverId: string = ''; 
  isPopoverOpen: boolean = false;
  isModalOpen: boolean = false; 
  @Output() deleteRequest = new EventEmitter<string>();
  @Output() editRequest = new EventEmitter<Employee>(); 
  @Input() employee: Employee = {} as Employee;

  togglePopover() { 
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleDelete() {
    this.deleteRequest.emit(this.popoverId); 
    this.isPopoverOpen = false;
  }

  handleEdit() {
    this.editRequest.emit(this.employee);  
    this.isPopoverOpen = false;
  }
  @HostListener('document:click', ['$event'])
  closePopoverOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.popover-container')) {
      this.isPopoverOpen = false;
    }
  }
}
