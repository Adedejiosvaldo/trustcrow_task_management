# TrustCrow Task Management

TrustCrow Task Management is a backend application built with [NestJS](https://nestjs.com/)

## Prerequisites

- Node.js (v14+)
- pnpm package manager

## Setup

```bash
# Clone the repository
git clone https://github.com/Adedejiosvaldo/trustcrow_task_management.git

cd trustcrow_task_management

# Install dependencies
pnpm install
```

## Environment Variables

The application uses the following environment variables defined in the .env file:

- DB_NAME: Name of the database.
- DB_PORT: Port number for the database connection.
- DB_HOST: Host address of the database.
- DB_USERNAME: Username for authentication.
- DB_PASSWORD: Password for authentication.
- DB_SSL: Set to true to enable SSL connection.

## Running the Application

### Development

```bash
pnpm run start:dev
```

### Production

```bash
pnpm run start:prod
```

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Task Management API Docs](https://documenter.getpostman.com/view/28957165/2sAYdkFnw9)
