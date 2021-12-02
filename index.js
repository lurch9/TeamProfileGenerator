const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const teamMembers = [];
const createTeam = () => {
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

    ])
    .then((results) => {
                teamMembers.push(new Manager(response.title,response.ID,response.email,results.officeNumber));
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

            
        })
    })
};