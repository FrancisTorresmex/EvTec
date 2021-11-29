using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Models
{
    public class Auth
    {
        [Required]
        public string Correo { get; set; }

        [Required]
        public string Contrasena { get; set; }
    }
}
