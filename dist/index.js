// import { QueryResult } from "pg";
import { pool, connectToDB } from "./connection.js";
import inquirer from 'inquirer';
await connectToDB();
//CREATE DB SCHEMA TABLE: -DROP TABLES AND CREATE department, role, employee TABLES:
async function dropTables() {
    try {
        await pool.query('DROP TABLE IF EXISTS employee, role, department;');
        console.log('TABLES DROPPED.');
    }
    catch (err) {
        console.error('ERROR WITH DROPPING TABLES: ' + err);
    }
}
async function createDepartmentTable() {
    try {
        await pool.query('CREATE TABLE department (id SERIAL PRIMARY KEY, name varchar(30) UNIQUE NOT NULL);');
        console.log('DEPARTMENT TABLE CREATED.');
    }
    catch (err) {
        console.error('ERROR WITH CREATING DEPARTMENT TABLE: ' + err);
    }
}
async function createRoleTable() {
    try {
        await pool.query('CREATE TABLE role (id SERIAL PRIMARY KEY, title VARCHAR(30) UNIQUE NOT NULL, salary DECIMAL NOT NULL, department_id INTEGER NOT NULL REFERENCES department(id));');
        console.log('ROLE TABLE CREATED.');
    }
    catch (err) {
        console.error('ERROR WITH CREATING ROLE TABLE: ' + err);
    }
}
async function createEmployeeTable() {
    try {
        await pool.query('CREATE TABLE employee (id SERIAL PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INTEGER REFERENCES role(id));');
        console.log('EMPLOYEE TABLE CREATED.');
    }
    catch (err) {
        console.error('ERROR WITH CREATING EMPLOYEE TABLE: ' + err);
    }
}
async function createTables() {
    await createDepartmentTable();
    await createRoleTable();
    await createEmployeeTable();
}
async function seedTables() {
    try {
        await pool.query(`INSERT INTO department (name) VALUES ('Sales'), ('Customer Support');`);
        await pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('Junior Sales Rep', 45000, 1), ('Senior Support Rep', 65000, 2);`);
        await pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', 1), ('Jane', 'Smith', 2);`);
        console.log('TABLES SEEDED.');
    }
    catch (err) {
        console.error('ERROR WITH SEEDING TABLES: ' + err);
    }
}
//PROMPT BASE FUNCTIONALITY
// - VIEW ALL EMPLOYEES
// - ADD EMPLOYEE
// - UPDATE EMPLOYEE ROLE
// - VIEW ALL ROLES
// - ADD ROLE
// - VIEW ALL DEPARTMENTS
// - ADD DEPARTMENT
// - QUIT 
async function viewAllEmployees() {
    try {
        const result = await pool.query('SELECT * FROM employee;');
        console.log(`\n\nAll Employees:\n`);
        console.log(result.rows);
    }
    catch (err) {
        console.error('ERROR WITH VIEWING ALL EMPLOYEES: ' + err);
    }
}
async function addEmployee() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter employee role id:',
        },
    ])
        .then(async (answers) => {
        try {
            await pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', ${answers.role_id});`);
            console.log('EMPLOYEE ADDED.');
            prompt();
        }
        catch (err) {
            console.error('ERROR WITH ADDING EMPLOYEE: ' + err);
        }
    });
}
//TODO: 
async function updateEmployeeRole() {
    console.log('TO DO');
}
async function viewAllRoles() {
    try {
        const result = await pool.query('SELECT * FROM role;');
        console.log(`\n\nAll Roles:\n`);
        console.log(result.rows);
    }
    catch (err) {
        console.error('ERROR WITH VIEWING ALL ROLES: ' + err);
    }
}
async function addRole() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter role department id:',
        },
    ])
        .then(async (answers) => {
        try {
            await pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', ${answers.department_id});`);
            console.log('ROLE ADDED.');
            prompt();
        }
        catch (err) {
            console.error('ERROR WITH ADDING ROLE: ' + err);
        }
    });
}
async function prompt() {
    let exit = false;
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ],
        },
    ])
        .then(async (answers) => {
        if (answers.action === 'View All Employees') {
            await viewAllEmployees();
        }
        else if (answers.action === 'Add Employee') {
            await addEmployee();
            return;
        }
        else if (answers.action === 'Update Employee Role') {
            await updateEmployeeRole();
            return;
        }
        else if (answers.action === 'View All Roles') {
            await viewAllRoles();
        }
        else if (answers.action === 'Add Role') {
            await addRole();
            return;
        }
        else if (answers.action === 'View All Departments') {
            console.log('empty');
        }
        else if (answers.action === 'Add Department') {
            console.log('empty');
        }
        else {
            exit = true;
        }
        if (!exit) {
            prompt();
        }
    });
}
async function init() {
    await dropTables();
    await createTables();
    await seedTables();
    console.log('\n\n-------EMPLOYEE MANAGER-------\n');
    prompt();
}
init();
