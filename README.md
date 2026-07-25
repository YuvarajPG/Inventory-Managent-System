# 📦 Inventory Management System

A full-stack Inventory Management System built with **TypeScript**. The project allows users to manage products through a modern React frontend and a TypeScript backend.

> 🚧 This project is currently under active development.

---

## ✨ Features

### Backend

- ✅ Add Products
- ✅ Search Products
- ✅ Update Products
- ✅ Delete Products
- ✅ View Inventory
- ✅ JSON-based storage
- ✅ Input validation
- ✅ TypeScript

### Frontend

- ✅ Product Cards
- ✅ Edit Product Modal
- ✅ Delete Confirmation Modal
- ✅ Responsive Layout
- 🚧 Search
- 🚧 Backend Integration
- 🚧 Add Product Form

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- TypeScript
- fs/promises
- readline/promises

---

## 📁 Project Structure

```
Inventory-Management-System/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── inventory.json
│   ├── removed.json
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots

> Coming Soon

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/YuvarajPG/Inventory-Managent-System.git

cd Inventory-Managent-System
```

---

## Backend

Install dependencies

```bash
cd backend

pnpm install
```

Run

```bash
pnpm dev
```

---

## Frontend

Install dependencies

```bash
cd frontend

pnpm install
```

Run

```bash
pnpm dev
```

Open

```
http://localhost:5173
```

---

## Product Model

```ts
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  details: {
    ram: string;
    rom: string;
  };
  timestamp: string;
}
```

---

## Roadmap

### Version 1

- [x] CLI Inventory System
- [x] CRUD Operations
- [x] JSON Database
- [x] Validation

### Version 2

- [x] React Frontend
- [x] Product Cards
- [x] Edit Modal
- [x] Delete Modal
- [ ] Backend API Integration
- [ ] Search Products
- [ ] Add Product Form
- [ ] Responsive UI
- [ ] Dark Mode

### Future

- Express REST API
- SQLite / PostgreSQL
- Authentication
- Dashboard
- Categories
- Charts
- Pagination
- Unit Testing
- Docker Support

---

## Current Status

| Module      | Status         |
| ----------- | -------------- |
| Backend     | ✅ Working     |
| Frontend UI | 🚧 In Progress |
| API         | ⏳ Planned     |
| Database    | JSON           |
| Validation  | ✅             |
| CRUD        | ✅             |

---

## Author

**Yuvaraj P.G**

GitHub: https://github.com/YuvarajPG

---

## License

This project is created for learning purposes.
