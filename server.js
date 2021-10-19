const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'simple123',
        database: 'company'
    },
    console.log(`Connected to the company database.`)
);

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
                'Update an employee role'
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
    })
};
userOption();
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
    ]).then(answerDept => {
        console.log(answerDept);
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