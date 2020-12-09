import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success = false;
  registerForm: FormGroup
  listError: any = "";

  validation_messages = {
    'fullName': [
      {type: 'required', message: 'Full name được để trống.'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống.'}
    ],
    'username': [
      {type: 'required', message: 'Username không được để trống.'}
    ],
    'education': [
      {type: 'required', message: 'Education không được để trống.'}
    ],
    'skills': [
      {type: 'required', message: 'Skills không được để trống.'}
    ],
    'specialize': [
      {type: 'required', message: 'Chuyên ngành của giáo viên không được để trống.'}
    ],
    'experience': [
      {type: 'required', message: 'Experience không được để trống.'}
    ],
    'password': [
      {type: 'required', message: 'Password không được để trống.'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'ConfirmPassword không được để trống.'}
    ],
  }


  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.createFormRegister();
  }

  createFormRegister() {
    this.registerForm = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      education: new FormControl('', Validators.compose([
        Validators.required
      ])),
      skills: new FormControl('', Validators.compose([
        Validators.required
      ])),
      experience: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  onSubmitRegisters() {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe(data => {
        alert("Tạo tài khoản thành công");
        this.router.navigateByUrl("/login");
      }, error => {
        if (error.status === 400) {
          this.listError = error.error;
        }
      })
    }
  }
}
