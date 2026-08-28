import React from "react";
import ProductType from "../types/Product";
import { editProductAPI } from "../../api/api";

interface ProductCardProps {
  product: ProductType;
  onEdit: (product: ProductType) => void;
  onDelete: (id: string) => void;
  onUpdateStock: (id: string, delta: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 5;

  return (
    <div className="group relative bg-slate-800/70 backdrop-blur-md border border-slate-700/70 hover:border-slate-600 rounded-2xl p-5 shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-indigo-500/10">
      {/* Top Header: Brand Badge & Stock Status */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-700/60 text-slate-300 border border-slate-600/40">
            {product.brand}
          </span>
          {isOut ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Out of Stock
            </span>
          ) : isLow ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Low Stock ({product.stock})
            </span>
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              In Stock ({product.stock})
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-slate-100 capitalize line-clamp-1 group-hover:text-indigo-300 transition-colors">
          {product.name}
        </h3>

        {/* Specs Pill List */}
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <span className="px-2 py-1 bg-slate-900/60 rounded-md border border-slate-700/50">
            RAM:{" "}
            <strong className="text-slate-200">{product.details.ram}</strong>
          </span>
          <span className="px-2 py-1 bg-slate-900/60 rounded-md border border-slate-700/50">
            ROM:{" "}
            <strong className="text-slate-200">{product.details.rom}</strong>
          </span>
        </div>
      </div>

      {/* Price & Quantity Controls */}
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400">Price</span>
            <div className="text-xl font-extrabold text-white">
              ${product.price}
            </div>
          </div>

          {/* Quick Stock Controls */}
          <div className="flex items-center bg-slate-900/80 rounded-xl border border-slate-700/80 p-1">
            <button
              onClick={() => editProductAPI(product)}
              disabled={product.stock <= 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              title="Decrease Stock"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-200">
              {product.stock}
            </span>
            <button
              onClick={() => editProductAPI(product)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 transition-all"
              title="Increase Stock"
            >
              +
            </button>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 transition-all"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
