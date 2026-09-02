import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProductType from "../../../types/Product";

interface ProductGridModernProps {
  products: ProductType[];
  onEdit: (product: ProductType) => void;
  onDeleteClick: (product: ProductType) => void;
  onUpdateStock: (id: string, delta: number) => void;
}

export const ProductGridModern: React.FC<ProductGridModernProps> = ({
  products,
  onEdit,
  onDeleteClick,
  onUpdateStock,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".modern-grid-card", {
        opacity: 0,
        y: 8,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: gridRef, dependencies: [products] }
  );

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {products.map((product) => {
        const isOut = product.stock === 0;
        const isLow = product.stock > 0 && product.stock <= 5;

        return (
          <div
            key={product.id}
            className="modern-grid-card bg-white border border-slate-200 rounded-md p-3.5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-2xs"
          >
            <div>
              {/* Header: Brand & Stock Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  {product.brand}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-mono-nums">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOut ? "bg-red-500" : isLow ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isOut ? "text-red-700" : isLow ? "text-amber-700" : "text-slate-600"
                    }`}
                  >
                    {product.stock} {isOut ? "out" : isLow ? "low" : "in stock"}
                  </span>
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-sm font-semibold text-slate-900 truncate">
                {product.name}
              </h3>

              {/* Specs & Price */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
                <div className="text-xs text-slate-500 font-mono-nums">
                  {product.details?.ram || "—"} / {product.details?.rom || "—"}
                </div>
                <div className="text-sm font-semibold font-mono-nums text-slate-900">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Footer: Stepper and Actions */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="inline-flex items-center rounded border border-slate-300 bg-white">
                <button
                  type="button"
                  onClick={() => onUpdateStock(product.id, -1)}
                  disabled={product.stock <= 0}
                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer text-xs"
                  title="Decrease stock"
                  aria-label={`Decrease stock for ${product.name}`}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStock(product.id, 1)}
                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-xs border-l border-slate-200"
                  title="Increase stock"
                  aria-label={`Increase stock for ${product.name}`}
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  className="px-2 py-0.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteClick(product)}
                  className="px-2 py-0.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGridModern;
