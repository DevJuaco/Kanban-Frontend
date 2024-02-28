import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { TasksService } from './tasks.service';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksDropService {

  todoList = new BehaviorSubject<Task[]>([])
  inProgressList = new BehaviorSubject<Task[]>([])
  finishedList = new BehaviorSubject<Task[]>([])

  constructor(private taskService: TasksService) {
    this.addTodoList()
    this.addInProgressList()
    this.addFinishedList()
  }

  addTodoList() {
    this.taskService.getTasksByStatus(1).subscribe((data) => {
      //const taskName = data.map(task => task.name)
      this.todoList.next(data)
    })
  }

  addInProgressList() {
    this.taskService.getTasksByStatus(2).subscribe((data) => {
      //const taskName = data.map(task => task.name)
      this.inProgressList.next(data)
    })
  }

  addFinishedList() {
    this.taskService.getTasksByStatus(3).subscribe((data) => {
      //const taskName = data.map(task => task.name)
      this.finishedList.next(data)
    })
  }

  loadTasks() {
    return this.todoList.asObservable()
  }
}
