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
    description: "My signature loaf — tangy, chewy, perfect crust.",
    fullPrice: 12,
    halfPrice: 8,
    fullInventory: 5,
    icons: ["/icons/flour.png"]
  },
  {
    id: "jalapeno-cheddar",
    name: "Jalapeño Cheddar",
    description: "Spicy, cheesy, melty goodness.",
    fullPrice: 15,
    halfPrice: 8,
    fullInventory: 3,
    icons: ["/icons/jalapeno.png", "/icons/cheddar.png"]
  },
  {
    id: "chocolate-cherry",
    name: "Chocolate Cherry",
    description: "Dark chocolate chunks + tart cherries.",
    fullPrice: 15,
    halfPrice: 8,
    fullInventory: 1,
    icons: ["/icons/chocolate.png", "/icons/cherry.png"]
  }
];
