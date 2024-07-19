import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subject, catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    protected us: UserService,
    private route: Router
  ) {}
  userForm!: FormGroup;

  data: any = [];

  error$ = new Subject<string>();

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getError$ = this.error$.asObservable();

  getUser() {
    this.us
      .login(this.userForm.value)
      .pipe(
        catchError((err) => {
          this.error$.next(err.error.message);

          return of([]);
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.us.setUser(this.data.newUser);

        if (this.data.status === 'success') {
          this.route.navigateByUrl('dashboard');
        }
      });
  }
}
