# Free POS API

A clean, type-safe **Point-of-Sale (POS)** REST API built with modern TypeScript tools. Designed with maintainability, scalability, and best practices in mind. If you want empty project, just clone or switch to boilerplate repo and you will get what you want!

## Features

- **TypeScript** — strong typing for safer & more maintainable code
- **Express** — lightweight & flexible web framework
- **JWT** — A proposed standard for creating data with optional signature or encryption payload holds JSON
- **MySQL or PostgreSQL** — greate choice database (for dev & prod deployments)
- Clean Architecture — clear separation of concerns (controllers, services, routes)
- Centralized error handling
- Modular & easily extensible structure
- Development-friendly setup with hot-reload

## Tech Stack

| Layer           | Technology        |
| --------------- | ----------------- |
| Language        | TypeScript        |
| Framework       | Express           |
| Database        | MySQL             |
| Runtime         | Node.js           |
| Dev server      | Nodemon + ts-node |
| Package manager | pnpm              |
| Authentication  | JWT & Bcrypt      |

## Project Architecture

```
src/
├── repositories/      # Data access layer - database queries
├── controllers/       # Request/response handling - HTTP layer
├── services/          # Business logic layer
├── routers/            # Feature-based route definitions
├── middlewares/       # Validation, error handling, auth, etc.
├── utils/             # Helper functions & shared utilities
├── config/            # Database configurations & environment setup
├── database/          # Database scripts and migrations
├── types/             # Global types for the project
│   ├── db_schema.sql  # Database table schemas
│   ├── migrate.ts     # Migration runner script
│   ├── seed.ts        # Seed runner script
│   └── seeds/         # Seed data files
└── server.ts          # Application entry point
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ChungsiangRoeurn/zuro-api
cd pos-api-boilerplate

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations to create database tables
pnpm migrate

# Seed the database with initial data
pnpm seed

# Start development server (with hot reload)
pnpm dev
```

## Scripts

```bash
{
  "dev": "nodemon --watch 'src/**/*.ts' --exec 'node --loader ts-node/esm src/server.ts'",
  "start": "node dist/server.js",
  "build": "tsc",
  "migrate": "ts-node src/database/migrate.ts",
  "seed": "ts-node src/database/seed.ts",
  "test": "jest",
  "test:watch": "jest --watch",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix"
}
```

### Script Descriptions

- `pnpm dev` — Start development server with hot reload
- `pnpm start` — Start production server
- `pnpm build` — Compile TypeScript to JavaScript
- `pnpm migrate` — Run database migrations
- `pnpm seed` — Seed database with sample data
- `pnpm test` — Run test suite
- `pnpm lint` — Check code for linting errors
- `pnpm lint:fix` — Auto-fix linting errors

## API Endpoints

### Authentication

```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # User login
POST   /api/auth/refresh     # Refresh access token
```

### Products

```
GET    /api/products         # Get all products
GET    /api/products/:id     # Get product by ID
POST   /api/products         # Create new product
PUT    /api/products/:id     # Update product
DELETE /api/products/:id     # Delete product
```

### Orders

```
GET    /api/orders           # Get all orders
GET    /api/orders/:id       # Get order by ID
POST   /api/orders           # Create new order
PUT    /api/orders/:id       # Update order status
```

# HAPPY CODING!

Built with ❤️ By JIANGSUNG
