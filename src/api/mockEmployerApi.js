import { seedEmployer } from "../data/seedEmployer";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchEmployerSnapshot() {
  await delay(300);
  return structuredClone(seedEmployer);
}
