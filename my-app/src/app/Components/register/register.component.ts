import { Component, OnInit } from '@angular/core';
import { RegisterDto } from 'src/app/Models/register-dto';
import { UserData } from 'src/app/Models/user-data';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteReuseStrategy, Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/Interceptor/auth.interceptor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userModel!: RegisterDto;
  regiserForm: any;

  public get userName() {
    return this.regiserForm.controls['userName'];
  }

  public get email() {
    return this.regiserForm.controls['email'];
  }

  public get password() {
    return this.regiserForm.controls['password'];
  }
  constructor(
    private userfService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userModel = {
      userName: '',
      password: '',
      email: '',
    };
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.regiserForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  // validation
  alreadyTaken: boolean = false;
  //emailMsg: string = '';
  Register() {
    this.userfService.register(this.regiserForm.value).subscribe(
      (resp) => {
        console.log('response from register', resp);

        this.router.navigateByUrl('/login');

        console.log(resp);
      },
      (err) => {
        if (err.error[0].code === 'DuplicateEmail') {
          console.log('Mans is dup');

          this.alreadyTaken = true;

          //this.emailMsg = err.error[0].description;
        }
        console.log('err from register', err.error[0].description);
        let errArr: String[] = [];
        err.error.map((err) => {
          errArr.push(`${err.description}\n`);
        });
        alert(errArr);

        console.log(err);
      }
    );
  }
}
