INSERT INTO department (name)
VALUES ('Sales'),
    ('Customer Support');

INSERT INTO role (title, salary, department_id)
VALUES ('Junior Sales Rep', 45000, 1),
    ('Senior Support Rep', 65000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
    ('Jane', 'Smith', 2);