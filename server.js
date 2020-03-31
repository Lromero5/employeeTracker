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
  var query = "SELECT * FROM department";
      connection.query(query, function(err, res){
        var currentdepartments = [];
        for (var i = 0; i < res.length; i++){
          currentdepartments.push(res[i].name);
        };
        console.log(currentdepartments);
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
        name: "department",
        type: "list",
        message: "What department do they belong to?",
        choices: currentdepartments
      },
    ]).then(function(answer){
      console.log(answer);
      var departmentID;
      for (var i = 0; i < res.length; i++){
      console.log("each department from DB", res[i]);
        if(res[i].name === answer.department){
          departmentID = res[i].id;
        }
      };
      console.log(departmentID);

      var query = "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [answer.title, answer.salary, departmentID], function(err, res){
        console.log("Role added");
        start();
      });
    })

      });

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
      console.log(resemployee);
      var employeearray = []
      for (i = 0; i < resemployee.length; i++){
        // console.log([i])
        employeearray.push(resemployee[i].first_name);
      }
      console.log(employeearray);

      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "which employee would you like to update?",
          choices: employeearray
        }
      ]).then(function(answer){
        console.log(answer);
        updateEmployeerole(answer.employee);
      })

    });
   
  }

function updateEmployeerole(employeeName){
 var queryroles = "Select * From role";
      connection.query(queryroles, function(err, resroles){
        console.log(resroles);
        var rolesArray = []
        for (i = 0; i < resroles.length; i++){
          // console.log([i])
          rolesArray.push(resroles[i].title);
        }
        console.log("Logging roles array ", rolesArray);
        inquirer.prompt(
          {
            name: "role",
            type: "list",
            message: "which role would you like to update them too?",
            choices: rolesArray
          }
        ).then(function(answers){
            console.log(answers);
            var updateQuery = "UPDATE employees SET role_id = ? WHERE first_name = ?";
            var roleID;
          for (var i = 0; i < resroles.length; i++){
          console.log("each role from DB", resroles[i]);
            if(resroles[i].title === answers.role){
              roleID = resroles[i].id;
          }
          };
          console.log(roleID);

            connection.query(updateQuery, [roleID, employeeName], function(err, res){
              console.log(err,res);
            })
        });

      });
}

     


