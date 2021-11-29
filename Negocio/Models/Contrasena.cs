using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Models
{
    public class Contrasena
    {
        [Required]
        public int Id { get; set; }

        [Required]        
        public string ContrasenaAntigua { get; set; }

        [Required]        
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._-])[A-Za-z@d$@$!%*?&].{10,}", ErrorMessage = "Debe contener una letra mayúscula, minúscula, un numero y un simbolo")]
        public string NuevaContrasena { get; set; }
    }
}
