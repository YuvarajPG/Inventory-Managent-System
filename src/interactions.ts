import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import {
    addProducts,
    findProduct,
    removeProduct,
    updateDetails,
    updatePrice,
    updateStock,
} from "./IMS";
import { loadInventory, display } from "./extra";

const rl = readline.createInterface({ input, output });
const op = `====== IMS ======
 
1. Add Product
2. Search Product
3. Update Product
4. Delete Product
5. View Inventory
6. Exit
        `;
console.log(op);
const main = async () => {
    let flag: boolean = true;
    const answer = await rl.question("Choice: ");
    switch (answer) {
        case "1":
            await addF();
            console.clear();
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

const addF = async (): Promise<void> => {
    const name = await rl.question("Product name: ");
    const brand = await rl.question("Brand: ");
    const price = Number(await rl.question("Price: "));
    const stock = Number(await rl.question("Stock: "));
    const ram = Number(await rl.question("RAM: "));
    const rom = Number(await rl.question("ROM: "));

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
};

const findF = async (): Promise<void> => {
    const findingItemName = await rl.question("Product name: ");
    const finded = await findProduct(findingItemName);
    finded !== undefined ? console.table([finded]) : null;
};

const updateF = async (): Promise<void> => {
    const forOperation = await rl.question(
        `1. Update Price \n2. Update Stock \n3. Update details \nchoice: `,
    );
    const inv = await loadInventory();

    const data = inv.map((item) => ({
        name: item.name,
        price: item.price,
        stock: item.stock,
        details: {
            ram: item.details.ram,
            rom: item.details.rom,
        },
    }));

    console.table(data);

    const product = await rl.question("which product: ");

    switch (forOperation) {
        case "1":
            const newPrice = Number(await rl.question("new price: "));
            if (newPrice !== null) {
                await updatePrice(product, newPrice);
            }
            break;
        case "2":
            const newStock = Number(await rl.question("new stock: "));
            if (newStock !== null) {
                await updateStock(product, newStock);
            }
            break;
        case "3":
            await detailsF(product);
        default:
            break;
    }
};
const detailsF = async (product: string): Promise<void> => {
    console.log("1.ram \n2.rom\n3.both");
    const forWhich = Number(await rl.question("choice: "));
    switch (forWhich) {
        case 1:
            const newDetailsRam = Number(await rl.question("ram size: "));
            await updateDetails(product, { ram: newDetailsRam });
            await display();
            break;
        case 2:
            const newDetailsRom = Number(await rl.question("rom size: "));
            await updateDetails(product, { ram: newDetailsRom });
            await display();
            break;
        case 3:
            const newDetailsBothRom = Number(await rl.question("rom size: "));
            const newDetailsBothRam = Number(await rl.question("ram size: "));
            await updateDetails(product, {
                ram: newDetailsBothRam,
                rom: newDetailsBothRom,
            });
            await display();
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
