// event-detail-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService, EventItem, SessionItem } from '../../core/services/event.service';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail-modal.component.html',
  styleUrls: ['./event-detail-modal.component.css']
})
export class EventDetailModalComponent implements OnInit {
  @Input() eventId!: number;
  event!: EventItem;
  sessions: SessionItem[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: EventService,
    private sessionService: EventService
  ) {}

  ngOnInit(): void {
    this.eventService.getEventById(this.eventId).subscribe(event => this.event = event);
    this.sessionService.getSessionsByEventId(this.eventId).subscribe(sessions => this.sessions = sessions);
  }

  close() {
    this.activeModal.dismiss();
  }
}
