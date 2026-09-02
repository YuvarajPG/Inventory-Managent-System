import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ProductType from "../../../../types/Product";

interface ProductModalModernProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductType) => void;
  productToEdit?: ProductType | null;
}

export const ProductModalModern: React.FC<ProductModalModernProps> = ({
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);

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
    setErrors({});
  }, [productToEdit, isOpen]);

  // GSAP Entrance Animation
  useEffect(() => {
    if (isOpen && modalBoxRef.current && backdropRef.current) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        modalBoxRef.current,
        { opacity: 0, scale: 0.96, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  // Smooth exit handler
  const handleAnimatedClose = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !modalBoxRef.current || !backdropRef.current) {
      onClose();
      return;
    }

    gsap.to(modalBoxRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 6,
      duration: 0.18,
      ease: "power2.in",
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.18,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  // Keyboard shortcut: Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleAnimatedClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = "Product name is required.";
    if (!brand.trim()) errs.brand = "Brand is required.";
    if (price === "" || Number(price) < 0) errs.price = "Valid non-negative price is required.";
    if (stock === "" || Number(stock) < 0) errs.stock = "Valid non-negative stock quantity is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
      timestamp: productToEdit ? productToEdit.timestamp : new Date().toISOString(),
    };

    onSave(productData);
    handleAnimatedClose();
  };

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modern-product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs"
    >
      <div
        ref={modalBoxRef}
        className="bg-white border border-slate-300 rounded-md max-w-md w-full p-4 shadow-lg relative"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
          <h2 id="modern-product-modal-title" className="text-sm font-semibold text-slate-900">
            {productToEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            type="button"
            onClick={handleAnimatedClose}
            aria-label="Close dialog"
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3 mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Name */}
            <div className="sm:col-span-2">
              <label htmlFor="modern-product-name" className="block text-xs font-medium text-slate-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="modern-product-name"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ThinkPad X1 Carbon"
                className={`w-full px-2.5 py-1.5 bg-white border rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="modern-product-brand" className="block text-xs font-medium text-slate-700 mb-1">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                id="modern-product-brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Lenovo"
                className={`w-full px-2.5 py-1.5 bg-white border rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                  errors.brand
                    ? "border-red-400 focus:ring-red-400"
                    : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                }`}
              />
              {errors.brand && <p className="text-[11px] text-red-600 mt-0.5">{errors.brand}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="modern-product-price" className="block text-xs font-medium text-slate-700 mb-1">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="modern-product-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="0.00"
                className={`w-full px-2.5 py-1.5 bg-white border rounded text-xs text-slate-900 font-mono-nums placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                  errors.price
                    ? "border-red-400 focus:ring-red-400"
                    : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                }`}
              />
              {errors.price && <p className="text-[11px] text-red-600 mt-0.5">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="modern-product-stock" className="block text-xs font-medium text-slate-700 mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                id="modern-product-stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="0"
                className={`w-full px-2.5 py-1.5 bg-white border rounded text-xs text-slate-900 font-mono-nums placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                  errors.stock
                    ? "border-red-400 focus:ring-red-400"
                    : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                }`}
              />
              {errors.stock && <p className="text-[11px] text-red-600 mt-0.5">{errors.stock}</p>}
            </div>

            {/* RAM */}
            <div>
              <label htmlFor="modern-product-ram" className="block text-xs font-medium text-slate-700 mb-1">
                RAM Spec
              </label>
              <input
                id="modern-product-ram"
                type="text"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="e.g. 16 GB"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors"
              />
            </div>

            {/* ROM */}
            <div className="sm:col-span-2">
              <label htmlFor="modern-product-rom" className="block text-xs font-medium text-slate-700 mb-1">
                ROM / Storage Spec
              </label>
              <input
                id="modern-product-rom"
                type="text"
                value={rom}
                onChange={(e) => setRom(e.target.value)}
                placeholder="e.g. 512 GB SSD"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-200">
            <button
              type="button"
              onClick={handleAnimatedClose}
              className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 transition-colors cursor-pointer shadow-2xs"
            >
              {productToEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModalModern;
