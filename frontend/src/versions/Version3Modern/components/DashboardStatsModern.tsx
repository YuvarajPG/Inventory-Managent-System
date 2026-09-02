import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProductType from "../../../types/Product";

interface DashboardStatsModernProps {
  products: ProductType[];
}

export const DashboardStatsModern: React.FC<DashboardStatsModernProps> = ({ products }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Value refs for GSAP number tweening
  const productsValRef = useRef<HTMLSpanElement>(null);
  const stockValRef = useRef<HTMLSpanElement>(null);
  const lowValRef = useRef<HTMLSpanElement>(null);
  const outValRef = useRef<HTMLSpanElement>(null);
  const valueValRef = useRef<HTMLSpanElement>(null);

  // Computed values
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
  const lowStock = products.filter((item) => item.stock > 0 && item.stock <= 5).length;
  const outOfStock = products.filter((item) => item.stock === 0).length;
  const totalValue = products.reduce((acc, item) => acc + item.price * item.stock, 0);

  // Initial Stagger Entrance Animation
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".stat-card-modern", {
        opacity: 0,
        y: 8,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: containerRef }
  );

  // Animate numeric counters smoothly when data changes
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (productsValRef.current) productsValRef.current.innerText = totalProducts.toString();
      if (stockValRef.current) stockValRef.current.innerText = totalStock.toLocaleString();
      if (lowValRef.current) lowValRef.current.innerText = lowStock.toString();
      if (outValRef.current) outValRef.current.innerText = outOfStock.toString();
      if (valueValRef.current) {
        valueValRef.current.innerText = `$${totalValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }
      return;
    }

    const ctx = gsap.context(() => {
      const obj = {
        products: 0,
        stock: 0,
        low: 0,
        out: 0,
        val: 0,
      };

      gsap.to(obj, {
        products: totalProducts,
        stock: totalStock,
        low: lowStock,
        out: outOfStock,
        val: totalValue,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          if (productsValRef.current) {
            productsValRef.current.innerText = Math.round(obj.products).toString();
          }
          if (stockValRef.current) {
            stockValRef.current.innerText = Math.round(obj.stock).toLocaleString();
          }
          if (lowValRef.current) {
            lowValRef.current.innerText = Math.round(obj.low).toString();
          }
          if (outValRef.current) {
            outValRef.current.innerText = Math.round(obj.out).toString();
          }
          if (valueValRef.current) {
            valueValRef.current.innerText = `$${obj.val.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [totalProducts, totalStock, lowStock, outOfStock, totalValue]);

  return (
    <div ref={containerRef} className="bg-white border border-slate-200 rounded-md p-3 mb-3.5 shadow-2xs">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {/* Total Products */}
        <div className="stat-card-modern bg-slate-50 border border-slate-200/80 rounded px-3 py-2.5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Total Products
          </div>
          <div className="text-lg font-semibold text-slate-900 font-mono-nums mt-0.5">
            <span ref={productsValRef}>{totalProducts}</span>
          </div>
        </div>

        {/* Total Stock Units */}
        <div className="stat-card-modern bg-slate-50 border border-slate-200/80 rounded px-3 py-2.5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Total Stock
          </div>
          <div className="text-lg font-semibold text-slate-900 font-mono-nums mt-0.5">
            <span ref={stockValRef}>{totalStock.toLocaleString()}</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="stat-card-modern bg-slate-50 border border-slate-200/80 rounded px-3 py-2.5">
          <div className="text-[11px] font-medium text-amber-700 uppercase tracking-wider">
            Low Stock (≤5)
          </div>
          <div className="text-lg font-semibold text-amber-700 font-mono-nums mt-0.5 flex items-center gap-1.5">
            <span ref={lowValRef}>{lowStock}</span>
            {lowStock > 0 && (
              <span className="text-[10px] font-medium text-amber-700 bg-amber-100/70 px-1.5 py-0.2 rounded border border-amber-200">
                Warning
              </span>
            )}
          </div>
        </div>

        {/* Out of Stock */}
        <div className="stat-card-modern bg-slate-50 border border-slate-200/80 rounded px-3 py-2.5">
          <div className="text-[11px] font-medium text-red-700 uppercase tracking-wider">
            Out of Stock
          </div>
          <div className="text-lg font-semibold text-red-700 font-mono-nums mt-0.5 flex items-center gap-1.5">
            <span ref={outValRef}>{outOfStock}</span>
            {outOfStock > 0 && (
              <span className="text-[10px] font-medium text-red-700 bg-red-100/70 px-1.5 py-0.2 rounded border border-red-200">
                Critical
              </span>
            )}
          </div>
        </div>

        {/* Inventory Value */}
        <div className="stat-card-modern bg-slate-50 border border-slate-200/80 rounded px-3 py-2.5 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Inventory Value
          </div>
          <div className="text-lg font-semibold text-slate-900 font-mono-nums mt-0.5">
            <span ref={valueValRef}>
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsModern;
