# Inventory Management System - Backend

A simple Inventory Management System (IMS) backend built with **TypeScript** and **Node.js**. This project provides CRUD (Create, Read, Update, Delete) operations for managing products using a JSON file as storage.

---

## Features

- Add new products
- Search products
- Update product information
- Delete products
- View inventory
- Data persistence using JSON
- TypeScript support
- Input validation
- CLI-based interaction

---

## Technologies Used

- Node.js
- TypeScript
- fs/promises
- readline/promises

---

## Project Structure

```
src/
├── IMS.ts              # Business logic
├── interactions.ts     # CLI interface
├── extra.ts            # Helper functions
├── data.ts             # Product types/interfaces
└── validation.ts       # Input validation

inventory.json          # Inventory database
removed.json            # Deleted products
```

---

## Product Structure

```ts
{
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  details: {
    ram: string;
    rom: string;
  }
  timestamp: string;
}
```

---

## Available Operations

- Add Product
- Search Product
- Update Product
- Delete Product
- View Inventory

---

## Validation

The application validates user input before saving data.

Examples:

- Product name cannot be empty.
- Price must be greater than 0.
- Stock must be a positive number.
- RAM and ROM values are validated.
- Duplicate products are prevented.

---

## Installation

Clone the repository

```bash
git clone https://github.com/YuvarajPG/Inventory-Managent-System.git
```

Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

---

## Run

```bash
npm run dev
```

or

```bash
pnpm dev
```

If no script is configured:

```bash
tsx src/interactions.ts
```

---

## Future Improvements

- REST API using Express
- Database support (SQLite / PostgreSQL / MongoDB)
- React frontend
- Authentication
- Product categories
- Image upload
- Better validation
- Unit testing

---

## Status

🚧 Work in Progress

Backend functionality is complete and currently uses JSON as the data source. The frontend is under development.

---

## Author

**Yuvaraj P.G**

GitHub: https://github.com/YuvarajPG
