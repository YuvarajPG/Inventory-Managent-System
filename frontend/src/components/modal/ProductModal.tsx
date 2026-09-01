import React, { useState, useEffect } from "react";
import ProductType from "../../types/Product";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductType) => void;
  productToEdit?: ProductType | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">(0);
  const [stock, setStock] = useState<number | "">(0);
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setRam(productToEdit.details?.ram || "");
      setRom(productToEdit.details?.rom || "");
    } else {
      setName("");
      setBrand("");
      setPrice(0);
      setStock(0);
      setRam("");
      setRom("");
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brand.trim()) return;

    const productData: ProductType = {
      id: productToEdit ? productToEdit.id : crypto.randomUUID(),
      name: name.trim(),
      brand: brand.trim(),
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      details: {
        ram: ram.trim() || "N/A",
        rom: rom.trim() || "N/A",
      },
      timestamp: productToEdit
        ? productToEdit.timestamp
        : new Date().toISOString(),
    };

    onSave(productData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl max-w-lg w-full p-7 shadow-2xl shadow-indigo-950/60 relative overflow-hidden">
        {/* Accent Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              {productToEdit ? "Edit Product" : "Add New Inventory Item"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {productToEdit
                ? "Update specs and stock quantity"
                : "Register a brand new item into stock"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Galaxy S24 Ultra"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Brand *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Samsung"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Unit Price ($) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Initial Stock *
              </label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="0"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* RAM */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                RAM Spec
              </label>
              <input
                type="text"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="e.g. 12 GB"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* ROM */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                ROM / Storage Spec
              </label>
              <input
                type="text"
                value={rom}
                onChange={(e) => setRom(e.target.value)}
                placeholder="e.g. 512 GB"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 active:scale-95 transition-all cursor-pointer"
            >
              {productToEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
