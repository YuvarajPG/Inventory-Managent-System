import React from "react";

export type StockFilterOption = "all" | "inStock" | "lowStock" | "outOfStock";
export type SortOption = "name" | "price-asc" | "price-desc" | "stock";
export type ViewMode = "table" | "grid";

interface ControlsBarProps {
  brands: string[];
  selectedBrand: string;
  onBrandChange: (brand: string) => void;

  stockFilter: StockFilterOption;
  onStockFilterChange: (filter: StockFilterOption) => void;

  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;

  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;

  filteredCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  brands,
  selectedBrand,
  onBrandChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
  onResetFilters,
}) => {
  const isFiltered = selectedBrand !== "All" || stockFilter !== "all";

  return (
    <div className="bg-white border border-slate-200 rounded p-2.5 mb-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
      {/* Filters Group */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {/* Brand Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="brand-filter" className="text-xs font-medium text-slate-500">
            Brand:
          </label>
          <select
            id="brand-filter"
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="bg-white border border-slate-300 rounded text-xs text-slate-800 px-2 py-1 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Status Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="stock-filter" className="text-xs font-medium text-slate-500">
            Status:
          </label>
          <select
            id="stock-filter"
            value={stockFilter}
            onChange={(e) => onStockFilterChange(e.target.value as StockFilterOption)}
            className="bg-white border border-slate-300 rounded text-xs text-slate-800 px-2 py-1 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 cursor-pointer"
          >
            <option value="all">All Levels</option>
            <option value="inStock">Normal Stock (&gt;5)</option>
            <option value="lowStock">Low Stock (1–5)</option>
            <option value="outOfStock">Out of Stock (0)</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-500">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortOption)}
            className="bg-white border border-slate-300 rounded text-xs text-slate-800 px-2 py-1 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 cursor-pointer"
          >
            <option value="name">Product Name (A–Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock">Stock Level</option>
          </select>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-xs text-slate-600 hover:text-slate-900 underline ml-1 cursor-pointer font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Item Counter & View Switcher */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <span className="text-xs text-slate-500 font-mono-nums">
          Showing <strong className="text-slate-700 font-semibold">{filteredCount}</strong> of {totalCount}
        </span>

        {/* Segmented View Switcher */}
        <div className="inline-flex rounded border border-slate-300 bg-slate-100 p-0.5" role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`px-2 py-0.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
              viewMode === "table"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Table
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`px-2 py-0.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Grid
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;
