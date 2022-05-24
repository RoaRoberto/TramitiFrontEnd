import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GeneralInfo } from '../Models/GeneralInfo';
import { AccountService } from '../services/account.service';
import { AplicationService } from '../services/application.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  empresa: GeneralInfo;
  id: string;
  constructor(
    private app: AppComponent,
    private aplicationService: AplicationService,
    private router: Router,
    private accountService: AccountService,
    public toastService: ToastService
  ) {}

  async ngOnInit() {
    this.id = sessionStorage.getItem('empresaActual');
    if (this.id === undefined) {
      this.router.navigate(['']);
      sessionStorage.clear();
    } else {
      this.empresa = await this.accountService.getEmpresa(Number(this.id));
      this.app.setEmpresa(this.empresa);
    }
  }
  async generarDatosAleatoreos() {
    try {
      var aplications = await this.aplicationService.getFormAplication(this.id);
    var testAplication = [];
    for (let index = 0; index < 100; index++) {
      let item: any = {};
      aplications.forEach((i: any) => {
        switch (i.componentType) {
          case 'input':
          case 'hide':
            item[i.columnName] = 'dato_' + (index + 1);
            break;
          case 'select':
            item[i.columnName] = i.options[0];
            break;

          default:
            break;
        }
      });
      item.id = this.aplicationService.generateId();
      item.state =
        index % 2 === 0
          ? 'Awaiting'
          : index % 3 === 0
          ? 'processed'
          : 'historical';
      testAplication.push(item);
    }
    await this.aplicationService.AddAplicationList(testAplication);
    this.toastService.show('Se han generado datos de forma aleatorea, por favor mire los diferentes menus', {
      classname: 'bg-success text-light',
      delay: 5000,
    });
    } catch (error) {
      this.toastService.show('Se ha presentado un error generando los datos aleatoreos', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }
  }

  async uploadDataEvent(data) {
    await this.aplicationService.AddAplicationListFromExcel(data);
  }
}
