import { useState } from "react";
import AvailableProducts from "./components/AvailableProducts";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/ui/Navbar";
import { ProductType } from "./types/Product";
import { products } from "./data/data";
import SearchBar from "./components/SearchBar";

function App() {
  const [productList, setProductList] = useState<ProductType[]>(products);

  return (
    <>
      <Navbar />
      <AddProduct setProductList={setProductList} />
      <SearchBar setProductList={setProductList} />
      <AvailableProducts
        productList={productList}
        setProductList={setProductList}
      />
    </>
  );
}
export default App;
