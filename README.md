## Backend

#### Desarrollo

#### Knex (base de datos)

- Para agregar una tabla o realizar modificaciones en ella, tenemos que crear una `migration` de esta manera

```
knex migrate:make [NOMBRE DE LA MIGRACION]
```

Y luego modificamos las funciones up y down

- Para correrla

```
knex migrate:latest
```

- Para hacer rollback

```

knex migrate:rollback

```


#### MongoDB

- Para poder levantar la app sin problemas hay que tener una instancia de mongod levantada en el puerto 27017

Si pudo conectarse correctamente verás el siguiente mensaje: 

```log
info 2019-06-17 01:07:21: MongoDB initialized OK
info 2019-06-17 01:07:21: All mock data generated ok
info 2019-06-17 01:07:21: Server up & running on 8080
info ...
```