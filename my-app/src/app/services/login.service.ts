import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../Models/login-dto';
import { LoginResponse } from '../Models/login-response';
import { Observable } from 'rxjs';
import { RegisterDto } from '../Models/register-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  res!: any;
  constructor(private http: HttpClient) {}
  login(model: LoginDto): Observable<LoginResponse> {
    console.log('Entered');

    this.res = this.http.post('https://localhost:44377/api/User/login', model);
    // console.log("ress service", this.res);

    return this.res;
  }

  register(model: RegisterDto): Observable<void> {
    return this.http.post<void>(
      'https://localhost:44377/api/User/register',
      model
    );
  }
  changeLoginState(state: boolean) {
    if (localStorage.length == 0) {
      state == false;
    } else {
      state == true;
    }
    return state;
  }
}
