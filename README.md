# node js express
Creación de una api restful de los datos de una persona creado en node express
![](https://www.comaporter.com/wp-content/uploads/2021/05/curso-gratis-backend-node-js-express.jpg)

# Pasos para funcionar el sistema:
### 1 .- Api hecha en laravel
> https://github.com/harlericho/laravel_api_personas.git

### 2 .- Cambiar la configuración de la conexión:
* Ir a src/database:
```sh 
"host": "localhost",
"port": "3306",
"user": "root",
"password": "root",
"database": "(Usar la api hecha en laravel, aqui usamos la base creada)"
```
### 3 .- Instalar node js:
>npm install 
### 4 .- Ejecutar la api:
* Puede cambiar la variable de ejecución en package.json:
```sh    
"scripts": {
"dev": "nodemon .src/index.js"
},
```
### 5 .- Ejecutar la api:
> npm run dev 

## _Realizado por:_
![](https://avatars.githubusercontent.com/u/42042270?s=48&v=4)

# Github: @harlericho

> The MIT License (MIT)

### Este programa o sistema puede ser tomado como guia o enseñanza para sus futuros  proyectos.
> Copyright (c) 2021 harlericho