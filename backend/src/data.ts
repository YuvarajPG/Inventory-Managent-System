export type invType = {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  details: {
    ram: string;
    rom: string;
    warranty?: string;
  };
  timestamp: string;
};