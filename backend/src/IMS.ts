import { invType } from "./data";
import {
  idGen,
  loadInventory,
  timeStampGen,
  savingData,
  removedInventory,
  removedSaveData,
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

export const removeProduct = async (id: string): Promise<invType[]> => {
  const inventory = await loadInventory();
  const removedInv = await removedInventory();
  if (inventory.length !== 0) {
    const removed = inventory.find((item) => item.id.includes(id))!;
    const filtered = inventory.filter((item) => !item.id.includes(id));
    if(removedInv.length !== 0){
      removedInv.push(removed);
    }
    await removedSaveData([...removedInv,removed])
    await savingData(filtered);
    return filtered;
  }
  throw new Error("Product is not available");
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

export const searchProduct = async (search: string): Promise<invType[]> => {
  const inventory = await loadInventory();
  if (inventory.length !== 0) {
    const find = inventory.filter((item) =>
      item.name.toLowerCase().includes(search),
    );
    return find;
  } else {
    throw new Error("<h1>NOT DATA WAS FOUND</h1>");
  }
};

export const findProductByID = async (
  search: string,
): Promise<invType | undefined> => {
  const inventory = await loadInventory();
  if (inventory.length === 0) return;
  else {
    const find = inventory.find((item) =>
      item.id.toLowerCase().includes(search),
    );
    if (find === undefined) {
      throw new Error("Product not found");
    }
    return find;
  }
};
export const update = async (
  id: string,
  updates: Partial<invType>,
): Promise<invType | void> => {
  const inventory = await loadInventory();
  const finded = inventory.find((item) => item.id === id);
  if (!finded) return;
  if (updates.name !== undefined) {
    finded.name = updates.name;
  }
  if (updates.price !== undefined) {
    finded.price = updates.price;
  }

  if (updates.stock !== undefined) {
    finded.stock = updates.stock;
  }

  if (updates.brand !== undefined) {
    finded.brand = updates.brand;
  }

  if (updates.details?.ram !== undefined && updates.details?.ram !== finded.details.ram) {
    finded.details.ram = !updates.details.ram.includes("GB")? updates.details!.ram.replace(/\s/g, "") + " GB" : updates.details!.ram;
  }

  if (updates.details?.rom !== undefined && updates.details?.rom !== finded.details.rom) {
    finded.details.rom = !updates.details.rom.includes("GB")? updates.details!.rom.replace(/\s/g, "") + " GB" : updates.details!.rom;
  }
  await savingData(inventory);
  return finded;
};
