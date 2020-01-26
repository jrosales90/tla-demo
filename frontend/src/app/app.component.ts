import { Component } from '@angular/core';
import { ApiService } from './service/api.service'
import { Task } from 'src/app/models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public tasks: Task[];
  public task: Task;

  taskId: String;
  text: String;
  taskForm: FormGroup;
  filter: String;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.text = '';
    this.taskForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
    this.getTasks();
  }

  getTasks() {
    this.apiService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  taskDone(taskId) {
    this.taskUpdate(taskId, 'done');
  }

  taskToDo(taskId) {
    this.taskUpdate(taskId, 'to_do');  
  }

  deleteTask(taskId) {
    this.apiService.deleteTask(taskId).subscribe(data => {
      this.task = data;
      this.getTasks();
    });
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    var mTask: Task = this.taskForm.value;
    this.apiService.saveTask(mTask).subscribe(data => {
      this.getTasks();
    });

    this.taskForm.setValue({
      text: ''
    }); 
  }

  filterTasks(filter) {
    this.filter = filter;
    this.apiService.getFilteredTasks(filter).subscribe(data => {
      this.tasks = data;
    });
  }

  taskUpdate(taskId, status) {

    this.apiService.updateTask(taskId, {status: status}).subscribe(data => {
      this.task = data;
      this.getTasks();
    });
  }

}
