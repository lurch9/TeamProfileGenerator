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

    ])
    .then((results) => {
                teamMembers.push(new Manager(response.title,response.ID,response.email,results.officeNumber));
                newEmployee();
    })
};
init();

