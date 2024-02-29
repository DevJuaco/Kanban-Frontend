import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TasksDropService } from 'src/app/services/tasks-drop.service';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2'

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

  const taskId = event.item.data.id
  const taskName = event.item.data.name
  
  console.log('id de la tarea ' + taskId)

  switch (listName) {
    case 'todo':
      console.log('item movido a array todo')
      this.updateTaskStatus(taskId, {name: taskName, status: 1})
    break;
    
    case 'inProgress':
      console.log('iem movido a inprogress')
      this.updateTaskStatus(taskId, {name: taskName, status: 2})
      break;

    case 'finished':
      console.log('item movido a finished')
      this.updateTaskStatus(taskId, {name: taskName, status: 3})
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

  updateTaskStatus(taskId: string, task: Task) {
    this.taskService.updateTask(taskId, task).subscribe((data) => {
      console.log(data)
    })
  }

  deleteTask(id?: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(() => {
          this.tasksDropService.refreshList()
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

}
