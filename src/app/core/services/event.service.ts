import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token/token.service';

export interface EventItem {
  id: number,
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  capacity: number;
  status: string;
}

export interface Pagination {
  has_next: boolean;
  has_prev: boolean;
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

export interface EventResponse {
  data: {
    data: EventItem[];
    pagination: Pagination;
  };
  errors: any;
  message: string;
  status: number;
}


export interface GetEventResponse {
  data: EventItem[];  
  errors: any;
  message: string;
  status: number;
}

export interface DeleteEventResponse{
  message: string;
  status: number;
}


export interface SessionItem {
  id: number;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  speaker_id: number;
  event_id: number;
  capacity: number;
}

export interface SessionResponse {
  data: SessionItem[];
  errors: any;
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8082/api/events';
  private apiUrlSession = 'http://localhost:8082/api/sessions';

  constructor(private http: HttpClient, private token: TokenService) {}

  getEvents(page: number = 1, perPage: number = 20): Observable<{ events: EventItem[], pagination: Pagination }> {
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = {
      page: page.toString(),
      per_page: perPage.toString()
    };

    return this.http.get<EventResponse>(this.apiUrl, { headers, params }).pipe(
      map(response => ({
        events: response.data.data,
        pagination: response.data.pagination
      }))
    );
  }



  getEventById(id: number): Observable<EventItem> {
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<{ data: EventItem }>(`${this.apiUrl}/${id}`, { headers }).pipe(
      map(response => response.data)
    );
  }


  createEvent(event: any): Observable<EventItem> {
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<{ data: EventItem }>(this.apiUrl, event, { headers }).pipe(
      map(response => response.data)
    );
  }

  updateEvent(id: number, event: any): Observable<EventItem> {
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put<{ data: EventItem }>(`${this.apiUrl}/${id}`, event, { headers }).pipe(
      map(response => response.data)
    );
  }


  deleteEvent(id: number): Observable<DeleteEventResponse> {
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete<DeleteEventResponse>(`${this.apiUrl}/${id}`, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }
  
  getSessionsByEventId(eventId: number): Observable<SessionItem[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.getToken()}`
    });
    return this.http.get<SessionResponse>(`${this.apiUrlSession}?event_id=${eventId}`, { headers }).pipe(
      map(response => response.data)
    );
  }  
}
