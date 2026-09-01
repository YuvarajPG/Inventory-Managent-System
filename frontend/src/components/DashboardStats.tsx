import React from "react";
import ProductType from "../types/Product";

interface DashboardStatsProps {
  products: ProductType[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );
  const lowStockCount = products.filter(
    (item) => item.stock > 0 && item.stock <= 5
  ).length;
  const outOfStockCount = products.filter((item) => item.stock === 0).length;
  const totalBrands = new Set(products.map((item) => item.brand.toLowerCase()))
    .size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* Metric 1: Total Catalog */}
      <div className="relative group overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl hover:border-indigo-500/50 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-all" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Total Catalog
            </p>
            <h3 className="text-3xl font-black text-white mt-1.5 tracking-tight">
              {totalProducts}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Across <span className="text-indigo-400 font-bold">{totalBrands}</span> brands
            </p>
          </div>
          <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 shadow-inner group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Metric 2: Total Stock Value */}
      <div className="relative group overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl hover:border-emerald-500/50 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Inventory Valuation
            </p>
            <h3 className="text-3xl font-black text-emerald-400 mt-1.5 tracking-tight">
              ${totalValue.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Combined inventory asset value</p>
          </div>
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-inner group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Metric 3: Low Stock Items */}
      <div className="relative group overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl hover:border-amber-500/50 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Low Stock Warning
            </p>
            <h3 className="text-3xl font-black text-amber-400 mt-1.5 tracking-tight">
              {lowStockCount}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Items with stock ≤ 5</p>
          </div>
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Metric 4: Out of Stock */}
      <div className="relative group overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl hover:border-rose-500/50 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/25 transition-all" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Out of Stock
            </p>
            <h3 className="text-3xl font-black text-rose-400 mt-1.5 tracking-tight">
              {outOfStockCount}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Restock required immediately</p>
          </div>
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 shadow-inner group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
