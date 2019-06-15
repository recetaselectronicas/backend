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
