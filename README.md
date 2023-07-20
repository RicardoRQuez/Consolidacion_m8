# DESCRIPCIÓN DEL PROYECTO
El proyecto consiste en la ejecucion de un CRUD.
Tenemos le modelo Users y el modelo bootcamp, donde un usuarios puede tener muchos bootcamps y a su vez los bootcamp pueden tener muchos usuarios, por lo que se le denominaria una relacion de muchos a muchos. El codigo se programo de tal manera que pueda ejecutarse a traves de POSTMAN o directamente en el navegador.

Desde POSTMAN se puede crear, leer, actualizar y eliminar tanto usuarios como bootcamps.
Mientras que desde el navegador se podran ver los Bootcamp y crear un usuario de manera publica. Para la visualizacion, edicion y eliminacion de usuarios neesitara un token. Y para la creacion y asociacion entre bootcamps y usuarios necesitara Token tambien.

Los endpoints son los siguientes: 
Se adjunta un documento json con los endpoint y el contenido de todas las consultas.

## INSTRUCCIONES DE INSTALACIÓN DEL PROYECTO

debe ejecutar el siguiente comando: npm i

## INTRUCCIÓN PARA ARRANCAR EL PROYECTO

una vez instaladas las dependencias, debe ejecutar npm run dev (modo desarrallo local).