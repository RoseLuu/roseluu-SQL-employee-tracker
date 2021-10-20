# roseluu-SQL-employee-tracker

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/#)

  # Table of Contents 
  * [Installation](#installation)
  * [Technologies](#technologies)
  * [Usage](#usage)
  * [License](#license)
  * [Contribution](#contribution)
  * [Test](#test)
  * [Questions](#questions)
 
 # Instruction video : 
  
  [Instruction video](https://drive.google.com/file/d/1DRmIzfuVhap_wYiB3P4fOPqfCXdvtfOD/view)
  
  # Description
  This is a employee tracking using Node.js, Inquirer and MySQL. Help user interact and manipulate database.

  <br />


  # Installation
  User have to install:
  * [Node.js](https://nodejs.org/en/download/)
  * [Inquirer](https://www.npmjs.com/package//inquirer)
  * [mySQL2](https://www.npmjs.com/package/mysql2#installation)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [console.table](https://www.npmjs.com/package/console.table)

  # Technologies
  * JavaScript
  * Node.js
  * mySQL

  # Usage
  Clone this repo and run command
  ```
  npm i
  ```
  to install inquirer, dotenv, console.table and mySQL2
  <br />
  
  Run terminal and run mysql to install the database
  ```
  mysql -u root -p
  ```
  after enter your sql password, run
  ```
  source schema.sql
  source seeds.sql
  ```
  to create database.
  <br />

  User also have to follow the instruction in [dotenv](https://www.npmjs.com/package/dotenv) to create your own database host, user and password. This will help increase security for the file. First, create a `.env` file in the root directory. Secondly, navigate to `.env` file that you just create and add environment-specific variables.

  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=your SQL password
  ```
  
  <br />
  After that, navigate the file, open your terminal and run thw command

  ```
  node server.js
  ```
  # License
  This project is licensed under the MIT license. 

  # Contribution
  ​Contributors: 
  Rose Luu

  # Questions
  Please contact if there is any question:
  - Github: [RoseLuu](https://github.com/RoseLuu)
  - Email: luuhongnhung10@gmail.com 