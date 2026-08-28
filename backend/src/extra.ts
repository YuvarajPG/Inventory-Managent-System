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
  const text = await readFile("./src/inventory.json", "utf-8");
  return JSON.parse(text) as invType[];
};
/* writing data */
export const savingData = async (inventory: invType[]) => {
  await writeFile(
    "./src/inventory.json",
    JSON.stringify(inventory, null, 2),
  );
};

/* removed datas */
export const removedData = async (inventory: invType[]): Promise<invType[]> => {
  const text = await readFile("./src/inventory.json", "utf-8");

  await writeFile(
    "./src/inventory.json",
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

// loadInventory().then((i)=>{
//   console.log(i);
// });
