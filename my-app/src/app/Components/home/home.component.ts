import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
}
