import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModificarPassword, Pass } from '../Models/password';
import { AddUser, Edituser, GetUsers } from '../Models/User';


const httpOption = { //objeto headers
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'    
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiAltaService {  

  url: string = 'https://localhost:44366/Alta';  

  constructor(private _http: HttpClient) { }

  //Ver los usuarios
  getUser(): Observable<GetUsers> {
    return this._http.get<GetUsers>(this.url);
  }

  //Agregar nuevo usuario
  add(model: AddUser): Observable<AddUser> {
    return this._http.post<AddUser>(this.url, model, httpOption);
  }

  //Editar usuario
  edit(model: Edituser): Observable<Edituser> {
    return this._http.put<Edituser>(this.url, model, httpOption);
  }

  //Editar contraseña
  editPassword(model: Pass): Observable<Pass> {
    return this._http.put<Pass>(`${this.url}/Contrasena`, model, httpOption);
  }

  //Desactivar cuenta
  deactivate(id: number): Observable<any> {
    return this._http.put<any>(`${this.url}/Desactivar?id=${id}`,httpOption);
  }

}
