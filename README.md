# CouchDB Logger

`npm run` to start the service on the default port 3000.
Don't forget to start the CouchDB and update the `dbUrl` in the `app/config/config.js`.

## POST Requests:

### 1. Create a user

`POST` to `/users`

Example: 
```json
{
  "id": "arthur.myronenko@gmail.com",
  "name": "Arthur"
}
```

### 2. Create an event

`POST` to `/events`

Example: 
```json
{ 
  "name": "Log In", 
  "logLevel": "warning", 
  "userID": "arthur.myronenko@gmail.com",
  "message": "Invalid Password",
  "client": {
    "platform": "iOS",
    "version": "1.2.0"
  }
}
```


## Possible Log Levels:

- `info`
- `debug`
- `warning`
- `error`

