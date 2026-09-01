import React from "react";

interface DeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  productName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
  productName,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl shadow-rose-950/40 relative overflow-hidden text-center">
        {/* Accent Glow Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />

        {/* Warning Icon Circle */}
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <svg
            className="w-7 h-7"
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

        <h3 className="text-xl font-black text-white tracking-tight">
          Delete Product?
        </h3>
        <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed font-medium">
          Are you sure you want to permanently remove{" "}
          <strong className="text-slate-100">{productName || "this item"}</strong> from your inventory system? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-600/30 border border-rose-400/30 active:scale-95 transition-all cursor-pointer"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
