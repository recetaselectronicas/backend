# Backend

### Sencillito

Antes que nada
```bash
$ npm install
```

Para iniciar el servidor
```bash
$ npm start
```

Para correr los tests (se..)
```bash
$ npm run test
```

Existe un archivo de configuraciones (src/config/config.js) que se puede cambiar dependiendo las necesidades 
```javascript
const config = {
  executeBootstrap: {
    mongo: false, // ejecuta o no el bootstrap de Mongo (borra todo lo que haya y regenera)
    mysql: false // ejecuta o no el bootstrap de MySql (borra todo lo que haya y regenera)
  },
  executeDaemon: {
    issued: true, // corre o no el demonio que confirma las recetas
    expired: false // corre o no el demonio que vence las recetas
  },
  conections: {
    mongo: {
      host: 'localhost',
      port: 27017
    }
  }
}

module.exports = { config }
```

## Troubleshooting

Revisar que el servicio de Mongo esté corriendo. Ejecutando el siguiente comando se deberían poder conectar, sino algo no está bien
```bash
$ mongo
```

Revisar que el servicio de MySql esté corriendo. Ejecutando el siguiente comando se deberían poder conectar, sino algo no está bien
```bash
$ mysql -u root -p 
#Con password 1234
```

Cualquier otra cosa, consultar a su developer amigo