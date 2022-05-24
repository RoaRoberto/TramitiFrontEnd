import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  constructor(private router: Router, private appComponent: AppComponent) {}

  ngOnInit(): void {}
  logout() {
    this.appComponent.login = false;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
