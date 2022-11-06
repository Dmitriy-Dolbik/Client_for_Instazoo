import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }
  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    })
  }
  submit(): void {
    console.log(this.registerForm.value);
    this.authService.register({
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      name: this.registerForm.value.name,
      lastname: this.registerForm.value.lastname,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('SuccessFully Registered!');
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}

