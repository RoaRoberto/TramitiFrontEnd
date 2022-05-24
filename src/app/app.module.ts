import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule, NgbNav, NgbNavbar} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { NuevaSolicitudComponent } from './nueva-solicitud/nueva-solicitud.component';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesProcesadasComponent } from './solicitudes-procesadas/solicitudes-procesadas.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from './toasts/toasts.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

export const appRoutes: Routes = [
  {path: 'nueva-solicitud', component: NuevaSolicitudComponent },
  {path: 'Solicitudes-pendientes', component: SolicitudesPendientesComponent} ,
  {path: 'solicitudes-procesadas', component: SolicitudesProcesadasComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NuevaSolicitudComponent,
    SolicitudesPendientesComponent,
    SolicitudesProcesadasComponent,
    HomeComponent,
    ToastsComponent,
    UploadfileComponent
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
