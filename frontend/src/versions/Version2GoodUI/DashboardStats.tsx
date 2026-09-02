import React from "react";
import ProductType from "../../types/Product";

interface DashboardStatsProps {
  products: ProductType[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ products }) => {
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
  const lowStock = products.filter((item) => item.stock > 0 && item.stock <= 5).length;
  const outOfStock = products.filter((item) => item.stock === 0).length;
  const totalValue = products.reduce((acc, item) => acc + item.price * item.stock, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-md p-3 mb-4 shadow-xs">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {/* Total Products */}
        <div className="bg-slate-50 border border-slate-100 rounded px-3 py-2">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Total Products
          </div>
          <div className="text-lg font-semibold text-slate-900 font-mono-nums mt-0.5">
            {totalProducts}
          </div>
        </div>

        {/* Total Stock Units */}
        <div className="bg-slate-50 border border-slate-100 rounded px-3 py-2">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Total Stock
          </div>
          <div className="text-lg font-semibold text-slate-900 font-mono-nums mt-0.5">
            {totalStock.toLocaleString()}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-slate-50 border border-slate-100 rounded px-3 py-2">
          <div className="text-[11px] font-medium text-amber-700 uppercase tracking-wider">
            Low Stock (≤5)
          </div>
          <div className="text-lg font-semibold text-amber-700 font-mono-nums mt-0.5 flex items-center gap-1.5">
            <span>{lowStock}</span>
            {lowStock > 0 && (
              <span className="text-[10px] font-medium text-amber-700 bg-amber-100/60 px-1.5 py-0.2 rounded border border-amber-200">
                Warning
              </span>
            )}
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-slate-50 border border-slate-100 rounded px-3 py-2">
          <div className="text-[11px] font-medium text-red-700 uppercase tracking-wider">
            Out of Stock
          </div>
          <div className="text-lg font-semibold text-red-700 font-mono-nums mt-0.5 flex items-center gap-1.5">
            <span>{outOfStock}</span>
            {outOfStock > 0 && (
              <span className="text-[10px] font-medium text-red-700 bg-red-100/60 px-1.5 py-0.2 rounded border border-red-200">
                Action Required
              </span>
            )}
          </div>
        </div>

        {/* Inventory Value */}
        <div className="bg-slate-50 border border-slate-100 rounded px-3 py-2 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Inventory Value
          </div>
          <div className="text-lg font-semibold text-slate-900 font-mono-nums mt-0.5">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
