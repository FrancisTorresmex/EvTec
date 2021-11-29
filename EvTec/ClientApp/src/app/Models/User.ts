export interface GetUsers {
  correo: string,
  usuario1: string,  
  estatus: boolean,
  sexo: string
}

export interface AddUser {
  correo: string,
  usuario1: string,
  contrasena: string,
  estatus: boolean,
  sexo: string
}

export interface Edituser {
  id: number,
  correo: string,
  usuario1: string,    
  sexo: string
}
