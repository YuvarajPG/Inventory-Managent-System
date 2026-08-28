import express from "express";
import cors from "cors";
import { addProducts, removeProduct, searchProduct, update } from "./IMS";
import { loadInventory } from "./extra";
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

/* root url */
app.get("/", (req, res) => {
  res.send("<h1>HELO, \n WELCOME TO BACKEND</h1>");
});

/* shows all products to ui */
app.get("/products", async (req, res) => {
  const inv = await loadInventory();
  const search = String(req.query.search || "");
  if (search === "") {
    return res.json(inv);
  }
  const filtered = await searchProduct(search);
  res.json(filtered);
});

/* add product */
app.post("/products", async (req, res) => {
  const newProduct = await addProducts(req.body);
  res.status(201).json(newProduct);
});

/* edit product */
app.put("/products/:id", async (req, res) => {
  const edited = await update(req.params.id, req.body);
  res.json(edited);
});

/* delete product */
app.delete("/products/:id", async (req, res) => {
  const del = String(req.params.id);
  const deleted = await removeProduct(del);
  return res.json(deleted);
});

export default app;
