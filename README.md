# Design a New Placement System for the Internship Course (GROUP 2)

FYP: CS Internship Placement System

## Project Description

Each year the Internship Coordinator has to handle and collect various documents to keep track of all the arrangements and issues related to students' internships. The current Placement System is a bit outdated and we need a new Placement System for streamlining all the activities, e.g., approval of internships, collecting and analyzing feedback forms, generating statistics, etc.
In this project, we aim to create a "one-stop" placement system for the internship course so that students and the internship coordinator do not have to rely on external means to facilitate activities related to the internship course. We have redesigned the placement system, implemented new functionalities and improved the placement system for the convenience of the internship coordinator and the students.

## Download and Installation

    git clone https://github.com/tamara-lee/PlacementSystem.git

### Start server

    cd server
    npm install
    npm start

### Start client

    cd client
    npm install
    npm start

## Database Configuration

The connection URL is provided via the url field of a datasource block in your Prisma schema. It generally consists of the following components (except for SQLite):

- User: The name of your database user
- Password: The password for your database user
- Host: The IP or domain name of the machine where your database server is running
- Port: The port on which your database server is running
- Database name: The name of the database you want to use

Make sure you have this information at hand when getting started with Prisma.

    DATABASE_URL="mysql://root:password@127.0.0.1:3306/prismadb?schema=public"

Please make sure to change the username (eg. root), password (eg. password), local IP address with the port number (eg. 127.0.0.1:3306) and the database schema name (eg. prismadb) to fit to your own database and schema in the **.env** file.

You may change the provider according to the database you are using in the **schema.prisma** file. For example, we are using "mysql" for MySQL as seen below. It can be changed to other databases such as "postgresql" for PostgreSQL, etc. Please refer to this link for more information: https://www.prisma.io/docs/reference/database-reference/connection-urls#:~:text=Prisma%20needs%20a%20connection%20URL,block%20in%20your%20Prisma%20schema

    datasource db {
        provider = "mysql"
        url      = env("DATABASE_URL")
    }

Ensure to not directly configure the database url in **schema.prisma**, instead, change it in the **.env** file.

## schema.prisma Configurations

- Run the command _npx prisma generate_ if changes are made to the schema.prisma file.
- To migrate the changes from schema.prisma to the database, run the command _npx prisma migrate dev --name init_
- To introspect changes from the database to schema.prisma run the command _npx prisma db pull_
- Database information can be edited using Prisma's provided GUI. Run the command _npx prisma studio_ to access the GUI.

## Deployment Configurations

Before deployment, ensure that the **.env** under the _sever_ folder and both **node_modules** under the _server_ and _client_ folders are added to their respective _.gitignore_ files.

- Ensure that the **JWT_SECRET_KEY** in the **.env** file is modified for security reasons.

## Assumptions

1. User accounts have to exist in the database system before using the placement system. Each user account should have the username, password and student UID (admin has UID of "0000000000").

## How to Use

### How to try out the placement system?

Mock data have been created in the database for you to test out the placement system.

- Ensure that user accounts containing the student information such as UID, username and password are filled in the user_account table in the database.
- Currently, there are 16 user accounts in the mock database. 15 student accounts and 1 admin account.
- Please refer to the **MockDataInstruction.pdf** for more details on how to use the mock data provided.

#### Login as Admin

- The admin will be directed to the admin main page (ie. page that shows list of students)
- Admin navigate to each student record or student placement record.
- The admin may also navigate to the _Add Student(s)_ and _FAQ_ page using the top navigation bar.

#### Login as Student

- The student will directed to the student main page (student record page).
- The student may navigate to the _FAQ_ page using the top navigation bar.

Users can log out by clicking the _Log out_ button in the navigation bar.

## Page URLs

1. Login page: **"http://localhost:3000/"**
2. Admin main page: **"http://localhost:3000/admin/mainpage"**
3. Admin edit student record: **"http://localhost:3000/admin/edit/studentrecord"**
4. Admin edit student placement record: **"http://localhost:3000/admin/edit/placementrecord"**
5. Admin add students: **"http://localhost:3000/admin/addstudents"**
6. Admin FAQ: **"http://localhost:3000/admin/faq"**
7. Student main page: **"http://localhost:3000/student/mainpage"**
8. Student FAQ: **"http://localhost:3000/student/faq"**

## Limitations

- The number of categories in the FAQ menu is fixed. If the coordinator wants to add more categories, they would need to modify the code.
- The headers in the import student template file (in **Add Student(s)** page) cannot be modified. Columns canot be added to the template file as well.

## Credits

**Supervisor:** Dr. Tam, Anthony T.C.

**2nd Examiner:** Dr. Chim, Tat Wing

**Contributors:**

- Chua Qian Yi (3035604439)
- Lee Tamara Su Hui (3035548922)
