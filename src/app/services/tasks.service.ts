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

  getTaskName(): Observable<string[]> {
    return this.getAlltask().pipe(
      map(tasks => tasks.map(task => task.name))
    )
  }
}
