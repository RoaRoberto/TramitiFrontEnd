import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GeneralInfo } from './Models/GeneralInfo';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  login: boolean;
  presentacion ={body:{'color':'black'},navbar:{'background-color':'red','color':'#0063f280'}};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    const llogin = sessionStorage.getItem('login');
    if (llogin != undefined && llogin === 'true') {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  setEmpresa(generalInfo: GeneralInfo) {
      this.presentacion=generalInfo.style;
  }
}
