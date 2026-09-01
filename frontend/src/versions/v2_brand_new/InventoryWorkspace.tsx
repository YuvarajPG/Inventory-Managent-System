import React, { useEffect, useState } from "react";
import ProductType from "../../types/Product";
import {
  addProductAPI,
  deleteAPI,
  editProductAPI,
  getProducts,
  searchProductsAPI,
} from "../../../api/api";

export const InventoryWorkspace: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "inStock" | "lowStock" | "outOfStock">("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [sortField, setSortField] = useState<"name" | "price-asc" | "price-desc" | "stock">("name");
  const [viewStyle, setViewStyle] = useState<"cards" | "compact">("cards");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductType | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<ProductType | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formBrand, setFormBrand] = useState("");
  const [formPrice, setFormPrice] = useState<number | "">(0);
  const [formStock, setFormStock] = useState<number | "">(0);
  const [formRam, setFormRam] = useState("");
  const [formRom, setFormRom] = useState("");

  const loadCatalog = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed loading products from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  // Search handler with Backend API sync
  const handleSearchChange = async (query: string) => {
    setSearch(query);
    try {
      if (!query.trim()) {
        await loadCatalog();
      } else {
        const res = await searchProductsAPI(query);
        setProducts(Array.isArray(res) ? res : []);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Open Modal for Create or Edit
  const openCreateModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormBrand("");
    setFormPrice(0);
    setFormStock(0);
    setFormRam("");
    setFormRom("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: ProductType) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormBrand(item.brand);
    setFormPrice(item.price);
    setFormStock(item.stock);
    setFormRam(item.details?.ram || "");
    setFormRom(item.details?.rom || "");
    setIsModalOpen(true);
  };

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formBrand.trim()) return;

    const payload: ProductType = {
      id: editingItem ? editingItem.id : crypto.randomUUID(),
      name: formName.trim(),
      brand: formBrand.trim(),
      price: Number(formPrice) || 0,
      stock: Number(formStock) || 0,
      details: {
        ram: formRam.trim() || "N/A",
        rom: formRom.trim() || "N/A",
      },
      timestamp: editingItem ? editingItem.timestamp : new Date().toISOString(),
    };

    try {
      if (editingItem) {
        await editProductAPI(payload);
      } else {
        await addProductAPI(payload);
      }
      setIsModalOpen(false);
      if (search) {
        const res = await searchProductsAPI(search);
        setProducts(Array.isArray(res) ? res : []);
      } else {
        await loadCatalog();
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Stock Quick Incrementation (Optimistic + Backend)
  const handleQuickStock = async (id: string, delta: number) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const updatedStock = Math.max(0, target.stock + delta);
    const updatedObj = { ...target, stock: updatedStock };

    setProducts((prev) => prev.map((p) => (p.id === id ? updatedObj : p)));

    try {
      await editProductAPI(updatedObj);
    } catch (err) {
      console.error("Failed updating stock:", err);
      loadCatalog();
    }
  };

  // Delete Action
  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const res = await deleteAPI(deleteCandidate.id);
      if (Array.isArray(res)) {
        setProducts(res);
      } else {
        await loadCatalog();
      }
      setDeleteCandidate(null);
    } catch (err) {
      console.error("Failed deleting product:", err);
    }
  };

  // Derived Values
  const brandsList = [
    "All",
    ...Array.from(new Set(products.map((p) => p.brand))).filter(Boolean),
  ];

  const totalCatalogValuation = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const lowStockItems = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockItems = products.filter((p) => p.stock === 0).length;

  // Filtered & Sorted Catalog
  const filteredCatalog = products
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());

      const matchesBrand =
        selectedBrand === "All" ||
        item.brand.toLowerCase() === selectedBrand.toLowerCase();

      let matchesStatus = true;
      if (activeTab === "inStock") matchesStatus = item.stock > 5;
      else if (activeTab === "lowStock") matchesStatus = item.stock > 0 && item.stock <= 5;
      else if (activeTab === "outOfStock") matchesStatus = item.stock === 0;

      return matchesSearch && matchesBrand && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "name") return a.name.localeCompare(b.name);
      if (sortField === "price-asc") return a.price - b.price;
      if (sortField === "price-desc") return b.price - a.price;
      if (sortField === "stock") return b.stock - a.stock;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-16">
      {/* Background Neon Gradients */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-500 p-[1px] shadow-lg shadow-indigo-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300 tracking-tight">
                    Nexus Inventory
                  </h1>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    V2
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Smart Stock Command Center</p>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="flex flex-1 max-w-lg mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search products by name or brand..."
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-inner transition-all"
                />
                {search && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Create Action */}
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 hover:from-indigo-500 hover:to-violet-400 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-xl hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Items</p>
                <h3 className="text-3xl font-black text-white mt-1">{products.length}</h3>
                <p className="text-xs text-slate-400 mt-1">Across <span className="text-indigo-400 font-bold">{brandsList.length - 1}</span> brands</p>
              </div>
              <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-xl hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Inventory Value</p>
                <h3 className="text-3xl font-black text-emerald-400 mt-1">${totalCatalogValuation.toLocaleString()}</h3>
                <p className="text-xs text-slate-400 mt-1">Total catalog stock worth</p>
              </div>
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-xl hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Low Stock Alert</p>
                <h3 className="text-3xl font-black text-amber-400 mt-1">{lowStockItems}</h3>
                <p className="text-xs text-slate-400 mt-1">Stock level $\le 5$</p>
              </div>
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-xl hover:border-rose-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Out of Stock</p>
                <h3 className="text-3xl font-black text-rose-400 mt-1">{outOfStockItems}</h3>
                <p className="text-xs text-slate-400 mt-1">Immediate reorder required</p>
              </div>
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar & Controls Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-4 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Brand Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {brandsList.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedBrand.toLowerCase() === brand.toLowerCase()
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/30"
                    : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
            >
              <option value="all">All Stock Status</option>
              <option value="inStock">In Stock (&gt; 5)</option>
              <option value="lowStock">Low Stock (1 - 5)</option>
              <option value="outOfStock">Out of Stock (0)</option>
            </select>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock">Stock Level</option>
            </select>

            <div className="flex items-center bg-slate-950/80 rounded-xl p-1 border border-slate-800">
              <button
                onClick={() => setViewStyle("cards")}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  viewStyle === "cards" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewStyle("compact")}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  viewStyle === "compact" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
                title="Compact Table"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Items Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold text-slate-400">Loading catalog items...</p>
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-16 text-center my-8 shadow-xl">
            <h4 className="text-lg font-bold text-white">No products found</h4>
            <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto">
              No inventory products match your current search query or active filter selections.
            </p>
          </div>
        ) : viewStyle === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCatalog.map((product) => {
              const isOut = product.stock === 0;
              const isLow = product.stock > 0 && product.stock <= 5;
              return (
                <div
                  key={product.id}
                  className="group relative rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/50 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {product.brand}
                      </span>
                      {isOut ? (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          In Stock ({product.stock})
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white capitalize line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                      <span className="px-2.5 py-1 bg-slate-950/80 rounded-lg border border-slate-800">
                        RAM: <strong className="text-slate-200">{product.details?.ram || "N/A"}</strong>
                      </span>
                      <span className="px-2.5 py-1 bg-slate-950/80 rounded-lg border border-slate-800">
                        ROM: <strong className="text-slate-200">{product.details?.rom || "N/A"}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                        <div className="text-2xl font-black text-white">${product.price}</div>
                      </div>

                      {/* Stock Pill Buttons */}
                      <div className="flex items-center bg-slate-950/90 rounded-xl border border-slate-800 p-1">
                        <button
                          onClick={() => handleQuickStock(product.id, -1)}
                          disabled={product.stock <= 0}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer font-bold"
                          title="Decrease Stock"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">{product.stock}</span>
                        <button
                          onClick={() => handleQuickStock(product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer font-bold"
                          title="Increase Stock"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="py-2 px-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteCandidate(product)}
                        className="py-2 px-3 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-[11px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Specs (RAM / ROM)</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCatalog.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] uppercase px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                          {product.brand}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-emerald-400">${product.price}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400">
                        {product.details?.ram || "N/A"} / {product.details?.rom || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-bold text-white">{product.stock} units</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteCandidate(product)}
                            className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-slide-up">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-7 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-black text-white">
                {editingItem ? "Edit Inventory Item" : "Create New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Pixel 9 Pro"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    RAM Spec
                  </label>
                  <input
                    type="text"
                    value={formRam}
                    onChange={(e) => setFormRam(e.target.value)}
                    placeholder="e.g. 16 GB"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    ROM Spec
                  </label>
                  <input
                    type="text"
                    value={formRom}
                    onChange={(e) => setFormRom(e.target.value)}
                    placeholder="e.g. 256 GB"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30"
                >
                  {editingItem ? "Save Changes" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-slide-up">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
            <h3 className="text-xl font-black text-white">Confirm Deletion</h3>
            <p className="text-xs text-slate-400 mt-2">
              Are you sure you want to remove <strong className="text-white">{deleteCandidate.name}</strong> from your inventory?
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryWorkspace;
