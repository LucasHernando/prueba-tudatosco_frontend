import { Component } from '@angular/core';
import { EventService, EventItem, Pagination } from '../../core/services/event.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFormModalComponent } from '../event-form-modal/event-form-modal.component';
import { DeleteEventModalComponent } from '../delete-event-modal/delete-event-modal.component';
import { AlertToastComponent } from '../../shared/alert-toast/alert-toast.component';
import { EventDetailModalComponent } from '../event-detail-modal/event-detail-modal.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [MatCardModule, CommonModule, EventFormModalComponent, DeleteEventModalComponent, AlertToastComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events: EventItem[] = [];
  pagination!: Pagination;
  showSuccess = false;
  showError = false;
  showMessage = '';

  constructor(private eventService: EventService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadEvents(1);
  }

  loadEvents(page: number) {
    this.eventService.getEvents(page).subscribe(response => {
      this.events = response.events;
      this.pagination = response.pagination;
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.pagination.total_pages) {
      this.loadEvents(page);
    }
  }

  get currentPage() {
    return this.pagination?.page ?? 1;
  }

  get totalPages() {
    return this.pagination?.total_pages ?? 1;
  }

  onCreate() {
    const modalRef = this.modalService.open(EventFormModalComponent);
    
    modalRef.result.then(
      (result) => {
        if (result?.success) {
          this.showMessage = result.message;
          this.showSuccess = result.type === 'success';
          this.loadEvents(1);
        } else if (result?.type === 'error') {
          this.showMessage = result.message;
          this.showError = true;
        }
  
        this.resetAlertsAfterDelay();
      },
      () => {}
    );
  }
  
  onUpdate(event: EventItem) {
    const modalRef = this.modalService.open(EventFormModalComponent);
    modalRef.componentInstance.eventId = event.id;
  
    modalRef.result.then(
      (result) => {
        if (result?.success) {
          this.showMessage = result.message;
          this.showSuccess = result.type === 'success';
          this.loadEvents(1);
        } else if (result?.type === 'error') {
          this.showMessage = result.message;
          this.showError = true;
        }
  
        this.resetAlertsAfterDelay();
      },
      () => {}
    );
  }
  
  onDelete(event: EventItem) {
    const modalRef = this.modalService.open(DeleteEventModalComponent);
    modalRef.componentInstance.eventId = event.id;
  
    modalRef.result.then(
      
      (result) => {
        console.log("result", result)
        if (result === true) {
          // Recargar solo si se confirmó y eliminó
          this.loadEvents(1);
          this.showMessage = 'Eliminado Exitosamente';
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        }
      },
      (reason) => {
        // Solo mostrar error si fue cancelado con un error explícito (como false)
        if (reason === false) {
          this.showMessage = 'Ocurrió un error al eliminar el Evento';
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        }
        // Si se cierra con dismiss/cancel sin error, no se muestra mensaje
      }
    );
  }


  private resetAlertsAfterDelay(): void {
    setTimeout(() => {
      this.showSuccess = false;
      this.showError = false;
    }, 3000);
  }

  onShowDetails(event: EventItem) {
    const modalRef = this.modalService.open(EventDetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventId = event.id;
  }
  
  
  onExportPDF() {
    alert('Exportar a PDF');
  }
  
  onExportExcel() {
    alert('Exportar a Excel');
  }
}
