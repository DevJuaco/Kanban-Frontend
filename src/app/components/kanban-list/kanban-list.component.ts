import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task, Todo } from 'src/app/interfaces/task';
import { TasksDropService } from 'src/app/services/tasks-drop.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.css']
})
export class KanbanListComponent {

  tasks!: Task[]

  constructor(private taskService: TasksService, private tasksDropService: TasksDropService) {

    this.loadAllTask()
    this.loadTodoTasks()
    this.loadInProgressTasks()
    this.loadFinishedTasks()

    console.log(this.tasks)
  }

  todo: Task[] = []

  inProgress: Task[] = []

  finished: Task[] = []

  drop(event: CdkDragDrop<Task[]>, listName: string) {

  switch (listName) {
    case 'todo':
      console.log('item movido a array todo')
      //this.taskService.updateTask()
      break;
    case 'inProgress':
      console.log('iem movido a inprogress')
      break;
    case 'finished':
      console.log('item movido a finished') 
  }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  loadAllTask() {
    this.taskService.getAlltask().subscribe((data) => {
      this.tasks = data
      console.log(this.tasks)
    })
  }


  loadTodoTasks() {
    this.tasksDropService.todoList.subscribe((todo: Task[]) => {
      console.log(todo)
      this.todo = todo
    })
  }

  loadInProgressTasks() {
    this.tasksDropService.inProgressList.subscribe((inProgress: Task[]) => {
      console.log(inProgress)
      this.inProgress = inProgress
    })
  }

  loadFinishedTasks() {
    this.tasksDropService.finishedList.subscribe((finished: Task[]) => {
      console.log(finished)
      this.finished = finished
    })
  }
}
