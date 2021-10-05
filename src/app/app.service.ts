import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Form} from './app.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AppService {

  private apiUrl = '';

  constructor(private http: HttpClient) {}

  create(newForm: Form): Observable<Form> {
    console.log('OK', newForm);
    return this.http.post<Form>(this.apiUrl, newForm);
  }

}
