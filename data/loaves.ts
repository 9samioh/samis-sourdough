export type Loaf = {
  id: string;
  name: string;
  description: string;
  fullPrice: number;
  halfPrice: number;
  fullInventory: number; // number of full loaves available
  icons: string[]; // ingredient icons
};

export const loaves: Loaf[] = [
  {
    id: "classic-sourdough",
    name: "Classic Sourdough",
    description: "The original loaf, no inclusions - good for sandwiches",
    fullPrice: 12,
    halfPrice: 8,
    fullInventory: 5,
    icons: ["/icons/loaf.png"],
  },
  {
    id: "jalapeno-cheddar",
    name: "Jalapeño Cheddar",
    description: "A favorite inclusion loaf - good for grilled cheeses",
    fullPrice: 15,
    halfPrice: 8,
    fullInventory: 3,
    icons: ["/icons/loaf.png", "/icons/jalapeno.png", "/icons/cheddar.png"],
  },
  {
    id: "chocolate-cherry",
    name: "Chocolate Cherry",
    description:
      "Dark chocolate chunks + tart cherries - good toasted with some salted butter",
    fullPrice: 15,
    halfPrice: 8,
    fullInventory: 1,
    icons: ["/icons/loaf.png", "/icons/chocolate.png", "/icons/cherry.png"],
  },
];
