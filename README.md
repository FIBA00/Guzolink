# Guzolink

A lightweight marketplace platform where local merchants create online shops and sell products. The project includes a Node.js + Express backend and a Vite-based frontend.
<!-- home image inside imgs/home.png -->



## Team & Authors

* **Fraol Bulti**
* **Daniel**
* **Gemechis Bekena**

---

## Overview

This repository contains a full-stack application named Guzolink. The backend provides REST APIs for merchant and shop management, product catalog, orders, customers, and payments. The frontend is a Vite-powered client that lets merchants manage shops and customers browse and buy products.

### Project Previews

| Marketplace Storefront | Merchant Dashboard |
| --- | --- |
|  |  |

---

## Frontend Flow

The frontend follows a render-then-init pattern: the router selects a page, the page returns markup, and an init function attaches event handlers. Key flows include merchant onboarding, shop management, product CRUD, and customer checkout.

---

## Tech Stack

* **Backend:** Node.js, Express, Mongoose (MongoDB)
* **Frontend:** Vite, Vanilla JS, Tailwind CSS
* **Payments:** Stripe (or pluggable provider)
* **Dev Tooling:** nodemon, Jest, Supertest

---

## Repository Layout

```text
├── backend/            # Express API server, models for merchants, shops, products, orders
├── guzolink_client/    # Vite frontend application for merchants and customers
├── imgs/               # Application screenshots and assets used in README
└── scripts/            # Utility scripts (e.g., seed data, create demo merchant)

```

---

## Quick Start

### Prerequisites

* Node.js (v18+ recommended)
* npm
* MongoDB (local or remote instance running)

### 1) Backend Setup

Install dependencies and start the API server:

```bash
cd backend
npm install

# Development environment with auto-reload (nodemon)
npm run dev

# Start production-ready server
npm run start

```

*The server defaults to port `9000` unless the `PORT` environment variable is set.*

### 2) Frontend Setup

Install and run the Vite dev server:

```bash
cd guzolink_client
npm install
npm run dev

```

The frontend runs via Vite and points to the backend API layer as configured.

---

## Environment Variables (Backend)

Place environment variables in one of these locations (the project checks them in priority order):

1. `backend/envs/.env.local` (Development)
2. `backend/envs/.env.prod` (Production)
3. `backend/.env`

### Example Configuration (`backend/envs/.env.local.example`)

Create your local file based on this template:

```env
# Server Configuration
PORT=9000
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1d

# Database Connection
DB_URI=mongodb://localhost:27017/Guzolink
HOST=localhost
DB_NAME=Guzolink

# Third-Party Payments Integrations
PAYMENTS_PROVIDER_KEY=sk_test_yourStripeKeyHere

```

---

## Core API Reference

Below is a reference outlining the primary REST endpoints accessible on the backend:

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| **POST** | `/api/auth/register` | Registers a new local merchant account | No |
| **POST** | `/api/auth/login` | Authenticates merchant and returns JWT token | No |
| **GET** | `/api/shops` | Lists all active marketplace online shops | No |
| **POST** | `/api/shops` | Creates a new vendor shop storefront | **Yes** (Merchant) |
| **GET** | `/api/products` | Fetches a global or shop-specific product catalog | No |
| **POST** | `/api/products` | Adds a new product inventory item to a shop | **Yes** (Merchant) |
| **PUT** | `/api/products/:id` | Updates an existing product listing details | **Yes** (Merchant) |
| **DELETE** | `/api/products/:id` | Removes a product item from the storefront catalog | **Yes** (Merchant) |

---

## Useful Scripts

### Backend Scripts

* `npm run dev` — Starts the `nodemon` development server with auto-reload.
* `npm start` — Runs the application standard Node process execution.
* `npm test` — Executes the test suites using Jest runner framework.

### Frontend Scripts (`guzolink_client`)

* `npm run dev` — Launches local Vite dev instance.
* `npm run build` — Compiles and optimizes assets into distribution files for deployment.
* `npm run preview` — Statically serves the locally built production output for verification.

---

## Create Demo Merchant

The backend includes a utility script to instantly build a demo merchant, sample shop, and initial mock products for swift sandbox experimentation:

```bash
cd backend
node src/scripts/createDemoMerchant.js

```

---

## Testing

Backend unit and integration tests use Jest + Supertest. From the `backend` directory, run:

```bash
npm test

```

---

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request with a clear description of changes and their corresponding rationale.

---

## License

This project is open-source and provided under the terms of the `ISC` license (see the accompanying `LICENSE` file for details).