import React, { useEffect, useState } from "react";
import ProductType from "../types/Product";
import Navbar from "./Navbar";
import { DashboardStats } from "./DashboardStats";
import { ControlsBar, StockFilterOption, SortOption, ViewMode } from "./ControlsBar";
import { ProductTable } from "./ProductTable";
import { ProductGrid } from "./ProductGrid";
import { ProductModal } from "./modal/ProductModal";
import { DeleteModal } from "./modal/DeleteModal";
import { ToastContainer, ToastMessage } from "./ui/Toast";
import {
  addProductAPI,
  deleteAPI,
  editProductAPI,
  getProducts,
  searchProductsAPI,
} from "../../api/api";

export const InventoryManager: React.FC = () => {
  // Inventory Data State
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Controls State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [stockFilter, setStockFilter] = useState<StockFilterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  // Dialog State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductType | null>(null);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load Catalog from API
  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load inventory:", err);
      setError("Unable to connect to inventory backend service.");
      addToast("error", "Error connecting to inventory backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // Search input handler with API query sync
  const handleSearchChange = async (query: string) => {
    setSearchTerm(query);
    try {
      if (!query.trim()) {
        await loadInventory();
      } else {
        const results = await searchProductsAPI(query);
        setProducts(Array.isArray(results) ? results : []);
      }
    } catch (err) {
      console.error("Search API error:", err);
      addToast("error", "Failed to search products.");
    }
  };

  // Modal Open Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductType) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (product: ProductType) => {
    try {
      if (editingProduct) {
        await editProductAPI(product);
        addToast("success", `Updated "${product.name}".`);
      } else {
        await addProductAPI(product);
        addToast("success", `Added "${product.name}" to inventory.`);
      }

      setIsProductModalOpen(false);

      if (searchTerm.trim()) {
        const results = await searchProductsAPI(searchTerm);
        setProducts(Array.isArray(results) ? results : []);
      } else {
        await loadInventory();
      }
    } catch (err) {
      console.error("Save product error:", err);
      addToast("error", `Failed to ${editingProduct ? "update" : "save"} product.`);
    }
  };

  // Inline Stock +/- Adjustment
  const handleUpdateStock = async (id: string, delta: number) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const newStock = Math.max(0, target.stock + delta);
    const updatedProduct = { ...target, stock: newStock, timestamp: new Date().toISOString() };

    // Optimistic UI update
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));

    try {
      await editProductAPI(updatedProduct);
    } catch (err) {
      console.error("Stock update error:", err);
      addToast("error", `Failed to update stock for "${target.name}".`);
      loadInventory(); // Revert on failure
    }
  };

  // Delete Handlers
  const handleDeleteClick = (product: ProductType) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    const name = deletingProduct.name;
    const id = deletingProduct.id;

    try {
      const res = await deleteAPI(id);
      if (Array.isArray(res)) {
        setProducts(res);
      } else {
        await loadInventory();
      }
      addToast("success", `Deleted "${name}" from inventory.`);
    } catch (err) {
      console.error("Delete error:", err);
      addToast("error", `Failed to delete "${name}".`);
    } finally {
      setDeletingProduct(null);
    }
  };

  // Extract unique brands
  const brandsList = [
    "All",
    ...Array.from(new Set(products.map((p) => p.brand))).filter(Boolean),
  ];

  // Filtering & Sorting Pipeline
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand =
        selectedBrand === "All" ||
        product.brand.toLowerCase() === selectedBrand.toLowerCase();

      let matchesStock = true;
      if (stockFilter === "inStock") matchesStock = product.stock > 5;
      else if (stockFilter === "lowStock") matchesStock = product.stock > 0 && product.stock <= 5;
      else if (stockFilter === "outOfStock") matchesStock = product.stock === 0;

      return matchesSearch && matchesBrand && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return 0;
    });

  const handleResetFilters = () => {
    setSelectedBrand("All");
    setStockFilter("all");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-12">
      {/* Header */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onOpenAddModal={handleOpenAddModal}
        totalProductsCount={products.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Statistics Strip */}
        <DashboardStats products={products} />

        {/* Controls Bar */}
        <ControlsBar
          brands={brandsList}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          onResetFilters={handleResetFilters}
        />

        {/* Content Display: Loading, Error, Empty, or Products */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded p-12 text-center my-2 shadow-xs">
            <div className="inline-block w-5 h-5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin mb-2" />
            <p className="text-xs text-slate-500 font-medium">Loading inventory...</p>
          </div>
          ) : error ? (
            <div className="bg-white border border-red-200 rounded-md p-6 text-center my-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600 mb-2.5 text-xs font-bold">
                !
              </div>
              <div className="text-xs font-semibold text-red-800 mb-1">Backend Connection Error</div>
              <p className="text-xs text-slate-600 mb-1 max-w-md mx-auto">{error}</p>
              <p className="text-[11px] text-slate-400 mb-3.5">
                Make sure your Express server is running on <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono text-[10px]">http://localhost:3000</code>.
              </p>
              <button
                type="button"
                onClick={loadInventory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Retry Connection</span>
              </button>
            </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded p-10 text-center my-2 shadow-xs">
            <h4 className="text-sm font-semibold text-slate-800">No matching products found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || selectedBrand !== "All" || stockFilter !== "all"
                ? "No products match the active search or filter criteria."
                : "No products exist in inventory. Click 'Add Product' to create one."}
            </p>
            {(searchTerm || selectedBrand !== "All" || stockFilter !== "all") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 text-xs text-slate-700 hover:text-slate-900 underline font-medium cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : viewMode === "table" ? (
          <ProductTable
            products={filteredProducts}
            onEdit={handleOpenEditModal}
            onDeleteClick={handleDeleteClick}
            onUpdateStock={handleUpdateStock}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onEdit={handleOpenEditModal}
            onDeleteClick={handleDeleteClick}
            onUpdateStock={handleUpdateStock}
          />
        )}
      </main>

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        product={deletingProduct}
        onCancel={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default InventoryManager;
