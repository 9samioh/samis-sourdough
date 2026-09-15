"use client";

import { useEffect, useState } from "react";
import { loaves, Loaf } from "@/data/loaves";
import UserGate from "@/components/UserGate";
import LoafCard from "@/components/LoafCard";
import Modal from "@/components/Modal";
import { CartItem } from "@/types/Types";
import Cart from "@/components/Cart";


export default function BreadShop() {
  // user details
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const saved = localStorage.getItem("breadUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // current cart
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log(cart);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // modal for loaf selection
  const [selectedLoaf, setSelectedLoaf] = useState<Loaf | null>(null);

  const closeModal = () => {
    setSelectedLoaf(null);
  };

  const handleAdd = (size: "half" | "full") => {
    if (!selectedLoaf) return;
    const price =
      size === "half" ? selectedLoaf.halfPrice : selectedLoaf.fullPrice;

    addToCart({
      id: selectedLoaf.id,
      name: selectedLoaf.name,
      size,
      price,
    });

    closeModal();
  };

  // check if a loaf is sold out
  const getRemainingHalves = (loafId: string) => {
    const loaf = loaves.find((l) => l.id === loafId);
    if (!loaf) return 0;

    let halves = loaf.fullInventory * 2;

    cart.forEach((item) => {
      if (item.id === loafId) {
        halves -= item.size === "half" ? 1 : 2;
      }
    });

    return halves;
  };

  // user basket selection ui
  if (!user) {
    return <UserGate onVerified={setUser} />;
  }

  // sourdoughmarket
  return (
    <div className="p-6 pb-40">
      <h1 className="text-3xl font-bold">Sami’s Sourdough</h1>
      <p className="text-gray-600 mt-1">What’s available this week?</p>

      {/* loaves */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {loaves.map((loaf) => (
          <LoafCard
            key={loaf.id}
            loaf={loaf}
            halvesLeft={getRemainingHalves(loaf.id)}
            onOpen={setSelectedLoaf}
          />
        ))}
      </div>

      {/* loaf selection modal */}
      {selectedLoaf && (
        <Modal
          selectedLoaf={selectedLoaf}
          closeModal={closeModal}
          handleAdd={handleAdd}
          getRemainingHalves={getRemainingHalves}
        />
      )}

      {/* checkout cart */}
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}
