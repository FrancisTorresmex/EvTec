import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddUser, Edituser} from "../Models/User";
import { ApiAltaService } from "../services/api-alta.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  precionado = false;
  contIguales = false;

  contieneDatos: any = null;

  usuario!: FormGroup;
  passwords!: FormGroup;

  constructor(
    private _formBldr: FormBuilder, private _apiAlta: ApiAltaService, private _router: Router) {

    //Obtenermos los datos recibidos de "home.component.ts" y los asigno a contieneDatos
    this.contieneDatos = this._router.getCurrentNavigation().extras.state;    
    
    this.llenarDatos();

    //Validar contraseñas iguales
    this.usuario.valueChanges.subscribe(result => {
      if (result['contrasena'] == result['rContrasena']) {
        this.contIguales = true;        
      }
      else {
        this.contIguales = false;
      }
    });
}


  ngOnInit() {}  

  //Error en caso de campos vacios
  get errorLlenado() {
    return this.usuario.controls;
  }


  //Llenar formGrup según sea modificar o agregar usuario
  llenarDatos() {    

    if (this.contieneDatos != null) {
      this.contieneDatos = this._router.getCurrentNavigation().extras.state.model;
      //this.contIguales = true;

      this.usuario = this._formBldr.group({
        correo: [this.contieneDatos.correo, [Validators.required, Validators.email]],
        usuario: [this.contieneDatos.usuario1, [Validators.required, Validators.minLength(7)]],        
        sexo: [this.contieneDatos.sexo, Validators.required]
      });
    } else {
      this.usuario = this._formBldr.group({
        correo: ['', [Validators.required, Validators.email]],
        usuario: ['', [Validators.required, Validators.minLength(7)]],
        //Validamos que la cadena tenga letras may, min, num, simbolo
        contrasena: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._-])[A-Za-z\d$@$!%*?&].{10,}'),]],
        rContrasena: ['', [Validators.required]],
        estatus: ['', Validators.required],
        sexo: ['', Validators.required]
      });      
    }
  }


  //Enviar petición para crear o modificar usuario
  disenarUsuario() {

    this.precionado = true;
    if (this.usuario.invalid || this.contIguales == false) {
      return;
    }

    //Convertimos el valor de estatus a booleano (sin esto genera un error al convertirlo)
    const estatusConv = this.usuario.value['estatus'] === "true" ? true : false;         

    //Si se tenian datos cargados se usa metodo edit, de lo contrario se usa el metodo add
    if (this.contieneDatos != null) {

      const editar: Edituser = {
        id: this.contieneDatos.id,
        correo: this.usuario.value['correo'],
        usuario1: this.usuario.value['usuario'],
        sexo: this.usuario.value['sexo'],
      };

      this._apiAlta.edit(editar).subscribe(resp => {
        alert("Se modifico correctamente");
        this._router.navigate(['/inicio']);
      }, (error) => {
        alert(error['error']);
      });

    } else {
      this.contIguales = false;
      const crear: AddUser = {        
        correo: this.usuario.value['correo'],
        usuario1: this.usuario.value['usuario'],
        contrasena: this.usuario.value['contrasena'],
        estatus: estatusConv,
        sexo: this.usuario.value['sexo'],
      };

      this._apiAlta.add(crear).subscribe(resp => {
        alert("Se creo éxitosamente");
        this._router.navigate(['/inicio']);
      }, (error) => {
        alert(error['error']['text']);
      });
    }        
  }

  //Modificar contraseña
  EditContrasena() {
    //enviamos los datos a "ModificarPassword.component.ts"
    this._router.navigate(['/password'], { state: this.contieneDatos });
  }
}
