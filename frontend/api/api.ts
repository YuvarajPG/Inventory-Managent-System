import ProductType from "../src/types/Product";

// api.ts
const BASE_URL = "http://localhost:3000";
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

export const addProductAPI = async (newItem: ProductType) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  return response.json();
};

export const searchProductsAPI = async (search: string) => {
  const response = await fetch(`${BASE_URL}/products?search=${search}`);

  return await response.json();
};

export const editProductAPI = async (editedProduct: ProductType) => {
  const response = await fetch(`${BASE_URL}/products/${editedProduct.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedProduct),
  });

  return response.json();
};

export const deleteAPI = async (deleteItemID: string) => {
  const response = await fetch(`${BASE_URL}/products/${deleteItemID}`, {
    method: "DELETE",
  });

  return response.json();
};
