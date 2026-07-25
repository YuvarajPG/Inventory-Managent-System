import { invType } from "./data";
import {
  idGen,
  loadInventory,
  removedData,
  timeStampGen,
  savingData,
  display,
} from "./extra";

/* functions */
export const addProducts = async (
  product: Omit<invType, "id" | "timestamp">,
): Promise<invType | undefined> => {
  try {
    const inventory = await loadInventory();
    const newProduct: invType = {
      id: idGen(),
      ...product,
      timestamp: timeStampGen(),
    };

    inventory.push(newProduct);
    await savingData(inventory);

    return newProduct;
  } catch (err) {
    console.error(err);
  }
};

export const removeProduct = async (
  name: string,
): Promise<invType[] | undefined> => {
  const inventory = await loadInventory();

  if (inventory.length !== 0) {
    const removed = inventory.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase()),
    );
    const filtered = inventory.filter(
      (item) => !item.name.toLowerCase().includes(name.toLowerCase()),
    );
    await removedData(removed);
    await savingData(filtered);
    return removed;
  }
};

export const sortByAlphabet = async (type: string): Promise<invType[]> => {
  const inventory = await loadInventory();
  if (inventory.length !== 0) {
    return type.toLowerCase() === "a"
      ? inventory.sort((a, b) => a.name.localeCompare(b.name))
      : inventory.sort((a, b) => b.name.localeCompare(a.name));
  }
  throw new Error("the data's doesnt exist");
};

export const findProduct = async (
  search: string,
): Promise<invType | undefined> => {
  const inventory = await loadInventory();
  if (inventory.length === 0) return;
  else {
    const find = inventory.find(
      (item) =>
        item.id.includes(search) || item.name.toLowerCase().includes(search),
    );
    if (find === undefined) {
      throw new Error("Product not found");
    }
    return find;
  }
};

export const update = async (
  product: string,
  value: number | string,
  field: "price" | "stock" | "brand",
): Promise<invType | void> => {
  const finded = await findProduct(product);
  const inventory = await loadInventory();
  if (finded !== undefined) {
    switch (field) {
      case "price":
      case "stock":
        finded[field] = value as number;
        await savingData(inventory);
        return finded;

      case "brand":
        finded[field] = value as string;
        await savingData(inventory);
        return finded;
    }
  }
};
console.log(update("redmi note 12", 88, "price"));

export const updateDetails = async (
  product: string,
  newDetails: Partial<invType["details"]>,
): Promise<invType | void> => {
  const finded = await findProduct(product);
  const inventory = await loadInventory();

  if (finded !== undefined) {
    if (finded.details.ram !== undefined) {
      finded.details.ram = newDetails.ram!;
      await savingData(inventory);
      return finded;
    }

    if (finded.details.rom !== undefined) {
      finded.details.rom = newDetails.rom!;
      await savingData(inventory);
      return finded;
    }
  }
};
