# KSP Shop — Full-Stack E-commerce

A full-stack e-commerce platform built with Next.js, TypeScript, Prisma, and PostgreSQL, featuring customer shopping functionality and an admin dashboard.

## Features

- User registration, login, and secure authentication
- Product and category management
- Product details and customer reviews
- Shopping cart and checkout
- Order creation and tracking
- Admin dashboard for managing products, categories, and orders
- Role-based authorization and protected routes
- Input validation using Zod
- Password hashing and JWT authentication
- Transaction-based order processing and stock management
- Responsive user interface

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT, cookies, and password hashing

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the required environment variables in a local `.env` file according to the project's configuration.
4. Complete the database setup using the project's Prisma configuration.
5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Security

The application includes server-side authorization, input validation, protected resources, and safeguards for order processing.

## Author

GitHub: https://github.com/code-ofwar