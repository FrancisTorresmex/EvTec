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
    public class AuthController : ControllerBase
    { 
        [HttpPost]
        public async Task<IActionResult> Login(Auth model)
        {
            using (EvTecContext db = new EvTecContext())
            {
                try
                {
                    if (!ModelState.IsValid) return BadRequest("Elementos no validos");

                    var encriptarContra = Encriptar.ConvertirSHA256(model.Contrasena); //Encriptamos la contraseña recibida
                    var usuario = db.Usuarios.Where(i => i.Correo == model.Correo && i.Contrasena == encriptarContra).FirstOrDefault();

                    if(usuario == null)
                        return NotFound("Correo o contraseña incorrectos");

                    //De estar inactivo el usuario ya no podra acceder hasta que otro usuario le cambie el estatus
                    if (usuario.Estatus == false)
                        return NotFound("El usuario esta inactivo");

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
