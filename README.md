# EvTec
Sistema con diseño en capas, creado con .Net Core y Angular para el registro y alta de usuarios, así como la administración de acceso y roles de estos. 

## Notas: 😼
> El proyecto trabaja usando First Code, debes ejecutar la conexión por consola usando la base de datos EvTec.

> El proyecto EvTec es el API encargado de dar el servicio (junto a la capa Datos, Negocio y utilidades).

> El proyecto WSEvTec es el Web service encargado de hacer las peticiones al API y mostrar el diseño(de prueba)

## Conexión a base por consola 🦇
> Si el usuario en SQL Server es de windows

PM> `Scaffold-DBContext "Server=localhost;Database=EvTec;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models`

> Si la cuenta es otra

PM> `Scaffold-DBContext "Server=localhost;Database=EvTec;User=sa;Password=contraseña;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models`

> Nuevos elementos como tablas(Opcional)

PM> `Scaffold-DBContext "Server=localhost;DataBase=EvTec;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force`

> El  `-outputDir` es porque sin el se genera en la raiz del proyecto y en este caso se queria generar en la carpeta llamada Models del proyecto.
