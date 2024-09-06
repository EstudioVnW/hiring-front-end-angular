import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})

export class PopoverComponent {
  @Input() popoverId: string = '';
  isPopoverOpen: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private popoverService: PopoverService) {}

  ngOnInit(): void {
    this.subscription = this.popoverService.popoverMessage$.subscribe(
      (popoverId) => {
        if (this.popoverId !== popoverId){
          this.isPopoverOpen = false;
        }
      }
    )
  }

  togglePopover() { 
    this.isPopoverOpen = !this.isPopoverOpen;
    if (this.isPopoverOpen) {
      this.popoverService.openPopover(this.popoverId);
    }
  }

  handleEdit() {
    console.log('Action edit not implemented yet')
    this.isPopoverOpen = false;
  }

  handleDelete() {
    console.log('Action delete not implemented yet')
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
