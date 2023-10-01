import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (localStorage.length == 0) {
      this.loggedIn = false;
      console.log(this.loggedIn);
    } else {
      this.loggedIn = true;
      console.log(this.loggedIn);
    }
  }
  loggedIn: boolean = true;

  Logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigateByUrl('/home');
  }
  Login() {
    this.loggedIn = true;
    this.router.navigateByUrl('/login');
  }
}
