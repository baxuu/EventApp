# EventApp

EventApp is a simple application to record upcoming events. You can save, edit or delete your events from the database.

![](https://raw.githubusercontent.com/baxuu/eventApp/master/client/assets/example.jpg)

### Built with
- `Node.js,`
- `Express,`
- `MongoDB,`
- `React,`
- `Styled-components`
- `Redux (redux-thunk),`
- `React Hook Form,`


## Installation

Clone or download repository 

```
git clone https://github.com/baxuu/eventApp.git
```

then

```
cd eventApp
```

Install backend packages

```
cd server
npm install
```

and also frontend packages

```
cd client 
npm install
```

## Configuration

In server folder create .env file and define your mongodb credentials. Define also credentials for testing purposes. It's better to use a different ones because base is cleared after the tests.
```python
DB_USER=<name>
DB_PASS=<password>
DB_NAME=<dbname>
DB_USER_TEST=<name>
DB_PASS_TEST=<password>
DB_NAME_TEST=<dbname>
```
## Testing

Tests are prepared for both front-end and back-end sides. Add to

front:

```
cd client 
npm run test
```
back:

```
cd server 
npm run test
```

## Running

Server will start on port ***8080***. Client on ***3000***. On both run command:

```
npm start
```

## Author

 Artur Królczyk *baxuu*
