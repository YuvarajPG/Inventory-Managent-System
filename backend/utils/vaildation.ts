import { rl } from "../src/interactions";

export const askString = async (question: string): Promise<string> => {
  while (true) {
    const input = (await rl.question(question)).trim();

    if (input.length === 0) {
      console.log("❌ Cannot be empty.");
      continue;
    }

    return input;
  }
};

export const askNumber = async (
  question: string,
  min = 1,
  max = Number.POSITIVE_INFINITY,
): Promise<number> => {
  while (true) {
    const value = Number(await rl.question(question));

    if (Number.isNaN(value)) {
      console.log("❌ Enter a valid number.");
      continue;
    }

    if (value < min || value > max) {
      console.log(`❌ Enter a number between ${min} and ${max}.`);
      continue;
    }

    return value;
  }
};

export const askDetails = async (
  question: string,
  allowed: number[],
): Promise<string> => {
  while (true) {
    const value = await rl.question(question);

    if (Number.isNaN(value)) {
      console.log("❌ Enter a valid number.");
      continue;
    }

    if (!allowed.includes(Number(value))) {
      console.log(`❌ Allowed values: ${allowed.join(", ")}`);
      continue;
    }

    return `${value} GB`;
  }
};
