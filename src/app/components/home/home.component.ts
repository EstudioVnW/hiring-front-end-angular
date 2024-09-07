import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  isDialogVisible = false;

  openDialog() {
    this.isDialogVisible = true;
  }

  onDialogClose() {
    this.isDialogVisible = false;
  }
}
