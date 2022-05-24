import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AccountService } from '../services/account.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private acountService: AccountService,
    private appComponet: AppComponent,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loadGeneralInfo();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var response = await this.acountService.login(
      this.f['username'].value,
      this.f['password'].value
    );

    if (response !== 0) {
      sessionStorage.setItem('login', 'true');
      sessionStorage.setItem('empresaActual', response + '');
      this.appComponet.login = true;
      this.loading = true;
      this.toastService.show('Bienvenido', {
        classname: 'bg-success text-light',
        delay: 2000,
      });
      this.router.navigate(['home']);
    } else {
      console.log('Usuario invalido');
      this.toastService.show('Usuario Invalido', {
        classname: 'bg-danger text-light',
        delay: 1000,
      });
    }
  }
  loadGeneralInfo() {
    sessionStorage.clear();
    this.acountService.getGeneralInfo().subscribe((response) => {
      sessionStorage.setItem('empresas', JSON.stringify(response));
    });
  }
}
