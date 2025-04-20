import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-delete-event-modal',
  standalone: true,
  templateUrl: './delete-event-modal.component.html',
  styleUrl: './delete-event-modal.component.css'
})
export class DeleteEventModalComponent {
  @Input() eventId!: number;

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: EventService
  ) {}

  confirmDelete() {
    this.eventService.deleteEvent(this.eventId).subscribe({
      next: (res) => {
        console.log("res", res.status)
        if (res.status === 200){
          this.activeModal.close(true);
        }else{
          this.activeModal.close(false);
        } 
          
      },
      error: (err) => {
        this.activeModal.close(false);
      }
    });
    
  }

  //this.activeModal.close(false);

  cancel() {
    this.activeModal.dismiss('cancel');
  }
}
