import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TasksDropService {

  todoList = new BehaviorSubject<string[]>([])
  inProgressList = new BehaviorSubject<string[]>([])
  finishedList = new BehaviorSubject<string[]>([])

  constructor(private taskService: TasksService) {
    this.getTaskList()
  }

  getTaskList () {
    this.taskService.getTaskName().subscribe((data) => {
      this.todoList.next(data)
    })
  }

  loadTasks() {
    return this.todoList.asObservable()
  }

}
