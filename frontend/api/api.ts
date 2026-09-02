import ProductType from "../src/types/Product";

const BASE_URL = "http://localhost:3000";

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("API getProducts error:", error);
    throw new Error("Unable to connect to inventory backend service at http://localhost:3000");
  }
};

export const addProductAPI = async (newItem: ProductType): Promise<ProductType> => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    return (await response.json()) as ProductType;
  } catch (error) {
    console.error("API addProductAPI error:", error);
    throw new Error("Failed to add product to backend server.");
  }
};

export const searchProductsAPI = async (search: string): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?search=${encodeURIComponent(search)}`);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("API searchProductsAPI error:", error);
    throw new Error("Failed to search products on backend server.");
  }
};

export const editProductAPI = async (editedProduct: ProductType): Promise<ProductType> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${editedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    return (await response.json()) as ProductType;
  } catch (error) {
    console.error("API editProductAPI error:", error);
    throw new Error("Failed to update product on backend server.");
  }
};

export const deleteAPI = async (deleteItemID: string): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${deleteItemID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    return (await response.json()) as ProductType[];
  } catch (error) {
    console.error("API deleteAPI error:", error);
    throw new Error("Failed to delete product from backend server.");
  }
};
