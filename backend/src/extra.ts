import { readFile, writeFile } from "node:fs/promises";
import { invType } from "./data";

/* generators */
export const timeStampGen = (): string => {
  return new Date().toISOString();
};
export const idGen = (): string => {
  return crypto.randomUUID().slice(0, 8).replace(/-/g, "");
};

/* loading data */
export const loadInventory = async (): Promise<invType[]> => {
  const text = await readFile("./backend/src/inventory.json", "utf-8");
  return JSON.parse(text) as invType[];
};
/* writing data */
export const savingData = async (inventory: invType[]) => {
  await writeFile(
    "./backend/src/inventory.json",
    JSON.stringify(inventory, null, 2),
  );
};

/* removed datas */
export const removedData = async (inventory: invType[]): Promise<invType[]> => {
  const text = await readFile("./backend/src/removed.json", "utf-8");

  await writeFile(
    "./backend/src/removed.json",
    JSON.stringify(inventory, null, 2),
  );
  return JSON.parse(text) as invType[];
};

export const display = async () => {
  const inventory = await loadInventory();
  console.table(inventory, [
    "id",
    "brand",
    "name",
    "price",
    "stock",
    "details",
    "timestamp",
  ]);
};
export const find = async (product: string) => {
  const inventory = await loadInventory();
  const finded = inventory.find((item) =>
    item.name.toLowerCase().includes(product.toLowerCase()),
  );
  return
};
