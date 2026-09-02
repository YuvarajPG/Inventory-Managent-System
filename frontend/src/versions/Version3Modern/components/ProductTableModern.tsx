import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProductType from "../../../types/Product";

interface ProductTableModernProps {
  products: ProductType[];
  onEdit: (product: ProductType) => void;
  onDeleteClick: (product: ProductType) => void;
  onUpdateStock: (id: string, delta: number) => void;
}

export const ProductTableModern: React.FC<ProductTableModernProps> = ({
  products,
  onEdit,
  onDeleteClick,
  onUpdateStock,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  // Stagger row entrance smoothly
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".modern-table-row", {
        opacity: 0,
        y: 6,
        duration: 0.25,
        stagger: 0.025,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: tableRef, dependencies: [products] }
  );

  return (
    <div ref={tableRef} className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-3.5 py-2.5 font-medium">Product</th>
              <th scope="col" className="px-3.5 py-2.5 font-medium">Brand</th>
              <th scope="col" className="px-3.5 py-2.5 font-medium text-right">Price</th>
              <th scope="col" className="px-3.5 py-2.5 font-medium">RAM / ROM</th>
              <th scope="col" className="px-3.5 py-2.5 font-medium">Stock Level</th>
              <th scope="col" className="px-3.5 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const isOut = product.stock === 0;
              const isLow = product.stock > 0 && product.stock <= 5;

              return (
                <tr
                  key={product.id}
                  className="modern-table-row hover:bg-slate-50/80 transition-colors"
                >
                  {/* Product Name */}
                  <td className="px-3.5 py-2.5 font-semibold text-slate-900 max-w-[240px] truncate">
                    {product.name}
                  </td>

                  {/* Brand */}
                  <td className="px-3.5 py-2.5 text-slate-600">
                    {product.brand}
                  </td>

                  {/* Price */}
                  <td className="px-3.5 py-2.5 font-mono-nums font-medium text-slate-900 text-right">
                    ${product.price.toFixed(2)}
                  </td>

                  {/* Specs */}
                  <td className="px-3.5 py-2.5 text-slate-500 font-mono-nums">
                    {product.details?.ram || "—"} / {product.details?.rom || "—"}
                  </td>

                  {/* Stock Status & Quick Adjust */}
                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-3">
                      {/* Restrained status indicator */}
                      <span className="inline-flex items-center gap-1.5 font-mono-nums">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isOut
                              ? "bg-red-500"
                              : isLow
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            isOut
                              ? "text-red-700"
                              : isLow
                              ? "text-amber-700"
                              : "text-slate-800"
                          }`}
                        >
                          {product.stock} {isOut ? "(Out)" : isLow ? "(Low)" : "units"}
                        </span>
                      </span>

                      {/* Compact Stock +/- Stepper */}
                      <div className="inline-flex items-center rounded border border-slate-300 bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateStock(product.id, -1)}
                          disabled={product.stock <= 0}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer text-xs"
                          title="Decrease stock by 1"
                          aria-label={`Decrease stock for ${product.name}`}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateStock(product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-xs border-l border-slate-200"
                          title="Increase stock by 1"
                          aria-label={`Increase stock for ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Row Actions */}
                  <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(product)}
                        className="px-2 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTableModern;
