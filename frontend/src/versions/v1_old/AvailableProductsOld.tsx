import React, { Dispatch, useState } from "react";
import ProductType from "../../types/Product";
import ProductCardOld from "./ProductCardOld";
import DeleteModal from "../../components/modal/DeleteModal";
import EditModal from "../../components/modal/EditModal";
import { deleteAPI, editProductAPI } from "../../../api/api";

interface Props {
  productList: ProductType[];
  setProductList: Dispatch<React.SetStateAction<ProductType[]>>;
}

const AvailableProductsOld = ({ productList, setProductList }: Props) => {
  /* delete modal */
  const handleDelete = async (item: string) => {
    setProductList(await deleteAPI(item));
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const openModal = async (id: string) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const deleteCloseModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedProductId) {
      await handleDelete(selectedProductId);
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

  const handleSaveChanges = async () => {
    if (!selectedProduct) return;
    const updated = await editProductAPI(selectedProduct);
    setProductList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p)),
    );
    closeEditModal();
  };

  const handleEdit = (id: string) => {
    const productToEdit = productList.find((product) => product.id === id);
    if (productToEdit) {
      openEditModal(productToEdit);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <hr className="border-t-2 border-gray-300 w-full" />
      <p className="font-bold text-lg my-2">Available Products</p>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        {productList.map((item) => (
          <ProductCardOld
            key={item.id}
            product={item}
            onEdit={handleEdit}
            onDelete={openModal}
          />
        ))}
      </ul>

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
    </div>
  );
};

export default AvailableProductsOld;
