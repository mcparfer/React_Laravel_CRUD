# Ticket CRUD Management - FINAL PHP PROJECT

This project is a client-server system for managing ticket sales for a circus. It is built using React.js for the frontend, Laravel for the backend, and MySQL as the database. The main objective of the project is to provide a CRUD (Create, Read, Update, Delete) functionality for managing tickets, with separate screens for both the customer and the administrator.

## Screenshots

<div align="center">
  <kbd>
    <img src="/doc/screenshots/001.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/002.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/003.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/004.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/005.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/006.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/007.png" alt="Project Image" width="800">
  </kbd>
</div>

<div align="center">
  <kbd>
    <img src="/doc/screenshots/008.png" alt="Project Image" width="800">
  </kbd>
</div>


## Prerequisites
Before running the project, make sure you have the following components installed:

- WAMP or XAMPP (with Apache, MySQL, and PHP)
- Node.js
- Laravel

## Installation
1. Clone the project repository:

   ```bash
   git clone https://github.com/mcparfer/React_Laravel_CRUD
   ```

2. Navigate to the project directory and install dependencies for both the client and server:

   ```bash
   npm install
   composer install
   ```

3. Set up the database connection in the .env file with your MySQL credentials:

   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. Run database migrations to create the necessary tables:

   ```bash
   php artisan migrate
   ```

## Execution
1. Start your WAMP or XAMPP server and make sure Apache and MySQL services are running.

2. Start the backend server:

   ```bash
   php artisan serve
   ```

2. Start the client:

   ```bash
   npm start
   ```

3. Access the application in your browser at: http://localhost:3000