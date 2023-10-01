import { Component, Input, OnInit } from '@angular/core';
import { UserData } from './Models/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor() {}

  ngOnInit(): void {}
}
