import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks";

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task[]> {
    const deleteUrl = `${this.apiUrl}/${task.id}`
    return this.http.delete<Task[]>(deleteUrl);
  }

  toggleTask(task: Task): Observable<Task[]> {
    const putUrl = `${this.apiUrl}/${task.id}`;
    task.reminder = !task.reminder;

    return this.http.put<Task[]>(putUrl, task);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
