using System;
using System.Collections.Generic;

#nullable disable

namespace EvTec.Models
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Correo { get; set; }
        public string Usuario1 { get; set; }
        public string Contrasena { get; set; }
        public bool Estatus { get; set; }
        public string Sexo { get; set; }
        public DateTime Fecha { get; set; }
    }
}
