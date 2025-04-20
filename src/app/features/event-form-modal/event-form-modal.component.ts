import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-event-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './event-form-modal.component.html',
  styleUrl: './event-form-modal.component.css'
})
export class EventFormModalComponent implements OnInit {
  @Input() eventId?: number;
  form!: FormGroup;
  isEditMode = false;
  statusOptions = [
    { item: 'programmed', value: 'Programado' },
    { item: 'in_progress', value: 'En progreso' },
    { item: 'completed', value: 'Finalizado' },
    { item: 'canceled', value: 'Cancelado' }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private http: HttpClient,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(500)]],
        status: ['', Validators.required],
        capacity: [1, [Validators.required, Validators.min(1)]],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required]
      },
      { validators: this.dateRangeValidator }
    );

    if (this.eventId) {
      this.isEditMode = true;
      this.loadEventData(this.eventId);
    }
  }

  // ✅ Validación personalizada para fecha
  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = new Date(group.get('start_date')?.value);
    const end = new Date(group.get('end_date')?.value);
    if (start && end && start >= end) {
      return { dateInvalid: true };
    }
    return null;
  }

  loadEventData(id: number) {
    this.eventService.getEventById(id).subscribe(response => {
      this.form.patchValue({
        ...response,
        status: response.status,
        start_date: response.start_date,
        end_date: response.end_date
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
  
    const data = this.form.value;
  
    if (this.isEditMode && this.eventId) {
      this.eventService.updateEvent(this.eventId, data).subscribe(() => {
        this.activeModal.close({ success: true, message: 'Evento actualizado exitosamente', type: 'success' });
      }, () => {
        this.activeModal.close({ success: false, message: 'Error al actualizar el evento', type: 'error' });
      });
    } else {
      this.eventService.createEvent(data).subscribe(() => {
        this.activeModal.close({ success: true, message: 'Evento creado exitosamente', type: 'success' });
      }, () => {
        this.activeModal.close({ success: false, message: 'Error al crear el evento', type: 'error' });
      });
    }
  }
  

  onCancel() {
    this.activeModal.dismiss('cancel');
  }

  get f() {
    return this.form.controls;
  }
}
