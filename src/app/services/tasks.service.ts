import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/task';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  BASE_URL: string = environment.baseUrl

  constructor(private http: HttpClient){

  }

  getAlltask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/tasks`)
  }

  getTasksByStatus(status: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/tasks/status/${status}`)
  }

  addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.BASE_URL}/tasks`, task)
  }

  updateTask(taskId: string, task: Task) {
    return this.http.put<Task>(`${this.BASE_URL}/tasks/${taskId}`, task)
  }
}
