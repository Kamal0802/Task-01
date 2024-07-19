import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    protected us: UserService,
    private router: Router
  ) {}

  userForm!: FormGroup;
  data: any = [];
  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getUser() {
    this.us.addUser(this.userForm.value).subscribe((data) => {
      this.userForm.reset();
      this.data = data;

      this.us.setUser(this.data.newUser);
      if (data) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
}
