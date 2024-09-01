// import { QueryResult } from "pg";
import { pool, connectToDB } from "./connection.js";
import inquirer from 'inquirer';

await connectToDB();

//CREATE DB SCHEMA TABLE: -DROP TABLES AND CREATE department, role, employee TABLES:
async function dropTables() {
    try {
        await pool.query('DROP TABLE IF EXISTS employee, role, department;');
        console.log('TABLES DROPPED.');
    } catch (err) {
        console.error('ERROR WITH DROPPING TABLES: ' + err);
    }
}

async function createDepartmentTable() {
    try {
        await pool.query('CREATE TABLE department (id SERIAL PRIMARY KEY, name varchar(30) UNIQUE NOT NULL);');
        console.log('DEPARTMENT TABLE CREATED.');
    } catch (err) {
        console.error('ERROR WITH CREATING DEPARTMENT TABLE: ' + err);
    }
}

async function createRoleTable() {
    try {
        await pool.query('CREATE TABLE role (id SERIAL PRIMARY KEY, title VARCHAR(30) UNIQUE NOT NULL, salary DECIMAL NOT NULL, department_id INTEGER NOT NULL REFERENCES department(id));');
        console.log('ROLE TABLE CREATED.');
    } catch (err) {
        console.error('ERROR WITH CREATING ROLE TABLE: ' + err);
    }
}

async function createEmployeeTable() {
    try {
        await pool.query('CREATE TABLE employee (id SERIAL PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INTEGER REFERENCES role(id));');
        console.log('EMPLOYEE TABLE CREATED.');
    } catch (err) {
        console.error('ERROR WITH CREATING EMPLOYEE TABLE: ' + err);
    }
}

async function createTables() {
    await createDepartmentTable();
    await createRoleTable();
    await createEmployeeTable();
}

//SEED TABLES WITH SAMPLE DATA:
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
        const result = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name,
department.name AS department, role.title AS role, role.salary
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;`);
        console.log(`\n\nAll Employees:\n`);
        console.log(result.rows);
        console.log('\n');
    } catch (err) {
        console.error('ERROR WITH VIEWING ALL EMPLOYEES: ' + err);
    }
}

async function addEmployee() {
    await viewAllRoles();
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
            } catch (err) {
                console.error('ERROR WITH ADDING EMPLOYEE: ' + err);
                console.log(`Please enter a valid role id:`);
                addEmployee();
            }
        });
}

async function updateEmployeeRole() {
    await viewAllEmployees();
    await viewAllRoles();
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter id for employee to update:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter new role id for employee:',
            },
        ])
        .then(async (answers) => {
            try {
                await pool.query(`UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id};`);
                console.log('EMPLOYEE ROLE UPDATED.');
                prompt();
            } catch (err) {
                console.error('ERROR WITH UPDATING EMPLOYEE ROLE: ' + err);
                console.log(`Please enter a valid employee and role id:`);
                updateEmployeeRole();
            }
        })
}

async function viewAllRoles() {
    try {
        const result = await pool.query(`SELECT role.id, role.title, role.salary, department.name AS department, department.id AS department_id
FROM role
JOIN department ON role.department_id = department.id;`);
        console.log(`\n\nAll Roles:\n`);
        console.log(result.rows);
        console.log('\n');
    }
    catch (err) {
        console.error('ERROR WITH VIEWING ALL ROLES: ' + err);
    }
}

async function addRole(){
    await viewAllDepartments();
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
            } catch (err) {
                console.error('ERROR WITH ADDING ROLE: ' + err);
                console.log(`Please enter a valid department id:`);
                addRole();
            }
        });
}

async function viewAllDepartments() {
    try {
        const result = await pool.query('SELECT * FROM department;');
        console.log(`\n\nAll Departments:\n`);
        console.log(result.rows);
        console.log('\n');
    }
    catch (err) {
        console.error('ERROR WITH VIEWING ALL DEPARTMENTS: ' + err);
    }
}

async function addDepartment(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter department name:',
            },
        ])
        .then(async (answers) => {
            try {
                await pool.query(`INSERT INTO department (name) VALUES ('${answers.name}');`);
                console.log('DEPARTMENT ADDED.');
                prompt();
            } catch (err) {
                console.error('ERROR WITH ADDING DEPARTMENT: ' + err);
            }
        });
}

//CLI PROMPT
async function prompt(){
    let exit: boolean = false;
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
            if (answers.action === 'View All Employees'){
                await viewAllEmployees();
            }
            else if (answers.action === 'Add Employee'){
                await addEmployee();
                return;
            }
            else if (answers.action === 'Update Employee Role'){
                await updateEmployeeRole();
                return;
            }
            else if (answers.action === 'View All Roles'){
                await viewAllRoles();
            }
            else if (answers.action === 'Add Role'){
                await addRole();
                return;
            }
            else if (answers.action === 'View All Departments'){
                await viewAllDepartments();
            }
            else if (answers.action === 'Add Department'){
                await addDepartment();
                return;
            }
            else {
                exit = true;
                return;
            }
            if (!exit){
                prompt();
            }
        });
}


async function init(){
    await dropTables();
    await createTables();
    await seedTables();
    console.log('\n\n-------EMPLOYEE MANAGER-------\n');
    prompt();
}

init();