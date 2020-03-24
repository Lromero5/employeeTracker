var mysql = require("mysql");
var inquirer = require("inquirer")


var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
  });

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "view department",
          "view roles",
          "view employees",
          "add department",
          "add roles",
          "add employee",
          "update employee role"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "view department":
          viewDepartment();
          break;
  
        case "view roles":
          viewRoles();
          break;
  
        case "view employees":
          viewEmployees();
          break;
  
        case "add department":
          addDepartment();
          break;
  
        case "add roles":
          addRoles();
          break;

        case "add employee":
          addEmployee();
          break; 

        case "update employee role":
          updateEmployee();
          break;  
        }
      });
  } 

function viewDepartment(){
    var query = "Select * From department";
    connection.query(query, function(err, res){
      console.table(res);
      console.log( "thank you...")
      start();
    });
}

function viewRoles(){
  var query = "Select * From role";
  connection.query(query, function(err, res){
    console.table(res);
    console.log( "thank you...")
    start();
  });
};

function viewEmployees(){
  var query = "Select * From employees";
  connection.query(query, function(err, res){
    console.table(res);
    console.log( "thank you...")
    start();
  });
};

function addDepartment(){
    inquirer
    .prompt({
      name: "question",
      type: "input",
      message: "What department would you like to add?"
    }).then(function(answer){
      // console.log(answer);
      var query = "INSERT INTO department(name) VALUES (?)";
      connection.query(query, [answer.question], function(err, res){
        console.log("Department added");
        start();
      });
    })
  };

function addRoles(){
    inquirer
    .prompt([
      {
      name: "title",
      type: "input",
      message: "Which title would you like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of this role?"
      },
      {
        name: "id",
        type: "list",
        message: "What department do they belong to?",
        choices: [
          "1",
          "2",
          "3",
          "4"
        ]
      },
    ]).then(function(answer){
      // console.log(answer);
      var query = "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [answer.title, answer.salary, answer.id], function(err, res){
        console.log("Role added");
        start();
      });
    })
}; 

function addEmployee(){
    inquirer
    .prompt([
      {
      name: "fistname",
      type: "input",
      message: "What is the first name of the employee?"
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the last name of the employee?"
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: [
          "1",
          "2",
          "3",
          "4"
        ]
      },
  ]).then(function(answers){
      // console.log(answer);
      var query = "INSERT INTO employees(first_name, last_name, role_id) VALUES (?, ?, ?)";
      connection.query(query, [answers.fistname, answers.lastname, answers.role], function(err, res){
        console.log(res);
        start();
      });
    })
};






// code I can't figure out 

  function updateEmployee(){
    var query = "Select first_name, last_name, role_id From employees";
    connection.query(query, function(err, resemployee){
      // console.log(resemployee);
      var employeearray = []
      for (i = 0; i < resemployee.legnth; i++){
        console.log([i])
        employeearray.push(resemployee[i].id);
      }
      console.log(employeearray);

      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "which employee would you like to update?",
          choices: resemployee
        }
      ]).then(function(answer){
        console.log(answer);
      })

      // var queryroles = "Select * From roles";
      // connection.query(queryroles, function(err, resroles){
      //   // console.table(resroles);

      //   inquirer.prompt([
      //     {
      //       name: "employee",
      //       type: "list",
      //       message: "which employee would you like to update?",
      //       choices: resemployee
      //     },
      //     {
      //       name: "role",
      //       type: "list",
      //       message: "which role would you like to update them too?",
      //       choices: resroles
      //     }
      //   ]).then(function(answers){
      //       console.log(answers);
      //   });

      // });

    });
   
  }