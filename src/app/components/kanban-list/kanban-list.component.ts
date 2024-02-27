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

  constructor(private taskService: TasksService, private tasksDropService: TasksDropService) {
    this.loadTasks()
  }

  todo: string[] = []

  inProgress: string[] = []

  finished: string[] = []

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  loadTasks() {
    this.tasksDropService.todoList.subscribe((todo: string[]) => {
      console.log(todo)
      this.todo = todo
    })
  }

  onDragStarted(item: any, list: string) {
    console.log(`Se ha comenzado a arrastrar el elemento ${item.name} de la lista ${list}`);
  }

  onDragEnded(item: any, list: string) {
    console.log(`Se ha terminado de arrastrar el elemento ${item.name} de la lista ${list}`);
  }
}
