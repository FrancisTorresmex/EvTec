import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Auth } from "../Models/Auth";
import { map } from 'rxjs/operators'; 



const httpOption = { //objeto headers
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  url: string = 'https://localhost:44366/Auth';

  constructor(private _http: HttpClient) { }

  //Iniciar sesión
  login(model: Auth): Observable<Auth> {    
    return this._http.post<Auth>(this.url, model, httpOption);    
  }
}
