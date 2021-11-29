import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  existeStorage = false;

  constructor(private _router: Router) {
    this.existenciaStorage();    
  }

  ngOnInit() {
    this.existeStorage;
    this.existenciaStorage();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  //Comprobar si existe el storage para ocultar el menú
  //aún asi existe la protección del authguard para evitar acceder a paginas sin inicio
  existenciaStorage() {
    if (localStorage.getItem('sesion') != null) {
      this.existeStorage = true;
    }    
  }
 

  cerrarSesion() {
    localStorage.removeItem('sesion');
    this.existeStorage = false;
    this._router.navigate(['/']);
  }
}
