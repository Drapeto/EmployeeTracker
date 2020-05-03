const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = console.table
// MySQL configuration
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeeDB"
});

// Inquirer

function startup() {
    inquirer.prompt
        ([
            {
                type: "list",
                name: "task",
                message: "Please make a selection.",
                choices: ["Add Department", "Add Role",
                    "Add Employee", , "View Department", "View Role",
                    "View Employee", "Update Employee role"]
            }
        ])
        .then(answers => {
            switch (answers.task) {
                case "Add Department": addDepartment();
                    break;
                case "Add Role": addRole();
                    break;
                case "Add Employee": addEmployee();
                    break;
                case "View Department": viewDepartment();
                    break;
                case "View Role": viewRole();
                    break;
                case "View Employee": viewEmployee();
                    break;
                case "Update Employee Role": viewEmployeeRoleDepartment();
                    break;
                default: console.table("")
            }
        });

};


function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What department?"
            }
        ])
        .then(answers => {
            connection.query('INSERT INTO department (name) VALUES (?)', [answers.department]);
            startup();
        })

};

function viewDepartment() {
    connection.query("SELECT * FROM department", (err, data) => {
        console.table(data);
    })
    startup();
}

function addRole() {
    let departmentname = [];
    connection.query('SELECT * FROM department', function (err, result) {
        inquirer.prompt(
            {
                type: "input",
                name: "title",
                message: "What is your title?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is your salary?",
            },
            {
                type: "list",
                name: "department",
                message: "What is your department?",
                choices: departmentname
            }
        )
    })
        .then (answers => {
            let departmentid;
            results.foreach(key => {
                if (departmentname === answers.department){
                    department_id.push(key.id)
                }
            })
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?);"[answers.title, answer.salary, answers.department_id]), 
            (err, data) => {
                if (err) throw err;                
            }
            startup();
        })

}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, results) {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is their first name?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is their last name?"
                },
                {
                    type: "list",
                    name: "roleid",
                    message: "What is their role?",
                    choices: results.map(role => {
                        return {
                            name: role.title,
                            value: role.id,
                        }
                    })
                },
            ])
            .then(answers => {
                connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)"[answers.firstName, answers.lastName, answers.roleid]);
                startup();
            })
    })
}


function viewRole() {
    connection.query("SELECT * FROM role", (err, data) => {
        console.table(data);
    })
    startup();
}
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startup();
});  