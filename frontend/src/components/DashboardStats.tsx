import React from "react";
import { ProductType } from "../types/Product";

interface DashboardStatsProps {
  products: ProductType[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((acc, item) => acc + item.price * item.stock, 0);
  const lowStockCount = products.filter((item) => item.stock > 0 && item.stock <= 5).length;
  const outOfStockCount = products.filter((item) => item.stock === 0).length;
  const totalBrands = new Set(products.map((item) => item.brand.toLowerCase())).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Products */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 shadow-lg hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Items</p>
            <h3 className="text-2xl font-bold text-white mt-1">{totalProducts}</h3>
            <p className="text-xs text-slate-400 mt-1">Across <span className="text-indigo-400 font-medium">{totalBrands}</span> brands</p>
          </div>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Inventory Value */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 shadow-lg hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Value</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">${totalValue.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 mt-1">Estimated stock worth</p>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Low Stock Warning */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 shadow-lg hover:border-amber-500/40 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Low Stock Alert</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">{lowStockCount}</h3>
            <p className="text-xs text-slate-400 mt-1">Items ≤ 5 stock remaining</p>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 shadow-lg hover:border-rose-500/40 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Out of Stock</p>
            <h3 className="text-2xl font-bold text-rose-400 mt-1">{outOfStockCount}</h3>
            <p className="text-xs text-slate-400 mt-1">Immediate reorder needed</p>
          </div>
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
