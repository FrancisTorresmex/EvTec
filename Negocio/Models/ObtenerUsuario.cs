using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Models
{
    public class ObtenerUsuario
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Correo { get; set; }

        [Required]
        public string Usuario1 { get; set; }

        [Required]
        public string Contrasena { get; set; }

        [Required]
        public bool Estatus { get; set; }

        [Required]
        public string Sexo { get; set; }
    }
}
