import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.css']
})
export class KanbanListComponent {

  constructor(private taskService: TasksService) {
    this.loadTasks()
  }

  todo: string[] = [];

  inProgress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  finished = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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
    this.taskService.getTaskName().subscribe((data) => {
      this.todo = data
    })
  }
}
