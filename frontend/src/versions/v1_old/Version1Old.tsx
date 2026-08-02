import React, { useState } from "react";
import AvailableProductsOld from "./AvailableProductsOld";
import AddProduct from "../../components/AddProduct";
import SearchBar from "../../components/SearchBar";
import NavbarOld from "./NavbarOld";
import { ProductType } from "../../types/Product";
import { products as initialProducts } from "../../data/data";

export const Version1Old: React.FC = () => {
  const [productList, setProductList] = useState<ProductType[]>(initialProducts);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-10">
      {/* Old Navbar Header from Commit 68e0610 */}
      <NavbarOld />

      {/* Old Version Main Layout */}
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <AddProduct setProductList={setProductList} />
        <SearchBar setProductList={setProductList} />
        <AvailableProductsOld
          productList={productList}
          setProductList={setProductList}
        />
      </div>
    </div>
  );
};

export default Version1Old;
