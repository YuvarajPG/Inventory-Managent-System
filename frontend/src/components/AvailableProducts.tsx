import React, { Dispatch, useState } from "react";
import { ProductType } from "../types/Product";
import ProductCard from "./ProductCard";
import DeleteModal from "./modal/DeleteModal";
import EditModal from "./modal/EditModal";
interface props {
  productList: ProductType[];
  setProductList: Dispatch<React.SetStateAction<ProductType[]>>;
}
const AvailableProducts = ({ productList, setProductList }: props) => {
  /* delete modal */

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((product) => product.id !== id));
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const openModal = (id: string) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const deleteCloseModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      handleDelete(selectedProductId);
      deleteCloseModal();
    }
  };
  const cancelDelete = () => {
    deleteCloseModal();
  };

  /* edit modal */
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  const openEditModal = (product: ProductType) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      setProductList((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product,
        ),
      );
    }
    closeEditModal();
  };
  const handleEdit = (id: string) => {
    const productToEdit = productList.find((product) => product.id === id);
    if (productToEdit) {
      openEditModal(productToEdit);
    }
  };

  return (
    <div className=" flex flex-col items-center">
      <hr className="border-t-2 border-gray-300 w-full" />
      <p className="font-bold text-lg">Available Products</p>
      <ul className="flex items-center justify-center gap-4">
        {productList.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onEdit={handleEdit}
            onDelete={openModal}
          />
        ))}
        <DeleteModal
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          open={modalOpen}
        />
        <EditModal
          open={editModalOpen}
          product={selectedProduct}
          setProduct={setSelectedProduct}
          onSave={handleSaveChanges}
          onClose={closeEditModal}
        />
      </ul>
    </div>
  );
};

export default AvailableProducts;
