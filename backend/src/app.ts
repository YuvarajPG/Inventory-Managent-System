import express from "express";
import inv from './inventory.json'
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
app.get("/products", (req, res) => {
  res.send(inv);
});
app.get("/", (req, res) => {
  res.send("<h1>helo</h1>");
});
export default app;
