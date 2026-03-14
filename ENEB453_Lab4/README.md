# ENEB453 Lab 4

> **ENEB453 – Web-Based Application Development**  
> Lab 4: Building a RESTful Backend with Node.js, Express & MySQL

This repository is the **reference starter project** for Lab 4. 
It contains a fully styled e-commerce front-end (HTML/CSS/JS) and skeleton backend code. 
You are required to complete all `// TODO` sections to make the application functional.

---

## Project Structure

```
ENEB453_Lab4/
├── public/                  - Static front-end (served by Express)
│   ├── index.html           - Home page
│   ├── products.html        - Product catalog & admin form
│   ├── orders.html          - Order placement & history
│   ├── signup.html          - Customer registration
│   ├── style.css            - Shared stylesheet
│   ├── app.js               - Shared utilities (fetch helper, cart)
│   ├── product_app.js       - Products page logic   // TODO
│   ├── orders_app.js        - Orders page logic     // TODO
│   └── signup_app.js        - Signup page logic     // TODO
├── routes/
│   ├── customers.js         - Customer CRUD routes  // TODO
│   ├── products.js          - Product CRUD routes   // TODO
│   └── orders.js            - Order CRUD routes     // TODO
├── db/
│   └── connection.js        - MySQL connection pool
├── mysql/
│   └── init.sql             - Schema + seed data.   // TODO (add dummy data into tables)
├── server.js                - Express entry point   // TODO (uncomment routes)
├── package.json
├── docker-compose.yml       - MySQL via Docker
├── .env.example             - Copy to .env
└── .gitignore
```

---

## Quick Start

### 1. Clone and install dependencies
```bash
git clone <repo-url>
cd ENEB453_Lab4
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env if needed (default values match docker-compose.yml)
```

### 3. Start MySQL in Docker
```bash
# make sure that docker is up and running before executing this command.
# stop the previous instances so that the ports are available otherwise, you may end up getting errors "port is already allocated".
docker-compose up -d
```

### 4. Start the Express server
```bash
npm start
# Server running at http://localhost:3000
```

### 5. Open the app
Navigate to **http://localhost:3000** in your browser.

---

## Assignment (TODOs)

Every `// TODO` comment marks a section students must implement:

| File | Task |
|------|------|
| `server.js` | Uncomment the route imports and `app.use()` lines |
| `routes/customers.js` | Implement all 5 CRUD endpoints |
| `routes/products.js` | Implement all 5 CRUD endpoints |
| `routes/orders.js` | Implement all 5 CRUD endpoints (including JOIN queries) |
| `public/product_app.js` | Replace placeholder calls with real `apiFetch()` calls |
| `public/orders_app.js` | Replace placeholder calls with real `apiFetch()` calls |
| `public/signup_app.js` | Replace placeholder calls with real `apiFetch()` calls |

---

## API Endpoints (after implementation)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/:id` | Get one customer |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET | `/api/products` | List products (supports `?search=`) |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/orders` | List all orders (with JOIN) |
| GET | `/api/orders/:id` | Get one order |
| POST | `/api/orders` | Place an order |
| PATCH | `/api/orders/:id/status` | Update order status |
| DELETE | `/api/orders/:id` | Delete order |

