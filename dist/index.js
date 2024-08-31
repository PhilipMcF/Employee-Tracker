// import { QueryResult } from "pg";
import { pool, connectToDB } from "./connection.js";
import inquirer from 'inquirer';
await connectToDB();
//CREATE DB SCHEMA TABLE
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
        await pool.query('CREATE TABLE employee (id SERIAL PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INTEGER REFERENCES role(id), manager_id INTEGER REFERENCES employee(id));');
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
//PROMPT BASE FUNCTIONALITY
// - VIEW ALL EMPLOYEES
// - ADD EMPLOYEE
// - UPDATE EMPLOYEE ROLE
// - VIEW ALL ROLES
// - ADD ROLE
// - VIEW ALL DEPARTMENTS
// - ADD DEPARTMENT
// - QUIT 
function prompt() {
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
        .then((answers));
    {
        if (answers.action === 'View All Employees') {
            console.log('VIEW ALL EMPLOYEES');
        }
    }
}
async function init() {
    await dropTables();
    await createTables();
    prompt();
}
init();
