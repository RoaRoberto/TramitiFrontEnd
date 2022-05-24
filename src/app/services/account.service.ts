import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralInfo } from '../Models/GeneralInfo';
import { promise } from 'protractor';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getGeneralInfo() {
    return this.http.get<GeneralInfo[]>(`${environment.GeneralLocalUrl}`);
  }
  async login(userName: string, password: string): Promise<number> {
    var generalInfoJson = sessionStorage.getItem('empresas');
    var generalInfo = JSON.parse(generalInfoJson) as GeneralInfo[];
    var idEmpresa = 0;
    var BreakException = {};
    return await new Promise<number>((resolve, reject) => {
      try {
        generalInfo.forEach((itemEmpresa) => {
          var user = itemEmpresa.users.find(
            (i) => i.password == password && i.user == userName
          );
          if (user != null) {
            idEmpresa = itemEmpresa.id;
            throw BreakException;
          }
        });
      } catch (e) {
        resolve(idEmpresa);
      }
      resolve(idEmpresa);
    });
  }

  async getEmpresa(id: number): Promise<GeneralInfo> {
    var generalInfoJson = sessionStorage.getItem('empresas');
    var generalInfo = JSON.parse(generalInfoJson) as GeneralInfo[];
    return await new Promise<GeneralInfo>((resolve, reject) => {
      var empresa = generalInfo.find((i) => i.id === id);
      resolve(empresa);
    });
  }
}
