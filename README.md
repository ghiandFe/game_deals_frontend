###### 
<p align="center">
<img width="420px" src="https://i.ibb.co/vQBTZSj/Logo-small.png" alt="GAME DEALS">
</p>

# FRONTEND DOCUMENTATION

Game deals is an application that collects the best game offers on Steam, GOG and Humble Store in one place.<br>
Registered users can browse, filter and sort deals.

The application is written with Django (Backend) and React.js (Frontend).<br>
This documentation explains all necessary steps to run and test the frontend application.

Game Deals backend is located at the following URL:<br>
https://github.com/ghiandFe/game_deals_backend

> __Make sure you follow the backend documentation first__

## REQUIREMENTS

- Node.js and npm installed on your system
- Git installed on your system

## CLONING REPOSITORY

Open command line and run:

```sh
$ git clone https://github.com/ghiandFe/game_deals_frontend.git
```

When the command is executed, open the folder created (game_deals_frontend) and check for the package.json file:

```sh
$ cd game_deals_frontend

# Linux
$ ls

# Windows
> dir
```

If check successfully, go to the next step.

## SYSTEM CONFIGURATION

From now on, all commands must be launched from within the repo folder (game_deals_frontend).

### Installing dependencies

Dependencies are necessary to run the application.

```sh
$ npm install
```

## TESTING THE APPLICATION

To run the test, use the command:

```sh
$ npm test
```

> If the tests do not start automatically, press "a" to run them all.

When the tests have been executed press "q" to exit.

## START THE APPLICATION

The last step: run the application.<br>

> __Make sure you follow the backend documentation first__

```sh
$ npm start
```