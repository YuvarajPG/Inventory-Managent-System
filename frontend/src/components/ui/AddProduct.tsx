import { useState } from "react";
import { ProductType } from "../../types/Product";
import Button from "./Button";
import Input from "./Input";
interface Props {
  setProductList: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const AddProduct = ({ setProductList }: Props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");

  const handleAddProduct = () => {
    const newProduct: ProductType = {
      id: crypto.randomUUID(),
      name,
      brand,
      price,
      stock,
      details: {
        ram,
        rom,
      },
      timestamp: new Date().toISOString(),
    };

    setProductList((prev) => [...prev, newProduct]);

    // Clear form
    setName("");
    setBrand("");
    setPrice(0);
    setStock(0);
    setRam("");
    setRom("");
  };
  return (
    <div className="flex flex-wrap flex-col items-center mt-5 gap-y-2">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-x-4 gap-y-4">
        <Input text="name : " onChange={(e) => setName(e.target.value)} />
        <Input text="brand : " onChange={(e) => setBrand(e.target.value)} />
        <Input
          type="number"
          text="stock : "
          onChange={(e) => setStock(Number(e.target.value))}
        />
        <Input text="price : " type="number" onChange={(e) => e.target.value} />
        <Input text="RAM : " type="number" onChange={(e) => e.target.value} />
        <Input text="ROM : " type="number" onChange={(e) => e.target.value} />
      </div>
      <Button text="add" color="blue" onClick={handleAddProduct} />
    </div>
  );
};

export default AddProduct;
