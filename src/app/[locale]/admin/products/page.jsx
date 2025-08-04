"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import Navbar from "@/components/ui/dashboard/Navbar";

const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `منتج ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  category: "عطور",
}));

export default function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(dummyProducts);

  return (
    <div className="flex h-screen bg-[#f9fafb] dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold">المنتجات</h1>
            <button className="bg-[#11cad3] hover:bg-[#0fa0a8] text-white px-4 py-2 rounded-lg">
              إضافة منتج
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-[#11cad3] font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
