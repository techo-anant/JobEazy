import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/newJob.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveJob(job: Job): Observable<{ success: boolean; filepath: string }> {
    return this.http.post<{ success: boolean; filepath: string }>(
      `${this.API_URI}/save-form`,
      job
    );
  }

  listJob(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URI}/list-forms`);
  }

  getJob(filename: string): Observable<Job> {
    return this.http.get<Job>(`${this.API_URI}/form/${filename}`)
  }
}
