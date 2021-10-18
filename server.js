const inquirer = require('inquirer');

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
            type: 'choices',
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