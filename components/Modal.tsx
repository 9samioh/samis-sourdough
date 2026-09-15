import { Loaf } from "@/types/Types";
import { useState } from "react";

type ModalProps = {
    selectedLoaf: Loaf;
  closeModal: () => void;
  handleAdd: (size: "half" | "full") => void;
  getRemainingHalves: (loafId: string) => number;
};

export default function Modal({ selectedLoaf, closeModal, handleAdd, getRemainingHalves }: ModalProps) {
    const [size, setSize] = useState<"half" | "full">("half");

  return <div
  className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
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
      onClick={() => handleAdd(size)}
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
</div>;
}