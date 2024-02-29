import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksDropService } from 'src/app/services/tasks-drop.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {

  taskForm: FormGroup = this.fb.group({
    name: [''],
    status: [1]
  })

  constructor(
    private taskservice: TasksService,
    private tasksDropService: TasksDropService,
    private fb: FormBuilder
    ) {}

  createTask() {
    this.taskservice.addNewTask(this.taskForm.value).subscribe((() => {
      console.log(this.taskForm.value)
      this.tasksDropService.addTodoList()
      this.taskForm.patchValue({
        name: '',
        status: 1
      })
    }))
  }
}
