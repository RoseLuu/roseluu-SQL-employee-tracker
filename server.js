// const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
//import console.table library
require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        // MySQL username,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company'
    },
    console.log(`Company database is connected successfully.`)
);
db.connect(err => {
    if (err) throw err;
    userOption();
})
//function for option
function userOption() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you want to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((answer) => {
        console.log(answer);
        if (answer.option === 'View all departments') {
            viewAllDept();
        }
        if (answer.option === 'View all roles') {
            viewAllRoles();
        }
        if (answer.option === 'View all employees') {
            viewAllEmp();
        }
        if (answer.option === 'Add a department') {
            addDepartment();
        }
        if (answer.option === 'Add a role') {
            addRole();
        }
        if (answer.option === 'Add an employee') {
            addEmployee();
        }
        if (answer.option === 'Update an employee role') {
            updateEmpRole();
        }
        if (answer.option === 'Exit') {
            db.end();
            console.log('Exit the database')
        }
    })
};
// function view department
function viewAllDept() {
    db.query('SELECT * FROM department', function (err, result) {
        if (err) throw err;
        console.table(result);
        userOption();
    })
}
//function view role
function viewAllRoles() {
    db.query('SELECT role.id AS id, role.title AS title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;', function (err, result) {
        if (err) throw err;
        console.table(result);
        userOption();
    })
}
//function view employee
function viewAllEmp() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id= manager.id ORDER BY employee.id;`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);
        userOption();
    })
}
//function to add department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Please enter department name:',
            validate: addDepartment => {
                if (addDepartment) {
                    return true;
                } else {
                    console.log('You have to enter new department name!');
                    return false;
                }
            }
        }
    ]).then((answerDept) => {
        console.log(answerDept);
        db.query(`INSERT INTO department (name)
                  VALUES ('${answerDept.addDepartment}');`, (err, result) => {
            if (err) throw err;
            console.log('Add new department - ' + answerDept.addDepartment);
            userOption();
        })
    })
}
//function add Role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the role name:',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('You have to enter the role name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter salary of the role:',
            validate: roleSalary => {
                if (roleSalary) {
                    return true;
                } else {
                    console.log('You have to enter the role salary!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Please chose department for the role:',
            // choices:[]  
        }
    ]).then(answerRole => {
        console.log(answerRole);
    })
}
//function add Employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empFirstName',
            message: 'Please enter employee name:',
            validate: empFirstName => {
                if (empFirstName) {
                    return true;
                } else {
                    console.log('You have to enter the new employee first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'empLastName',
            message: 'Please enter employee last name:',
            validate: empLastName => {
                if (empLastName) {
                    return true;
                } else {
                    console.log('You have to enter the new employee last name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'empManager',
            message: 'Please enter employee manager:',
            validate: empManager => {
                if (empManager) {
                    return true;
                } else {
                    console.log('You have to enter the new employee manager!');
                    return false;
                }
            }
        }
    ]).then(empAnswer => {
        console.log(empAnswer);
    })
}