export type Loaf = {
  id: string;
  name: string;
  description: string;
  fullPrice: number;
  halfPrice: number;
  fullInventory: number;
  icons: string[];
};

export type CartItem = {
  id: string;
  name: string;
  size: "half" | "full";
  price: number;
};