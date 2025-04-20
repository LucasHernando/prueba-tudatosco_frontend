import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.css']
})
export class AlertToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  show = true;

  close() {
    this.show = false;
  }
}
