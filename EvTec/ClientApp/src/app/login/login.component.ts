import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Auth } from "../Models/Auth";
import { ApiAuthService } from "../services/api-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  precionado: boolean = false;

  constructor(
    private _fromBldr: FormBuilder,
    private _router: Router,
    private _apiAuthService: ApiAuthService)
  {
    if (localStorage.getItem('sesion') != null) {
      this._router.navigate(['/inicio']);
    }
  }

  //Campos del formulario
  public loginForm = this._fromBldr.group({
    correo: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  //Error en caso de campos vacios
  get errorLlenado() {
    return this.loginForm.controls;
  }

  //Iniciar sesión
  iniciar() {
    this.precionado = true;
    if (this.loginForm.invalid) {
      return;
    }

    this._apiAuthService.login(this.loginForm.value).subscribe(resp => {

      localStorage.setItem('sesion', JSON.stringify(this.loginForm.value.correo));      
      this._router.navigate(['/inicio']);

    }, (error) => {
      console.log(error);
      alert(error['error']);
    });
  }

}
