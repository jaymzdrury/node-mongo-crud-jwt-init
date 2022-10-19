## Mongo, Express, and Node CRUD

<img src="https://plus.unsplash.com/premium_photo-1658506952924-d3ebaeca8139?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" alt="Mongo" width="350" />

### Setup

`npm i` for node_modules

`npx tsc --init` to manually install `tsconfig.json`

`.env` file: 
```JavaScript
URI= "Mongo Uri..."
ORIGIN= ["Website URL..."]
KEY= "JWT Key..."
```
***

_sanitizeFilter_

`sanitizeFilter` blocks malicious query injections (/services)

_joi_

`joi` validates API calls (middlewares/joi.ts)

_pino_

`pino` stylizes logs with date to the terminal (utils/logger.ts)

_prom-client_

`prom-client` displays server metrics on http://localhost:9100 (utils/metrics.ts)
***

### Routes

#### POST: "/signup"
```JavaScript
{
    name: "
    email: "
    password: "
}
```
#### POST: "/login"
```JavaScript
{
    email: "
    password: "
}
//returns accessToken & refreshToken
```
#### GET: "/"
#### DELETE: "/logout"

#### Authorization: {Token: accessToken}
#### Header: {x-refresh: refreshToken}