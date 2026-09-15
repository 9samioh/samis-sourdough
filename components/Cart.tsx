import { CartItem } from "@/types/Types";
import { useState } from "react";

type CartProps = {
    cart: CartItem[];
    removeFromCart: (index: number) => void;
}

export default function Cart({  cart, removeFromCart }: CartProps) {
    const [cartOpen, setCartOpen] = useState(false);
    const total = cart.reduce((sum, item) => sum + item.price, 0);


  return <div
  className={`fixed bottom-0 left-0 right-0 bg-white border-t p-4 transition-transform ${
    cartOpen ? "translate-y-0" : "translate-y-[5%]"
  }`}
>
  <div
    onClick={() => setCartOpen(!cartOpen)}
    className="cursor-pointer font-semibold flex justify-end items-center gap-2"
  >
    <img src="/basket.png" alt="basket" className="w-15 h-15" />
    Total — ${total}
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

      <p className="mt-2">
        Venmo: <strong>@sami-oh</strong>
      </p>
      <p>or bring cash to work!</p>
    </div>
  )}
</div>;
}