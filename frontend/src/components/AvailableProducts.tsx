import React, { useState } from "react";
import { ProductType } from "../types/Product";
import Button from "./ui/Button";
import Input from "./ui/Input";
interface props {
  productList: ProductType[];
  setProductList: React.Dispatch<React.SetStateAction<ProductType[]>>;
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
    <div className="flex items-center gap-4 flex-col ">
      <hr className="border-t-2 border-gray-300 w-full" />
      <div className=" ">
        <ul className="flex gap-4 mt-4 flex-wrap justify-center marker:-none mx-4 cursor-default">
          {productList.map((item) => (
            <div
              key={item.id}
              className={
                "gap-2 flex flex-col bg-slate-400 p-4 rounded-lg min-w-45 max-w-35 justify-between shadow-lg hover:shadow-2xl hover:shadow-gray-700 hover:cursor-pointer shadow-gray-500"
              }
            >
              <li className="font-bold w-">{item.name}</li>
              <li className="font-semibold">Brand: {item.brand}</li>
              <li>Price: ${item.price}</li>
              <li>Stock: {item.stock}</li>
              <li>Ram: {item.details.ram}</li>
              <li>Rom: {item.details.rom}</li>
              <div className="flex gap-2 mt-2 justify-center"></div>
              <Button
                text="edit"
                color="green"
                onClick={() => handleEdit(item.id)}
              />

              {/* modal */}
              {editModalOpen && selectedProduct?.id === item.id && (
                <div className="fixed inset-0 bg-white/10 backdrop-blur-md border border-white/20 bg-opacity-50 flex items-center justify-center flex-col z-50">
                  <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <p>Edit details for {selectedProduct.name}</p>
                    <Input
                      text="price"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: Number(e.target.value),
                        })
                      }
                    />
                    <Input
                      text="stock : "
                      value={selectedProduct.stock}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock: Number(e.target.value),
                        })
                      }
                    />
                    <Input
                      text="RAM : "
                      value={selectedProduct.details.ram}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          details: {
                            ...selectedProduct.details,
                            ram: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      value={selectedProduct.details.rom}
                      text="ROM : "
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          details: {
                            ...selectedProduct.details,
                            rom: e.target.value,
                          },
                        })
                      }
                    />
                    <div className="flex gap-2 mt-4 justify-center">
                      <Button
                        color="blue"
                        text="save changes"
                        onClick={(e) => handleSaveChanges()}
                      />
                      <Button
                        color="gray"
                        text="cancel"
                        onClick={closeEditModal}
                      />
                    </div>
                  </div>
                </div>
              )}
              {modalOpen && selectedProductId === item.id && (
                <div className="fixed inset-0 bg-white/10 backdrop-blur-md border border-white/20 bg-opacity-50 flex items-center justify-center flex-col z-50">
                  <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="flex gap-2 mt-4 justify-center">
                      <Button color="red" text="yes" onClick={confirmDelete} />
                      <Button color="gray" text="no" onClick={cancelDelete} />
                    </div>
                  </div>
                </div>
              )}
              <Button
                color="red"
                text="delete"
                onClick={() => openModal(item.id)}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableProducts;
