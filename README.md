# OxygenBnb Application
Copy of AirBnb

## Build project

### 1. Get the project locally 
```
git clone git@github.com:TheoRacherR/OxygenBnb.git
```

### 2. Create a .env file with those variables (that you have to fill)
```
DB_TYPE=
PG_HOST=
PG_USER=
PG_PASSWORD=
PG_DB=
PG_PORT=
PG_PORT_E2E=
NEST_PORT=
jwt_secret=
NODE_ENV_DEV=true or false
```

### 3. Finally, Build the project
```
docker compose up --build
```


## Migrations
##### Inside "nestapp-oxygen" container 
```
npm run typeorm:create-migration
```
or
```
npm run typeorm:run-migration
```
or
```
npm run typeorm:revert-migration
```
