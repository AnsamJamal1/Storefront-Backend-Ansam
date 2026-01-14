# Storefront Backend API Requirements

## Project Overview

The Storefront Backend API provides backend services for an online storefront.
It allows users to browse products, manage accounts, create orders, and add
products to orders.

This API is built using Node.js, Express, TypeScript, and PostgreSQL.

---

## API Endpoints

### Products

| Method | Endpoint | Token Required | Description |
|------|---------|----------------|------------|
| GET | /products | No | Get all products |
| GET | /products/:id | No | Get product by ID |
| POST | /products | Yes | Create a new product |
| PUT | /products/:id | No | Update a product |
| DELETE | /products/:id | No | Delete a product |

---

### Users

| Method | Endpoint | Token Required | Description |
|------|---------|----------------|------------|
| GET | /users | Yes | Get all users |
| GET | /users/:id | Yes | Get user by ID |
| POST | /users | No | Create a new user |
| PUT | /users/:id | No | Update user |
| DELETE | /users/:id | No | Delete user |
| POST | /users/authenticate | No | Authenticate user and return JWT |

---

### Orders

| Method | Endpoint | Token Required | Description |
|------|---------|----------------|------------|
| GET | /orders | Yes | Get all orders |
| GET | /orders/:id | Yes | Get order by ID |
| POST | /orders | Yes | Create a new order |
| PUT | /orders/:id | No | Update order |
| DELETE | /orders/:id | No | Delete order |

---

### Order Items

| Method | Endpoint | Token Required | Description |
|------|---------|----------------|------------|
| GET | /order_items | No | Get all order items |
| GET | /order_items/:id | No | Get order item by ID |
| POST | /order_items | No | Add product to order |
| PUT | /order_items/:id | No | Update order item |
| DELETE | /order_items/:id | No | Delete order item |

---

## Data Shapes

### Product

```ts
{
  id: number
  name: string
  description: string
  price: number
  created_at: Date
}
```

### User

```ts
{
  id: number
  username: string
  email: string
  password: string
  role: string
  created_at: Date
}
```

### Order

```ts
{
  id: number
  user_id: number
  status: string
  created_at: Date
}
```

### Order Item

```ts
{
  id: number
  order_id: number
  product_id: number
  quantity: number
}
```

## Database Tables

### users

- id (PK): integer
- username (unique): VARCHAR
- email: VARCHAR
- password: VARCHAR
- role: VARCHAR
- created_at: TIMESTAMP

### products

- id (PK): integer
- name: VARCHAR
- description: text
- price: DECIMAL
- created_at: TIMESTAMP

### orders

- id (PK): integer
- user_id (FK → users.id): integer
- status: VARCHAR
- created_at: TIMESTAMP

### order_items

- id (PK): integer
- order_id (FK -> orders.id): integer
- product_id (FK -> products.id): integer
- quantity: integer

## Notes

- Passwords are hashed using bcrypt.
- Foreign key constraints are enforced.
- Cascading deletes are enabled where needed.
- API endpoints are tested using Jasmine and Supertest.
