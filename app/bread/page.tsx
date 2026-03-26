"use client";

import { useEffect, useState } from "react";
import { loaves, Loaf } from "@/data/loaves";

type CartItem = {
  id: string;
  name: string;
  size: "half" | "full";
  price: number;
};

export default function BreadShop() {
  // basket details
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("breadUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleVerify = () => {
    console.log(emailInput)
    if (!emailInput.endsWith("@mcmcg.com")) {
      alert("This is only for my cutie coworkers <3 — please use your work email.");
      return;
    }
    const newUser = { name: nameInput, email: emailInput };
    localStorage.setItem("breadUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  // current cart
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // -----------------------------
  // modal for selecting size
  // -----------------------------
  const [selectedLoaf, setSelectedLoaf] = useState<Loaf | null>(null);
  const [size, setSize] = useState<"half" | "full">("half");

  const closeModal = () => {
    setSelectedLoaf(null);
    setSize("half");
  };

  const handleAdd = () => {
    if (!selectedLoaf) return;
    const price = size === "half" ? selectedLoaf.halfPrice : selectedLoaf.fullPrice;

    addToCart({
      id: selectedLoaf.id,
      name: selectedLoaf.name,
      size,
      price
    });

    closeModal();
  };

  // -----------------------------
  // calculate remaining halves
  // -----------------------------
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

  const isSoldOut = (loafId: string) => getRemainingHalves(loafId) <= 0;

  // -----------------------------
  // cart drawer
  // -----------------------------
  const [cartOpen, setCartOpen] = useState(false);

  // -----------------------------
  // coworker gate
  // -----------------------------
  if (!user) {
    return (
      <div className="py-[20%] max-w-sm my-0 mx-auto">
        {/* <h1 className="text-2xl font-bold mb-4">Sami’s Sourdough</h1> */}
        <p className="mb-4">Please enter your full name and work email to continue.</p>

        <input
          placeholder="Full Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          placeholder="Work Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={handleVerify}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    );
  }

  // -----------------------------
  // main UI
  // -----------------------------
  return (
    <div className="p-6 pb-40">
      <h1 className="text-3xl font-bold">Sami’s Sourdough</h1>
      <p className="text-gray-600 mt-1">What’s available this week?</p>

      {/* loaf grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {loaves.map((loaf) => {
          const halvesLeft = getRemainingHalves(loaf.id);
          const soldOut = halvesLeft <= 0;

          return (
            <div
              key={loaf.id}
              onClick={() => !soldOut && setSelectedLoaf(loaf)}
              className={`border p-4 rounded cursor-pointer transition ${
                soldOut ? "opacity-40 cursor-default" : "hover:shadow"
              }`}
            >
              <h3 className="font-semibold">{loaf.name}</h3>

              <div className="flex gap-2 mt-2 mb-2">
                {loaf.icons.map((icon, i) => (
                  <img key={i} src={icon} className="w-10 h-10" />
                ))}
              </div>

              {soldOut ? (
                <p className="text-red-600 font-medium">Sold Out</p>
              ) : (
                <p className="text-sm text-gray-600">{halvesLeft} halves left</p>
              )}
            </div>
          );
        })}
      </div>

      {/* modal */}
      {selectedLoaf && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded w-80"
          >
            <h2 className="text-xl font-bold">{selectedLoaf.name}</h2>
            <p className="text-gray-600 mt-1">{selectedLoaf.description}</p>

            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="half"
                  checked={size === "half"}
                  onChange={() => setSize("half")}
                  disabled={getRemainingHalves(selectedLoaf.id) < 1}
                />
                Half — ${selectedLoaf.halfPrice}
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="full"
                  checked={size === "full"}
                  onChange={() => setSize("full")}
                  disabled={getRemainingHalves(selectedLoaf.id) < 2}
                />
                Full — ${selectedLoaf.fullPrice}
              </label>
            </div>

            <button
              onClick={handleAdd}
              disabled={
                size === "half"
                  ? getRemainingHalves(selectedLoaf.id) < 1
                  : getRemainingHalves(selectedLoaf.id) < 2
              }
              className="mt-4 bg-black text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* cart drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t p-4 transition-transform ${
          cartOpen ? "translate-y-0" : "translate-y-[70%]"
        }`}
      >
        <div
          onClick={() => setCartOpen(!cartOpen)}
          className="cursor-pointer font-semibold"
        >
          Basket — ${total}
        </div>

        {cartOpen && (
          <div className="mt-4">
            {cart.length === 0 && <p>Your basket is empty.</p>}

            {cart.map((item, i) => (
              <div key={i} className="flex justify-between mb-2">
                <span>
                  {item.name} ({item.size}) — ${item.price}
                </span>
                <button
                  onClick={() => removeFromCart(i)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            <h3 className="font-bold mt-4">Total: ${total}</h3>

            <p className="mt-2">Venmo: <strong>@sami-oh</strong></p>
            <p>or bring cash to work!</p>
          </div>
        )}
      </div>
    </div>
  );
}
