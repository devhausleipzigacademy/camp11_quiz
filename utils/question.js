import { readFileSync } from "node:fs";

export function getQuestions() {
  return JSON.parse(readFileSync("./questions.json", "utf-8"));
}
