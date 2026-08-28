import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import { DashboardStats } from "../../components/DashboardStats";
import AvailableProducts from "../../components/AvailableProducts";
import { ProductModal } from "../../components/modal/ProductModal";
import ProductType from "../../types/Product";
import {
  deleteAPI,
  editProductAPI,
  getProducts,
  searchProductsAPI,
} from "../../../api/api";

export const Version2WithoutAi: React.FC = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    async function load() {
      setProductList(await getProducts());
    }

    load();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductType | null>(null);

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (product: ProductType) => {
    const update = await editProductAPI(product);
    setProductToEdit(update);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (product: ProductType) => {
    if (productToEdit) {
      setProductList((prev) =>
        prev.map((item) => (item.id === product.id ? product : item)),
      );
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const deleteItem = await deleteAPI(id);
    setProductList((prev) => prev.filter((item) => item.id !== deleteItem));
  };

  const handleUpdateStock = (id: string, delta: number) => {
    setProductList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          return { ...item, stock: newStock };
        }
        return item;
      }),
    );
  };
  const handleSearch = async (text: string) => {
    setSearchTerm(text);
    setProductList(await searchProductsAPI(text));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Modern Header */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />

      {/* Main Standard View (No AI) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <DashboardStats products={productList} />

        <AvailableProducts
          productList={productList}
          searchTerm={searchTerm}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteProduct}
          onUpdateStock={handleUpdateStock}
        />
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default Version2WithoutAi;
