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

  AllTasks = new BehaviorSubject<Task[]>([])

  constructor(private taskService: TasksService) {
    this.addTodoList()
    this.addInProgressList()
    this.addFinishedList()
  }

  addTodoList() {
    this.taskService.getTasksByStatus(1).subscribe((data) => {
      this.todoList.next(data)
    })
  }

  addInProgressList() {
    this.taskService.getTasksByStatus(2).subscribe((data) => {
      this.inProgressList.next(data)
    })
  }

  addFinishedList() {
    this.taskService.getTasksByStatus(3).subscribe((data) => {
      this.finishedList.next(data)
    })
  }

  refreshList() {
    this.addTodoList()
    this.addInProgressList()
    this.addFinishedList()
  }

  getAllTasks() {
    this.taskService.getAlltask().subscribe((data) => {
      this.AllTasks.next(data)
    })
  }

  loadTasks() {
    return this.todoList.asObservable()
  }
}
