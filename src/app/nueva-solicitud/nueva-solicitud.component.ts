import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AplicationService as AplicationService } from '../services/application.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css'],
})
export class NuevaSolicitudComponent implements OnInit {

  form_template: any[];

  myFormGroup: FormGroup;
  id: string;

  constructor(private aplicationService: AplicationService,private toastService: ToastService) {}

  async ngOnInit() {
    this.id = sessionStorage.getItem('empresaActual');
    this.form_template = await this.aplicationService.getFormAplication(
      this.id
    );
    let group = {};
    // debugger;
    this.form_template.forEach((input_template) => {
      group[input_template.columnName] = new FormControl('');
    });
    this.myFormGroup = new FormGroup(group);
  }
  async onSubmit() {
    try {
      var form = this.myFormGroup.value;
      form.id = this.aplicationService.generateId();
      form.state = 'Awaiting';
      await this.aplicationService.AddAplication(this.myFormGroup.value);
      this.myFormGroup.reset();
      this.toastService.show(
        'Se ha creado la solicitud correctamente, por favor mire el menu solicitudes pendientes',
        {
          classname: 'bg-success text-light',
          delay: 2000,
        }
      );
    } catch (error) {
      this.toastService.show(
        'Se ha presentado un error creando la solicitud',
        {
          classname: 'bg-danger text-light',
          delay: 2000,
        }
      );
    }
  }

  public get PropertiesTemplate(): any[] {
    return this.form_template.filter((x: any) => x.componentType !== 'hide');
  }
  public get PropertiesTemplateHide(): any[] {
    return this.form_template.filter((x: any) => x.componentType === 'hide');
  }
}
