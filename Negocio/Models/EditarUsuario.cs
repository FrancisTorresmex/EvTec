using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Models
{
    public class EditarUsuario
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [RegularExpression("^[a-z0-9_\\+-]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$", ErrorMessage = "Estructura de correo no valida")]
        public string Correo { get; set; }

        [Required]
        [MinLength(7)]
        public string Usuario1 { get; set; }                

        [Required]
        public string Sexo { get; set; }
    }
}
