# Employee Tracker
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
## Description
This project allows a user to view departments, roles, and employees from a postgresql database. They are also able to 
add a department, role and employee as well as update a specific employee.<br>

Technologies used:<br>
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Installation

- The user must clone the repo locally with this command:
```bash
git clone https://github.com/PhilipMcF/Employee-Tracker.git
```

- Postgresql will be needed to have the service running and connect to the database:<br>
https://www.postgresql.org/download/<br>
You will need to go through the installation and provide the necessary information in the .env file for the database, user, and password.

- Node.JS will be needed as well as the package manager to acquire the necessary modules:<br>
https://nodejs.org/en/download/package-manager

- Npm modules are needed in order to function properly so they will need to be installed. Run this command in the directory where the repo is installed:
```bash
npm install
```

## Usage
[Employee Tracker Video Showcase](https://drive.google.com/file/d/18DgVzCf4QpWbKohBl0_FjLmuaGRf70AU/view?usp=sharing)

To start the project, make sure you are in the directory of the repo/project and run this command in a terminal window:
```bash
npm run start
```
You will then be prompted to select an action.<br>
The actions you can perform on the database is as follows:
- View All Employees
- Add Employee
- Update Employee Role
- View All Roles
- Add Role
- View All Departments
- Add Department
- Quit

Selecting Add Employee, Update Employee, Add Role, and Add Department will prompt the user for input to complete the action.

A video demonstration can be viewed in the link at the top of this [Usage](#usage) section

## Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)<br>
To contribute to this project, you can fork it or create an issue and provide any suggestions or solutions.
Please try and follow the Contributor Covenant code of conduct and leave a star if you like the project.

## Questions
For any and all questions, please contact me here:
- GitHub: https://github.com/PhilipMcF
- Email: philipsm1998@gmail.com

## License
[This project is licensed under the MIT license.](#https://opensource.org/license/mit)