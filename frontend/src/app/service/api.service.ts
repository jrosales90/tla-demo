import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';

const URL_PREFIX = '/api/task/';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) {

  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${URL_PREFIX}`);
  }

  getFilteredTasks(filter): Observable<Task[]> {
    const stringParams = 'filter='.concat(filter);
    const params = new HttpParams({fromString: stringParams});
    const options = { params };
    return this.http.get<Task[]>(`${URL_PREFIX}`, options);
  }

  saveTask(task: Task):Observable<Task> {
    return this.http.post<Task>(`${URL_PREFIX}`, task);
  }

  updateTask(taskId, params): Observable<Task> {
    var url = `${URL_PREFIX}`;
    url = url.concat(taskId);
    return this.http.put<Task>(url, params);
  }

  deleteTask(taskId): Observable<Task> {
    var url = `${URL_PREFIX}`;
    url = url.concat(taskId);
    return this.http.delete<Task>(url);
  } 

}
