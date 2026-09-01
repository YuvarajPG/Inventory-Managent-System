import React from "react";

interface NavbarProps {
  onOpenAddModal: () => void;
  searchTerm: string;
  onSearch: (val: string) => void;
  productCount: number;
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  searchTerm,
  onSearch,
  productCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5 shrink-0 group cursor-pointer">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight">
                  Inventory
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  v2 PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {productCount} items registered
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-lg mx-4">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search items by product name, brand, spec..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-inner transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 active:scale-[0.97] shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
