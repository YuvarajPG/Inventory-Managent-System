import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import {
  addProducts,
  searchProduct,
  removeProduct,
  // updateDetails,
  update,
} from "./IMS";
import { loadInventory, display } from "./extra";
import { askDetails, askNumber, askString } from "../utils/vaildation";

export const rl = readline.createInterface({ input, output });
const op = `====== IMS ======\n\n1. Add Product\n2. Search Product\n3. Update Product\n4. Delete Product\n5. View Inventory\n6. Exit\n\t\t\t\t`;
console.log(op);
const main = async () => {
  let flag: boolean = true;
  const answer = await rl.question("Choice: ");
  switch (answer) {
    case "1":
      await addF();
      break;
    case "2":
      await findF();
      break;
    case "3":
      await updateF();
      break;
    case "4":
      await deleteF();
      break;
    case "5":
      await viewF();
      break;
    case "6":
      console.log("Exited");
      console.clear();
      break;
    default:
      main();
      console.log(op + `\ngive correct input (1 - 6)`);
      flag = !flag;
      break;
  }
  if (flag) {
    rl.close();
  }
};
main();

export const addF = async (): Promise<void> => {
  const inventory = await loadInventory();

  const name = await askString("Product name: ");
  const alreadyExists = inventory.some(
    (item) => item.name.toLowerCase() === name.toLowerCase(),
  );
  if (alreadyExists) {
    console.log("Product already exists.");
    return;
  } else {
    const brand = await askString("Brand: ");
    const price = Number(await askNumber("Price: ", 1));
    const stock = Number(await askNumber("Stock: ", 0));
    const ram = await askString("RAM (GB): ");
    const rom = await askString("ROM (GB): ");

    const added = await addProducts({
      name,
      brand,
      price,
      stock,
      details: {
        ram,
        rom,
      },
    });

    console.log("✅ Product added!");
    console.table([added]);
  }
};

const findF = async (): Promise<void> => {
  await display();
  const findingItemName = await askString("Product name or id: ");
  const finded = await searchProduct(findingItemName);
  finded !== undefined ? console.table([finded]) : null;
};

const updateF = async (): Promise<void> => {
  await display();
  const product = await askString("which product: ");
  await searchProduct(product);
  const q = `1. Update Price \n2. Update Stock \n3. Update details `;  const forOperation = await askNumber("choice: ", 1, 3);
  const inv = await loadInventory();

  const data = inv
    .filter((item) => item.name.toLowerCase().includes(product.toLowerCase()))
    .map((item) => ({
      name: item.name,
      price: item.price,
      stock: item.stock,
      details: {
        ram: item.details.ram,
        rom: item.details.rom,
      },
    }));
  console.table(data);

  // switch (forOperation) {
  //   case 1:
  //     const newPrice = await askNumber("new price: ");
  //     await update(product, newPrice, "price").then((p) => console.table([p]));
  //     break;
  //   case 2:
  //     const newStock = await askNumber("new stock: ");
  //     await update(product, newStock, "stock").then((p) => console.table([p]));
  //     break;
  //   case 3:
  //     await detailsF(product);
  //     break;
  //   default:
  //     await updateF();
  //     console.log("give correct input");
  // }
};

const detailsF = async (product: string): Promise<void> => {
  console.log("1.ram \n2.rom\n3.both");
  const forWhich = await askNumber("choice: ");
  switch (forWhich) {
    case 1:
<<<<<<< HEAD
      const newDetailsRam = await askDetails("RAM: ", [2, 4, 6, 8, 12, 16]);
      update(product, { details: { ram: newDetailsRam } }).then((p) =>
        console.table([p]),
      );
=======
      // const newDetailsRam = await askDetails("RAM: ", [2, 4, 6, 8, 12, 16]);
      // update(product, { ram: newDetailsRam }).then((p) =>
      //   console.table([p]),
      // );
>>>>>>> 0606e49 (fixed build)
      break;

    case 2:
      const newDetailsRom = await askDetails(
        "ROM: ",
        [32, 64, 128, 256, 512, 1024],
      );
<<<<<<< HEAD
      await update(product, { details: { rom: newDetailsRom } }).then((p) =>
        console.table([p]),
      );
      break;
    case 3:
      const newDetailsBothRom = await askDetails(
        "ROM: ",
        [32, 64, 128, 256, 512, 1024],
      );
      const newDetailsBothRam = await askDetails("RAM: ", [2, 4, 6, 8, 12, 16]);
      await update(product, {
        details: {
          ram: newDetailsBothRam,
          rom: newDetailsBothRom,
        },
      }).then((p) => console.table([p]));
      break;
=======
      // await update(product, { rom: newDetailsRom }).then((p) =>
      //   console.table([p]),
      // );
      break;
    case 3:
      // const newDetailsBothRom = await askDetails(
      //   "ROM: ",
      //   [32, 64, 128, 256, 512, 1024],
      // );
      // const newDetailsBothRam = await askDetails("RAM: ", [2, 4, 6, 8, 12, 16]);
      // await update(product, {
      //   ram: newDetailsBothRam,
      //   rom: newDetailsBothRom,
      // }).then((p) => console.table([p]));
>>>>>>> 0606e49 (fixed build)
    default:
      console.log("ran");
      break;
  }
};

const deleteF = async (): Promise<void> => {
  const inventory = await loadInventory();
  console.table(inventory.map((item) => `products : ${item.name} `));
  const deletingItem = await rl.question(
    "which product needed to be deleted: ",
  );
  console.clear();
  console.log("removed products");
  const out = await removeProduct(deletingItem).then((p) => p);
  if (out?.at(0) !== undefined) {
    console.log("successfully removed ❌");
  } else {
    console.error("the product doesnt exist");
  }
};

const viewF = async (): Promise<void> => {
  await display();
};
