# EvTec
Sistema con dise帽o en capas, creado con .Net Core y Angular para el registro y alta de usuarios, as铆 como la administraci贸n de acceso y roles de estos. 

## Base de datos: 馃毀
> El proyecto trabaja usando Database First, as铆 que deberas ejecutar el archivo SQL llamado `EvTec.sql` para la creaci贸n de la base de datos junto a las tablas. 
> Una vez realizado el paso anterior, deberas ejecutar la conexi贸n por consola usando la base de datos EvTec(Descrito en el paso `Conexi贸n a base por consola`).  


## Notas: 馃樇
> El archivo EvTec.sql es el script sql para la creaci贸n de la base de datos.

> El proyecto EvTec es la aplicaci贸n en Angular encargado de hacer las peticiones al API y mostrar el dise帽o(de prueba).

> El proyecto WSEvTec es el el Web Service(API), encargado de dar el servicio (junto a la capa Datos, Negocio y utilidades). 

## Conexi贸n a base por consola 馃
> Si el usuario en SQL Server es de windows

PM> `Scaffold-DBContext "Server=localhost;Database=EvTec;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models`

> Si la cuenta es otra

PM> `Scaffold-DBContext "Server=localhost;Database=EvTec;User=sa;Password=contrase帽a;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models`

> Nuevos elementos como tablas(Opcional)

PM> `Scaffold-DBContext "Server=localhost;DataBase=EvTec;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force`

> El  `-outputDir` es porque sin el se genera en la raiz del proyecto y en este caso se queria generar en la carpeta llamada Models del proyecto.
