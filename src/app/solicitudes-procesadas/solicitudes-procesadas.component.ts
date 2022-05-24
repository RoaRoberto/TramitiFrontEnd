import { Component, OnInit } from '@angular/core';
import { AplicationService } from '../services/application.service';


@Component({
  selector: 'app-solicitudes-procesadas',
  templateUrl: './solicitudes-procesadas.component.html',
  styleUrls: ['./solicitudes-procesadas.component.css']
})
export class SolicitudesProcesadasComponent implements OnInit {

  form_template: any[];
  applications: any[];

  constructor(private aplicationService: AplicationService) {}

  async ngOnInit() {
    await this.load();
  }
  async load() {
    this.applications = await this.aplicationService.GetAplicationByState(
      'processed'
    );
    this.form_template = this.getrow(this.applications[0]);
  }

  getrow(applicationItem) {

    if (applicationItem) {
      return Object.entries(applicationItem);
    }
    return [];
  }

  public get Data(): any {
    if (this.applications) {
      return this.applications.map((x) => this.getrow(x));
    }
    return [];
  }
  async deleteData(id) {
    console.log('eliminar el item :' + id);
    await this.aplicationService.DeleteAplication(id);
    await this.load();
  }
}
