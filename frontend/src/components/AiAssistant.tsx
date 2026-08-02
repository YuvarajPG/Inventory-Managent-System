import React, { useState } from "react";
import { ProductType } from "../types/Product";

interface AiAssistantProps {
  products: ProductType[];
  onAddProduct: (product: ProductType) => void;
  onUpdateStock: (id: string, delta: number) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  products,
  onAddProduct,
  onUpdateStock,
}) => {
  const [query, setQuery] = useState("");
  const [aiLog, setAiLog] = useState<{ role: "user" | "ai"; message: string }[]>([
    {
      role: "ai",
      message: "👋 Hello! I am your AI Inventory Assistant. Ask me to restock items, analyze sales trends, or auto-generate products!",
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    const userText = query.trim();
    setQuery("");
    setAiLog((prev) => [...prev, { role: "user", message: userText }]);
    setIsProcessing(true);

    setTimeout(() => {
      let responseText = "";
      const lower = userText.toLowerCase();

      if (lower.includes("restock") || lower.includes("low stock")) {
        const lowItems = products.filter((p) => p.stock <= 5);
        if (lowItems.length > 0) {
          lowItems.forEach((item) => onUpdateStock(item.id, 10));
          responseText = `⚡ AI Action Executed: Automatically restocked ${lowItems.length} low-stock items (+10 units each).`;
        } else {
          responseText = "✅ Stock levels are healthy! No items currently require emergency restocking.";
        }
      } else if (lower.includes("add") || lower.includes("create") || lower.includes("generate")) {
        const sampleProduct: ProductType = {
          id: crypto.randomUUID(),
          name: "AI Smart Watch Pro",
          brand: "TechAI",
          price: 299,
          stock: 15,
          details: { ram: "4 GB", rom: "64 GB" },
          timestamp: new Date().toISOString(),
        };
        onAddProduct(sampleProduct);
        responseText = `✨ AI Action Executed: Created dynamic sample product "${sampleProduct.name}" (${sampleProduct.brand}) with price $${sampleProduct.price}.`;
      } else if (lower.includes("summary") || lower.includes("analyze") || lower.includes("insight")) {
        const totalVal = products.reduce((sum, p) => sum + p.price * p.stock, 0);
        responseText = `📊 AI Insights: You have ${products.length} catalog items worth $${totalVal.toLocaleString()}. Highest priced item is ${
          [...products].sort((a, b) => b.price - a.price)[0]?.name || "N/A"
        }.`;
      } else {
        responseText = `🤖 AI Suggestion: Based on current inventory demand, consider running a promotional campaign for items with stock over 15 units.`;
      }

      setAiLog((prev) => [...prev, { role: "ai", message: responseText }]);
      setIsProcessing(false);
    }, 800);
  };

  const handleQuickAction = (actionType: "restock" | "generate" | "analyze") => {
    if (actionType === "restock") {
      setQuery("Restock low stock items");
    } else if (actionType === "generate") {
      setQuery("Generate a new AI smart product");
    } else if (actionType === "analyze") {
      setQuery("Analyze current inventory summary");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-purple-950/30 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <svg className="w-32 h-32 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 15h-2v-6h2zm0-8h-2V7h2z" />
        </svg>
      </div>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30 text-purple-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">AI Inventory Copilot</h2>
            <p className="text-xs text-purple-300/80">Automated restocking, smart analytics & catalog generation</p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full animate-pulse">
          AI Active
        </span>
      </div>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleQuickAction("restock")}
          className="px-3 py-1.5 bg-purple-900/40 hover:bg-purple-900/70 border border-purple-500/30 rounded-lg text-xs font-medium text-purple-200 transition-all cursor-pointer flex items-center gap-1.5"
        >
          ⚡ Auto-Restock Low Items
        </button>
        <button
          onClick={() => handleQuickAction("generate")}
          className="px-3 py-1.5 bg-indigo-900/40 hover:bg-indigo-900/70 border border-indigo-500/30 rounded-lg text-xs font-medium text-indigo-200 transition-all cursor-pointer flex items-center gap-1.5"
        >
          ✨ Generate Smart Product
        </button>
        <button
          onClick={() => handleQuickAction("analyze")}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
        >
          📊 Inventory Insights
        </button>
      </div>

      {/* Chat Messages Console */}
      <div className="space-y-3 max-h-48 overflow-y-auto mb-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {aiLog.map((log, idx) => (
          <div
            key={idx}
            className={`flex ${log.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-xl text-xs ${
                log.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-slate-800/90 text-purple-200 border border-purple-500/20 rounded-bl-none"
              }`}
            >
              {log.message}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="px-3.5 py-2 rounded-xl text-xs bg-slate-800/90 text-purple-300 border border-purple-500/20 animate-pulse">
              AI Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleAskAi} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI to restock, generate products, or give insights..."
          className="flex-1 px-4 py-2.5 text-xs bg-slate-950/90 border border-purple-500/30 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <button
          type="submit"
          disabled={isProcessing || !query.trim()}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30 border border-purple-400/30 transition-all cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};
