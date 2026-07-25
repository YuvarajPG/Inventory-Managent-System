export interface ProductType {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  details: {
    ram: string;
    rom: string;
  };
  timestamp: string;
}
