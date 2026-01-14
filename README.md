# Storefront Backend Project

## 1. Introduction
This is the **Storefront Backend** project.  
It is a RESTful API built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  

The project manages:
- Users  
- Products  
- Orders  
- Order Items  

It has API endpoints for all tables and includes **unit and route tests** using **Jasmine** and **Supertest**.

---

## 2. Required Technologies

- **PostgreSQL** for the database  
- **Node.js / Express** for server and API logic  
- **dotenv** for managing environment variables  
- **db-migrate** for database migrations  
- **bcrypt** for hashing passwords  
- **jsonwebtoken** for JWT authentication  
- **Jasmine & Supertest** for testing

---

## 3. Installation

### 1. Clone the project:

```bash
git clone https://github.com/AnsamJamal1/Storefront-Backend-Ansam.git
cd Storefront-Backend-Ansam
```

### 2. Install dependencies:
npm install


### 3. Create the database in PostgreSQL:
CREATE DATABASE storefront;

Create a .env file in the project root:
POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_USER=postgres
POSTGRES_PASSWORD=my_db_password
PORT=3000
PostgreSQL runs on the default port 5432.


### 4. Build the TypeScript project:
npm run build


## 4. Run the Project
npm start

You should see:
Server running on http://localhost:3000


## 5. API Endpoints

**Users**
Method	 |       URL	              |    Description
-------------------------------------------------------------------
GET      | 	/users	                  |  Get all users
GET	     |  /users/:id	              |  Get one user by ID
POST	 |  /users	                  |  Create a new user
PUT	     |  /users/:id                |  Update user by ID
DELETE	 |  /users/:id	              |  Delete user by ID
POST	 |  /users/authenticate	      |  Authenticate/login user
-------------------------------------------------------------------
**Products**                          
Method	 |       URL	              |    Description
--------------------------------------------------------------------
GET	     |  /products	              |  Get all products
GET	     |  /products/:id	          |  Get one product by ID
POST	 |  /products	              |  Create a new product
PUT	     |  /products/:id	          |  Update product by ID
DELETE	 |  /products/:id	          |  Delete product by ID
---------------------------------------------------------------------
**Orders**                            
Method	 |       URL	              |    Description
---------------------------------------------------------------------
GET	     |  /orders	                  |  Get all orders
GET	     |  /orders/:id	              |  Get one order by ID
POST	 |  /orders	                  |  Create a new order
PUT	     |  /orders/:id	              |  Update order by ID
DELETE	 |  /orders/:id	              |  Delete order by ID
---------------------------------------------------------------------
**Order Items**                       
Method	 |       URL	              |    Description
---------------------------------------------------------------------
GET	     |  /order_items              |  Get all order items
GET	     |  /order_items/:id	      |  Get one order item by ID
POST	 |  /order_items	          |  Create a new order item
PUT	     |  /order_items/:id	      |  Update order item by ID
DELETE	 |  /order_items/:id	      |  Delete order item by ID
-----------------------------------------------------------------------

## 6. Testing
The project includes unit tests for models and route tests for API endpoints.
All tests are built with Jasmine and Supertest.

Run tests with:
npm run test

Expected output:
22 specs, 0 failures

Note: Make sure the database has the required data for foreign keys before running tests.
Tip: Clean test data after each test to avoid duplicates.

## 7. Notes
- Passwords are hashed using bcrypt.
- orders and order_items tables use foreign keys.
- Deleting a user or product automatically deletes related orders/items (ON DELETE CASCADE).
- Written in TypeScript for type safety and maintainability.
- JWT authentication is used for protected routes.

## 8. Project Setup Workflow
a. Read the REQUIREMENTS.md file and map the data shapes to database tables.
b. Create tables in PostgreSQL with the correct foreign keys.
c. Build models for each table ( User, Product, Order, OrderItem).
d. Create Express routes and connect them to model methods.
e. Add JWT authentication where required.
f. Write unit and route tests.
g. Run npm start and test all endpoints in Postman.
h. Clean up database sequences for testing to prevent duplicate key errors.

## 9. Author
Ansam Jamal – https://github.com/AnsamJamal1
