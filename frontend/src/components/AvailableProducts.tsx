import { useState } from "react";
import { products } from "../data/data.ts";
import { ProductType } from "../types/Product.ts";
const AvailableProducts = () => {
  /* delete modal */
  const [productList, setProductList] = useState([...products]);
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

  /* search */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm),
    );
    setProductList(filtered);
  };
  return (
    <div className="flex items-center gap-4 flex-col ">
      <div className="flex items-center">
        <p className="font-bold text-lg">Available Products</p>
      </div>
      <div className="flex justify-end me-4 gap-4">
        <pre className="font-sans">search: </pre>
        <input type="text" className="outline-2" onChange={handleSearch} />
      </div>
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
              <button
                className="bg-[#00df70] text-white px-4 py-2 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-gray-700 shadow-gray-500 drop-shadow-cyan-700"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>

              {/* modal */}
              {editModalOpen && selectedProduct?.id === item.id && (
                <div className="fixed inset-0 bg-white/10 backdrop-blur-md border border-white/20 bg-opacity-50 flex items-center justify-center flex-col z-50">
                  <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <p>Edit details for {selectedProduct.name}</p>
                    price:{" "}
                    <input
                      type="text"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1 mt-2"
                    />
                    <br />
                    stock:{" "}
                    <input
                      type="text"
                      value={selectedProduct.stock}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock: Number(e.target.value),
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1 mt-2"
                    />
                    <br />
                    ram:{" "}
                    <input
                      type="text"
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
                      className="border border-gray-300 rounded px-2 py-1 mt-2"
                    />
                    <br />
                    rom:{" "}
                    <input
                      type="text"
                      value={selectedProduct.details.rom}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          details: {
                            ...selectedProduct.details,
                            rom: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1 mt-2"
                    />
                    <div className="flex gap-2 mt-4 justify-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 hover:cursor-pointer"
                        onClick={closeEditModal}
                      >
                        Cancel
                      </button>
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
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer"
                        onClick={confirmDelete}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 hover:cursor-pointer"
                        onClick={cancelDelete}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                id={`confirm-delete-${item.id}`}
                className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-gray-700 shadow-gray-500 drop-shadow-cyan-700`}
                onClick={() => openModal(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableProducts;
