"use client";

import { Loaf as LoafType } from "@/types/Types";

type LoafCardProps = {
  loaf: LoafType;
  halvesLeft: number;
  onOpen: (loaf: LoafType) => void;
};

export default function LoafCard({ loaf, halvesLeft, onOpen }: LoafCardProps) {
  const soldOut = halvesLeft <= 0;

  return (
    <div
      onClick={() => {
        if (!soldOut) onOpen(loaf);
      }}
      className={`bg-[#E9DDCA] p-4 rounded cursor-pointer transition ${
        soldOut ? "opacity-40 cursor-default" : "hover:shadow"
      }`}
    >
      <h3 className="font-semibold">{loaf.name}</h3>

      <div className="flex gap-2 mt-2 mb-2">
        {loaf.icons.map((icon, i) => (
          <div key={i} className="flex items-center">
            <img src={icon} className="w-10 h-10" alt="" />
            {i != loaf.icons.length - 1 && <span>+</span>}
          </div>
        ))}
      </div>

      {soldOut ? (
        <p className="text-red-600 font-medium">Sold Out</p>
      ) : (
        <p className="text-sm text-gray-600">{halvesLeft} halves left</p>
      )}
    </div>
  );
}
