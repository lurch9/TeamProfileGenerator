const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const teamMembers = [];
const init = () => {
    inquirer.prompt([
        {
            type: 'name',
            message: 'Enter the team manager\'s name: \n\n',
            name: 'title'
        },

        {
            type: 'number',
            message: 'Enter the team manager\'s employee ID: \n\n',
            name: 'ID'
        },

        {
            type: 'input',
            message: 'Enter the team manager\'s employee email: \n\n',
            name: 'email'
        },
        
        {
            type: 'input',
            message: 'Enter the office number: \n\n',
            name: 'officeNumber'
        }

    ])
    .then((response) => {
                teamMembers.push(new Manager(response.title,response.ID,response.email,response.officeNumber));
                console.log('NOW ADDING TEAM MEMBERS: \n\n');
                newEmployee();
    })
};

const newEmployee = () => {
    inquirer.prompt([

        {
            type: 'name',
            message: 'Enter the employee name: \n\n',
            name: 'title'
        },
    
        {
            type: 'number',
            message: 'Enter the employee ID: \n\n',
            name: 'ID'
        },

        {
            type: 'input',
            message: 'Enter the employee email: \n\n',
            name: 'email'
        },


        {
            type: 'list',
            message: 'Select which you are adding\n\n',
            choices: ['Engineer', 'Intern'],
            name: 'selection'
        }


    ]).then(response => {
        inquirer.prompt([
        
            {
                when: () => response.selection === "Engineer",
                type: 'input',
                message: 'Enter the github username\n\n',
                name: 'github'
            },

            {
                when: () => response.selection === "Intern",
                type: 'input',
                message: 'Enter the school name\n\n',
                name: 'school'
            },


            {
                type:'confirm',
                message: 'Would you like to add another member?\n\n',
                name: 'newMember'
            },
        ])

        
        .then((results) => {

            let employee;

            switch (response.selection) {
                case "Engineer":
                    employee = new Engineer(response.title,response.ID,response.email,results.github);
                    break;

                case "Intern":
                    employee = new Intern(response.title,response.ID,response.email,results.school);
                    break;
            
                default:
                    break;
            }
            

            teamMembers.push(employee);


            if (results.newMember) {
                newEmployee();
            }


            else {

                const templateHTML = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Employee Generator</title>
                    <link href="/assets/styles.css" rel="stylesheet" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">            
                  </head>
                  <body>
                    <section class="section">
                        <div class="container">
                            <h1 class="title">Your Team</h1>
                            </br>
                            </br>
                            <div class="columns is-multiline">
                                ${teamMembers.map(index => {

                                    return `
                                    <div class="d-flex justify-content-center section">
                                        <div class="col-lg-8 col-md-6 col-sm-12 p-2 card">
                                            <div class="card-content">
                                                <div class="content">
                                                    <h3> Name: ${index.name}</h3>
                                                    <h6>  Role: ${index.getRole()} </h6>
                                                    <p> ID: ${index.id} </p>
                                                    <a href="mailto:${index.email}">Email: ${index.email}</a>
                                                    ${(
                                                        () => { 
                                                            switch(index.getRole()){
                                                                case "Manager":
                                                                    return `<p>Office Number: ${index.getOfficeNumber()}</p>`;
                                                                    break;
                                                                case "Engineer":
                                                                    return `<a href="https://github.com/${index.getGitHub()}"><p class="github">Github</p> </a>`;
                                                                    break;
                                                                case "Intern":
                                                                    return `<p>School: ${index.getSchool()}</p>`;
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        
                                                        })
                                                    ()} 
                                                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                }).join('')}
                            </div>
                        </div>
                    </section>
                  </body>
                </html>
                `
            fs.writeFileSync("index.html", templateHTML);
            }
        })
    })
};

init();