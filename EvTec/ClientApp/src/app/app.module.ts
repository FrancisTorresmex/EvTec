import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';


import { UsuarioComponent } from '../app/usuario/usuario.component';
import { LoginComponent } from '../app/login/login.component';
import { PasswordComponent } from "../app/password/password.component";

import { AuthGuard } from './security/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,    
    UsuarioComponent,
    LoginComponent,
    PasswordComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
      { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
