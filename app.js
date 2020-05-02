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
            "Add Employee", , "View Department", "View Roles",
            "View Employees", "Update Employee role" ]
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
            case "View Roles": viewRoles();
                break;
            case "View Employees": viewEmployees();
                break;
            case "Update Employee Roles": viewEmployeeRolesDepartment();
                break;
            default: console.table("")         
        }
    })
    
};


function addDepartment() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "department",
            message: "What is your Department?"
            }
        ])
        .then(answers => {
            connection.query('INSERT INTO department (name) VALUES (?)', [answers.department]);
        startup();
    })

function viewDepartment(){
    connection.query("SELECT * FROM department", (err, data) =>{
        console.table(data);
    })
    startup();
}


};

// function addRole() {
//     connection.query('SELECT * FROM department', function (err, result) {
//         let deptNames = [];
//         inquirer.prompt(
//             {
//                 type: "input",
//                 name: "role",
//                 message: "What is your role title?"
//             },
//             {
//                 type: "input",
//                 name: "salary",
//                 message: "Input your Salary"
//             },
//             {
//                 type: "list",
//                 name: "dept",
//                 message: "Choose a dept",
//                 choices: deptNames
//             }

//         )
//     })
//         .then(answers => {
//         console.query(answers);
//         connection.query("SELECT department (id) FROM department WHERE name = ?"[answers.dept]), (err, data) => {
//             const dept = data[0]['departmentId)'];
//             connection.query("INSERT INTO role (departmentId) VALUES (?)", [dept]);
//         }
//         connection.query("INSERT INTO role (title, salary) VALUES (?)"[answers.title, answers, salary]);
//         console.log(answers);
//     })
// };
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startup();
});
