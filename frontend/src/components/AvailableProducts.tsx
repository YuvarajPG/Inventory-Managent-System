import React, { useState } from "react";
import { ProductType } from "../types/Product";
import ProductCard from "./ProductCard";
import DeleteModal from "./modal/DeleteModal";

interface AvailableProductsProps {
  productList: ProductType[];
  searchTerm: string;
  onEdit: (product: ProductType) => void;
  onDelete: (id: string) => void;
  onUpdateStock: (id: string, delta: number) => void;
}

const AvailableProducts: React.FC<AvailableProductsProps> = ({
  productList,
  searchTerm,
  onEdit,
  onDelete,
  onUpdateStock,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "lowStock" | "outOfStock">("all");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "stock">("name");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Extract unique brands
  const brands = ["All", ...Array.from(new Set(productList.map((p) => p.brand))).filter(Boolean)];

  // Filter & Search Logic
  const filteredProducts = productList
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = selectedBrand === "All" || product.brand.toLowerCase() === selectedBrand.toLowerCase();

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

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const productToDelete = productList.find((p) => p.id === deleteId);

  return (
    <div className="space-y-6">
      
      {/* Controls Bar */}
      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        
        {/* Brand Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedBrand.toLowerCase() === brand.toLowerCase()
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 border border-slate-700/50"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Filters & View Switches */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Stock Filter Dropdown */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Stock Status</option>
            <option value="inStock">In Stock (&gt; 5)</option>
            <option value="lowStock">Low Stock (1 - 5)</option>
            <option value="outOfStock">Out of Stock (0)</option>
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock">Stock Level</option>
          </select>

          {/* Grid vs Table View Switch */}
          <div className="flex items-center bg-slate-900/80 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid" ? "bg-slate-700 text-indigo-400" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "table" ? "bg-slate-700 text-indigo-400" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Table View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

      </div>

      {/* Main Content Area */}
      {filteredProducts.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-12 text-center my-8">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h4 className="text-base font-semibold text-slate-200">No products found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, brand filter, or stock level filter.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={handleDeleteClick}
              onUpdateStock={onUpdateStock}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Specs (RAM / ROM)</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredProducts.map((product) => {
                  const isOut = product.stock === 0;
                  const isLow = product.stock > 0 && product.stock <= 5;
                  return (
                    <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-700 border border-slate-600 text-slate-300 font-medium">
                          {product.brand}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-400">${product.price}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {product.details?.ram} / {product.details?.rom}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isOut ? "bg-rose-500" : isLow ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                          />
                          <span className="font-semibold">{product.stock} units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEdit(product)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition-all"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
      />

    </div>
  );
};

export default AvailableProducts;
