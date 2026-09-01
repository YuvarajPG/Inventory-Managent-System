import React from "react";
import ProductType from "../types/Product";

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
  onUpdateStock,
}) => {
  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 5;

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/80 hover:border-indigo-500/50 p-5 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden">
      {/* Background Subtle Gradient Highlight */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />

      <div>
        {/* Top Header: Brand Badge & Stock Status */}
        <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {product.brand}
          </span>

          {isOut ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              Out of Stock
            </span>
          ) : isLow ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Low Stock ({product.stock})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              In Stock ({product.stock})
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-white tracking-tight capitalize line-clamp-1 group-hover:text-indigo-300 transition-colors">
          {product.name}
        </h3>

        {/* Specs Pills */}
        <div className="flex items-center gap-2 mt-3.5">
          <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-400">
            RAM <span className="text-slate-200 font-bold ml-1">{product.details?.ram || "N/A"}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-400">
            ROM <span className="text-slate-200 font-bold ml-1">{product.details?.rom || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Footer: Price & Stock Incrementation & Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Price</span>
            <div className="text-2xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-300">
              ${product.price}
            </div>
          </div>

          {/* Quick Increment/Decrement Stock Pills */}
          <div className="flex items-center bg-slate-950/90 rounded-xl border border-slate-800 p-1 shadow-inner">
            <button
              onClick={() => onUpdateStock(product.id, -1)}
              disabled={product.stock <= 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer font-bold"
              title="Decrease Stock"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-100">
              {product.stock}
            </span>
            <button
              onClick={() => onUpdateStock(product.id, 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-bold"
              title="Increase Stock"
            >
              +
            </button>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/70 hover:bg-slate-700/80 hover:text-white border border-slate-700/80 transition-all cursor-pointer active:scale-95"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400"
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
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer active:scale-95"
          >
            <svg
              className="w-3.5 h-3.5 text-rose-400"
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
