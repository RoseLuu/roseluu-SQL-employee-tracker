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
};
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
};
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
        }
    ]).then(answerRole => {
        const newRole = [answerRole.roleName, answerRole.roleSalary];
        //grab the department data and convert it into a new object
        db.query('SELECT * FROM department', async (err, result) => {
            if (err) throw err;
            const dept = await result.map(({ id, name }) => ({ name: name, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleDepartment',
                    message: 'Please chose department for the role:',
                    choices: dept
                }
            ])
                .then((deptChoice) => {
                    const userDeptChoice = deptChoice.roleDepartment;
                    newRole.push(userDeptChoice);
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, newRole, (err, result) => {
                        if (err) throw err;
                        console.log('Add new role - ' + answerRole.roleName);
                        userOption();
                    })
                })
        })
    })
};
//function add Employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empFirstName',
            message: 'Please enter employee first name:',
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
        }
    ]).then(empAnswer => {
        const newEmp = [empAnswer.empFirstName, empAnswer.empLastName];
        db.query('SELECT role.id, role.title FROM role', async (err, result) => {
            if (err) throw err;
            const emp = await result.map(({ id, title }) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please chose role for the employee:',
                    choices: emp
                }
            ]).then((empRole) => {
                const userRoleChoice = empRole.role;
                newEmp.push(userRoleChoice);
                db.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee', async (err, result) => {
                    if (err) throw err;
                    const empMan = await result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'empManager',
                            message: 'Please choose employee manager:',
                            choices: empMan
                        }
                    ]).then(empManagerChoice => {
                        const newEmpManager = empManagerChoice.empManager;
                        newEmp.push(newEmpManager);
                        db.query(`INSERT INTO  employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, newEmp, (err, result) => {
                            if (err) throw err;
                            console.log('Add new employee - ' + empAnswer.empFirstName + " " + empAnswer.empLastName);
                            userOption();
                        })
                    })
                })
            })
        })
    })
};

//function update employee
function updateEmpRole() {
    const updateInfo = [];
    db.query('SELECT * FROM employee', async (err, result) => {
        if (err) throw err;
        const updateEmp = await result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'empName',
                message: 'Which employee you want to update?',
                choices: updateEmp
            }
        ]).then((choice) => {
            const emp = choice.empName;
            updateInfo.push(emp);
            db.query('SELECT role.id, role.title FROM role', async (err, result) => {
                if (err) throw err;
                const updateRole = await result.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'Which role do you want to assign the selected employee?',
                        choices: updateRole
                    }
                ]).then((roleChoice) => {
                    const role = roleChoice.newRole;
                    updateInfo.push(role);
                    console.log(updateInfo);
                    db.query('UPDATE employee SET role_id= ? WHERE id = ?', updateInfo, (err, result) => {
                        if (err) throw err;
                        console.log('Updated employee is role')
                        userOption();
                    })
                })
            })

        })
    })
}