# EvTec
Sistema con diseño en capas, creado con .Net Core y Angular para el registro y alta de usuarios, así como la administración de acceso y roles de estos. 

## Base de datos: 🚧
> El proyecto trabaja usando First Code, así que deberas ejecutar el archivo SQL llamado `EvTec.sql` para la creación de la base de datos junto a las tablas. 
> Una vez realizado el paso anterior, deberas ejecutar la conexión por consola usando la base de datos EvTec(Descrito en el paso `Conexión a base por consola`).  


## Notas: 😼
> El archivo EvTec.sql es el script sql para la creación de la base de datos.

> El proyecto EvTec es la aplicación en Angular encargado de hacer las peticiones al API y mostrar el diseño(de prueba).

> El proyecto WSEvTec es el el Web Service(API), encargado de dar el servicio (junto a la capa Datos, Negocio y utilidades). 

## Conexión a base por consola 🦇
> Si el usuario en SQL Server es de windows

PM> `Scaffold-DBContext "Server=localhost;Database=EvTec;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models`

> Si la cuenta es otra

PM> `Scaffold-DBContext "Server=localhost;Database=EvTec;User=sa;Password=contraseña;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models`

> Nuevos elementos como tablas(Opcional)

PM> `Scaffold-DBContext "Server=localhost;DataBase=EvTec;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force`

> El  `-outputDir` es porque sin el se genera en la raiz del proyecto y en este caso se queria generar en la carpeta llamada Models del proyecto.
