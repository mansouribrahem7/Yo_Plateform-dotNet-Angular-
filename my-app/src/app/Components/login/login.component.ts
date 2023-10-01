import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginDto } from 'src/app/Models/login-dto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loginModel!: LoginDto;
  constructor(
    private authService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.loginModel = {
      userName: '',
      password: '',
    };
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  loginStatus: string = 'pending';
  msg: string = 'invalid login';
  returnMsg() {
    return 'Invaild Login';
  }
  loginT() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.spinner.hide();

        // alert('Successfully logged in!');
        this.router.navigateByUrl('/home');
      },
      (err) => {
        this.spinner.hide();
        this.returnMsg();
        this.loginStatus = 'Faild';
        // alert('Invalid Login');
      }
    );
  }
}
