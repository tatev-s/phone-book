# phone-book

# Simple Message Queue Example
DIRECTORY STRUCTURE
-------------------

      client/                react-app for frontend
      server/                node.js api for backend 
### Installation
Install the dependencies and devDependencies and start the server in each directory

Server installation 

```sh
$ git clone repository
$ cd server
$ npm install
```
create .env file in server
```sh
  HOST=localhost
  PORT=3002
  # db Configs
  DB_HOST=localhost
  DB_NAME=
  DB_USERNAME=
  DB_PASSWORD=
  DB_DIALECT=mysql
  DB_LOGGING=1
``` 
client installation.

```sh
$ cd client
$ npm install
```
create .env file in client
```sh
  REACT_APP_API_URL=http://localhost:3002/api
``` 
Run server and client
```sh
$ cd client
$ npm start
```
```sh
$ cd server
$ npm run dev
```

Open in browser client
```
http://localhost:3000/
```

Server url
```
http://localhost:3002/
```
