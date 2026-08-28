import React from "react";

interface DeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onConfirm,
  onCancel,
  productName,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Warning Icon Banner */}
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4 mx-auto">
          <svg
            className="w-6 h-6"
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
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-white">Delete Product</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Are you sure you want to delete{" "}
            {productName ? (
              <span className="text-slate-200 font-semibold">
                "{productName}"
              </span>
            ) : (
              "this product"
            )}
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 active:scale-[0.98] shadow-md shadow-rose-600/30 border border-rose-500/30 transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
