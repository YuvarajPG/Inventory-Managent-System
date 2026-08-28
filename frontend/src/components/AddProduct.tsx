import { useState } from "react";
import ProductType from "../types/Product";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { addProductAPI } from "../../api/api";
import toast from "react-hot-toast";

interface Props {
  setProductList: React.Dispatch<React.SetStateAction<ProductType[]>>;
}
const AddProduct = ({ setProductList }: Props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const handleSubmit = async () => {
    // const wrong = new Audio("./wrong.mp3");
    // const play = wrong.play();
    const err = toast.error;
    if (name.trim() === "") {
      err("Product name is required");
      return;
    }

    if (brand.trim() === "") {
      err("Brand is required");
      return;
    }

    if (Number(price) < 0) {
      err("Price must be greater than 0");
      return;
    }

    if (Number(stock) < 0) {
      err("Stock cannot be negative");
      return;
    }
    await handleAddProduct();
  };
  const handleAddProduct = async () => {
    const crt = new Audio("./correct.wav");
    const newProduct: ProductType = {
      id: crypto.randomUUID(),
      name,
      brand,
      price: Number(price),
      stock: Number(stock),
      details: {
        ram,
        rom,
      },
      timestamp: new Date().toISOString(),
    };

    const added = await addProductAPI(newProduct);
    setProductList((prev) => [...prev, added]);
    setName("");
    setBrand("");
    setPrice("");
    setStock("");
    setRam("");
    setRom("");
    crt.play();
  };

  return (
    <div className="flex flex-wrap flex-col items-center mt-5 gap-y-2">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-x-4 gap-y-4">
        <Input
          value={name}
          text="name : "
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <Input
          value={brand}
          text="brand : "
          onChange={(e) => setBrand(e.target.value)}
          placeholder="brand"
        />
        <Input
          text="Price : "
          placeholder="Price"
          value={price}
          inputMode="numeric"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />

        <Input
          text="Stock : "
          placeholder="stock"
          inputMode="numeric"
          value={stock}
          type="number"
          onChange={(e) => setStock(e.target.value)}
        />
        <Input
          value={ram}
          text="RAM : "
          onChange={(e) => setRam(e.target.value)}
          placeholder="ram"
        />
        <Input
          value={rom}
          text="ROM : "
          onChange={(e) => setRom(e.target.value)}
          placeholder="rom"
        />
      </div>
      <Button text="add" color="blue" onClick={handleSubmit} />
    </div>
  );
};

export default AddProduct;
