using EvTec.Models;
using Microsoft.AspNetCore.Mvc;
using Negocio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utilidades;

namespace EvTec.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AltaController : ControllerBase
    {   
        //Ver usuarios
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using(EvTecContext db = new EvTecContext())
            {
                try
                {
                    if (!ModelState.IsValid)
                        return BadRequest("Modelo invalido");

                    List<ObtenerUsuario> lst = new List<ObtenerUsuario>();
                    
                    //Se recorre con foreach para ir agregando solo los datos que necesito mostrar
                    foreach (var item in db.Usuarios.ToList())
                    {
                        ObtenerUsuario user = new ObtenerUsuario
                        {
                            Id = item.Id,
                            Correo = item.Correo,
                            Usuario1 = item.Usuario1,
                            Contrasena = item.Contrasena,
                            Estatus = item.Estatus,
                            Sexo = item.Sexo,                            
                        };
                        lst.Add(user);
                    }                    
                    return Ok(lst);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        //Agregar usuario
        [HttpPost]
        public async Task<IActionResult> Add(ObtenerUsuario model)
        {
            using (EvTecContext db = new EvTecContext())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest("Modelo invalido");
                    }

                    //Buscar si existe ya el usuario o contraseña
                    var search = db.Usuarios.Where(s => s.Correo == model.Correo || s.Usuario1 == model.Usuario1).FirstOrDefault();
                    var usuario = new Usuario();

                    if (search != null)
                    {
                        return Ok("El usuario o contraseña ya existen");
                    }

                    //De no exisitir se crea
                    usuario.Usuario1 = model.Usuario1;
                    usuario.Contrasena = Encriptar.ConvertirSHA256(model.Contrasena); //Se encripta la contraseña
                    usuario.Estatus = model.Estatus;
                    usuario.Sexo = model.Sexo;
                    usuario.Fecha = DateTime.Now;
                    usuario.Correo = model.Correo;

                    db.Usuarios.Add(usuario);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }        

        //Modificar usuario
        [HttpPut]
        public async Task<IActionResult> Edit(EditarUsuario model)
        {
            using (EvTecContext db = new EvTecContext())
            {
                try
                {
                    if (!ModelState.IsValid) return BadRequest("Modelo invalido");

                    Usuario usuario = await db.Usuarios.FindAsync(model.Id);                    

                    if (usuario != null)
                    {                                                
                        usuario.Id = usuario.Id;
                        usuario.Correo = model.Correo;
                        usuario.Usuario1 = model.Usuario1;                        
                        usuario.Sexo = model.Sexo;                        

                        db.Usuarios.Update(usuario);
                        await db.SaveChangesAsync();
                        return Ok();                        
                    }
                    return NotFound("No encontrado");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }


        //Modificar contraseña
        [HttpPut("Contrasena")]
        public async Task<IActionResult> EditPassword(Contrasena model)
        {
            using (EvTecContext db = new EvTecContext())
            {
                try
                {
                    if (!ModelState.IsValid) return BadRequest("Completa los requerimientos");

                    Usuario usuario = db.Usuarios.Find(model.Id);
                    if (usuario == null) return NotFound("Usuario no encontrado");

                    var encriptar = Encriptar.ConvertirSHA256(model.ContrasenaAntigua);
                    if (usuario.Contrasena != encriptar) return BadRequest("Contraseña incorrecta");

                    string encriptarNueva = Encriptar.ConvertirSHA256(model.NuevaContrasena); //encriptar la nueva contraseña
                    usuario.Contrasena = encriptarNueva;

                    db.Usuarios.Update(usuario);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }


        //Desactivar usuario
        [HttpPut("Desactivar")]
        public async Task<IActionResult> Desactive(int id)
        {
            using(EvTecContext db = new EvTecContext())
            {
                try
                {
                    Usuario usuario = await db.Usuarios.FindAsync(id);
                    if(usuario == null)
                    {
                        return NotFound("No encontrado");
                    }
                    //En este caso como solo se quiere desactivar, en lugar de crear modelos se opto por esto
                    usuario.Estatus = !usuario.Estatus;

                    db.Usuarios.Update(usuario);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
    }
}
