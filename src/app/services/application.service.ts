import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralInfo } from '../Models/GeneralInfo';
import { promise } from 'protractor';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root',
})
export class AplicationService {
  constructor(private http: HttpClient) {}

  async getFormAplication(id: string) {
    return await new Promise<any[]>((resolve, reject) => {
      this.http
        .get<any[]>(`${environment.AplicationLocalUrl}`)
        .subscribe((response) => {
          var empresa = response.find((x: any) => x.idempresa === Number(id));
          var aplicationStorageJson = sessionStorage.getItem('aplication');
          if (aplicationStorageJson == null) {
            sessionStorage.setItem('aplication', '[]');
          }
          resolve(empresa.form);
        });
    });
  }

  async AddAplication(aplication: any) {
    var aplicationStorageJson = sessionStorage.getItem('aplication');
    var aplicationStorage = JSON.parse(aplicationStorageJson);
    aplicationStorage.push(aplication);
    sessionStorage.setItem('aplication', JSON.stringify(aplicationStorage));
  }
  async AddAplicationList(aplication: any[]) {
    var aplicationStorageJson = sessionStorage.getItem('aplication');
    var aplicationStorage = JSON.parse(aplicationStorageJson) as any[];
    aplicationStorage = aplicationStorage.concat(aplication);
    sessionStorage.setItem('aplication', JSON.stringify(aplicationStorage));
  }

  async AddAplicationListFromExcel(aplication: any[]) {
    var aplicationStorageJson = sessionStorage.getItem('aplication');
    var aplicationStorage = JSON.parse(aplicationStorageJson) as any[];
    aplicationStorage = aplication;
    sessionStorage.setItem('aplication', JSON.stringify(aplicationStorage));
  }
  async DeleteAplication(id: string) {
    var aplicationStorageJson = sessionStorage.getItem('aplication');
    var aplicationStorage = JSON.parse(aplicationStorageJson);
    var index = aplicationStorage.findIndex(function (o) {
      return o.id === id;
    });
    if (index !== -1) aplicationStorage.splice(index, 1);
    sessionStorage.setItem('aplication', JSON.stringify(aplicationStorage));
  }

  async GetAplicationByState(state: string) {
    var aplicationStorageJson = sessionStorage.getItem('aplication');
    var aplicationStorage = JSON.parse(aplicationStorageJson);
    return await new Promise<any[]>((resolve, reject) => {
      var response = aplicationStorage.filter((x) => x.state === state);
      resolve(response);
    });
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
