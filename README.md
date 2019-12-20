# CasaOne

####Enter database related details in the following file
```
config/config.json
```

####Create Database
```
node executables/createCasaoneDatabase.js
```

####Create Tables
```
node_modules/.bin/sequelize db:migrate
```

####Add sample products
```
node executables/seedSampleProducts.js
```

####Source environment variable
```
source set_env_var.sh
```

####Start the server
```
node ./bin/www
```

####Test APIs with postman
Postman collection is available at /test/postman/ folder


