# 📦 Inventory Management System

A full-stack Inventory Management System built with **TypeScript**. It provides a React frontend and a TypeScript/Node.js backend for managing products through REST APIs.

> 🚧 **This project is currently under active development.**
>
> The current version uses JSON for data persistence. Database integration, authentication, user roles, and additional backend features are planned for future versions.

---

## 🚀 Live Demo

**[Open the live application](https://inventory-managent-system-project.vercel.app/)**

## 💻 GitHub

**[View the source code](https://github.com/YuvarajPG/Inventory-Managent-System)**

---

## ✨ Features

### Inventory

- ✅ Add products
- ✅ Edit products
- ✅ Delete products
- ✅ Search products
- ✅ Update stock levels
- ✅ Sort and filter inventory
- ✅ View inventory statistics
- ✅ Track removed products

### Backend

- ✅ RESTful API
- ✅ Product CRUD operations
- ✅ Search API
- ✅ Input validation
- ✅ JSON-based persistent storage
- ✅ TypeScript

### Frontend

- ✅ React + TypeScript
- ✅ Responsive inventory interface
- ✅ Product table
- ✅ Add/Edit product modal
- ✅ Delete confirmation
- ✅ Search
- ✅ Sorting and filtering
- ✅ Stock management

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- TypeScript
- fs/promises

### Data Storage

- JSON (`inventory.json`)
- JSON (`removed.json`)

---

## 📁 Project Structure

```
Inventory-Managent-System/
│
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

![Inventory Dashboard](https://github.com/YuvarajPG/Inventory-Managent-System/blob/main/preview.jpeg)

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/YuvarajPG/Inventory-Managent-System.git
cd Inventory-Managent-System
```

### Backend

```bash
cd backend
pnpm install
pnpm dev
```

### Frontend

Open another terminal:

```bash
cd frontend
pnpm install
pnpm dev
```

Then open:

```
http://localhost:5173
```

---

## 📦 Product Model

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

## 🗺️ Roadmap

### Completed

- [x] CLI inventory system
- [x] CRUD operations
- [x] JSON data persistence
- [x] Input validation
- [x] React frontend
- [x] Product management UI
- [x] REST API integration
- [x] Search
- [x] Stock management
- [x] Sorting and filtering
- [x] Responsive UI

### Planned

- [ ] Database integration
- [ ] Authentication
- [ ] User roles and permissions
- [ ] Inventory history
- [ ] Pagination
- [ ] Unit testing
- [ ] Docker support
- [ ] Additional dashboard features

---

## 📌 Current Status

| Module | Status |
| --- | --- |
| Frontend | ✅ Working |
| Backend | ✅ Working |
| REST API | ✅ Working |
| CRUD | ✅ Working |
| Search | ✅ Working |
| Stock Management | ✅ Working |
| Data Storage | JSON |
| Database | 🚧 Planned |
| Authentication | 🚧 Planned |

---

## 👤 Author

**Yuvaraj P.G**

- GitHub: https://github.com/YuvarajPG

---

## 📄 License

This project is created for learning and development purposes.
