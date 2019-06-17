# Backend

### Desarrollo

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

Sino, verás un mensaje como el siguiente:

```log
error 2019-06-17 01:17:45: Error while connecting to Mongodb server.failed to connect to server [localhost:2701] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
error 2019-06-17 01:17:45: If you make any call to NormRepository it will crash. Please resolve this.
info 2019-06-17 01:17:45: All mock data generated ok
info 2019-06-17 01:17:45: Server up & running on 8080
```

Notar que la aplicación va a seguir andando pero cualquier llamada a la base documental de mongo va a fallar.
