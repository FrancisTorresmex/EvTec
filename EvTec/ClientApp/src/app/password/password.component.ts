import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModificarPassword, Pass } from "../Models/password";
import { ApiAltaService } from "../services/api-alta.service";


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
})
export class PasswordComponent {

  passwordForm!: FormGroup;

  precionado: boolean;
  contIguales = false;

  contieneDatos: any = null;

  constructor(private _router: Router, private _apiAltaService: ApiAltaService, private _formBldr: FormBuilder) {

    this.precionado = false;    

    //Obtenermos los datos recibidos de "usuario.component.ts" y los asigno a contieneDatos
    this.contieneDatos = this._router.getCurrentNavigation().extras.state;        

    //Si contieneDatos es null, significa que no deberia estar aqui
    if (this.contieneDatos == null)
      this._router.navigate(['/inicio']);

    this.llenarCampos();    

    //Validar contraseñas iguales
    this.passwordForm.valueChanges.subscribe(result => {
      if (result['nuevaContrasena'] == result['rContrasena']) {
        this.contIguales = true;        
      }
      else {
        this.contIguales = false;
      }
    });
  }

  ngOnInit() { }

  //Error en caso de campos vacios
  get errorLlenado() {

    return this.passwordForm.controls;
  }

  //Rellenar los campos
  llenarCampos() {
    
    this.passwordForm = this._formBldr.group({
      id: [this.contieneDatos.id, Validators.required],
      contrasenaAntigua: ['', Validators.required],
      nuevaContrasena: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._-])[A-Za-z\d$@$!%*?&].{10,}'),]],
      rContrasena: ['', [Validators.required]]
    });    
  }

  //Enviar datos
  cambiarContra() {

    this.precionado = true;
    if (this.passwordForm.invalid || this.contIguales == false) {
      return;
    }        

    const dato: Pass = {
      id: this.passwordForm.value.id,
      contrasenaAntigua: this.passwordForm.value.contrasenaAntigua,
      nuevaContrasena: this.passwordForm.value.nuevaContrasena
    };    

    this._apiAltaService.editPassword(dato).subscribe(resp => {      
      this._router.navigate(['/inicio']);
      alert('Contraseña modificada correctamente');
    }, (error) => {
      alert(error['error']);
    });
  }

}
