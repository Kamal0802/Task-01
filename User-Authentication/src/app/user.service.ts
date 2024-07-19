import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // error$ !: Subject<string>

  // getError$=this.error$.asObservable()

  user: any = [];

  setUser(data: any) {
    this.user = data;
  }

  getUser() {
    return this.user;
  }

  addUser(data: any) {
    return this.http.post('http://localhost:3000/user/signup', data);
  }

  login(data: any) {
    return this.http.post('http://localhost:3000/user/login', data);
  }
}
