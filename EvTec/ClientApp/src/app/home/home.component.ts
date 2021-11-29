import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Edituser, GetUsers } from '../Models/User';
import { ApiAltaService } from '../services/api-alta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  lst: GetUsers[];

  constructor(    
    private _apiAlta: ApiAltaService,
    private _router: Router)
  {
    this.lst = [];
    this.ObtenerUsuarios();    
  }

  //Ver todos los usuarios
  ObtenerUsuarios() {
    this._apiAlta.getUser().subscribe(resp => {
      console.log(resp);
      this.lst.push(resp);
    }, (error) => {
      console.log(error);
    });
  }

  //Enviar a editar usuario
  EditarUsuarios(model: Edituser) {
    //Enviamos los datos del model, para así recibirlos en "usuario.component.ts"
    this._router.navigate(['/usuario'], { state: { model } });    
  }

  //Desactivar usuario
  Desactivar(id: number) {
    this._apiAlta.deactivate(id).subscribe(resp => {
      this.lst = [];
      this.ObtenerUsuarios();      
    }, (error) => {
      console.log(error);
    });    
  }

}
