export type invType = {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  details: {
    ram: number;
    rom: number;
    warranty?: string;
  };
  timestamp: string;
};
