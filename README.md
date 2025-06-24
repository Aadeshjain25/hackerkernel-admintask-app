Features

-Add users with email and mobile number validation
-View all users with their tasks
-Add tasks for any user
-Mark task status as Pending or Done
-Export users and tasks to an Excel file (two sheets)
-Get tasks for a single user by ID

Packages Used

-express
-express-handlebars
-body-parser
-knex
-objection
-mysql2
-exceljs

How to Run

-Clone project 
git clone <your-repo-url>
cd hackerkernel-admintask-app

-Install packages
npm install

Create the database tables in MySQL:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(20)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  task_name VARCHAR(255),
  task_status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-Check database and use it in your db.js and update with your database credentials
-Run project  by node app.js
-Open in your browser

Thank you!
