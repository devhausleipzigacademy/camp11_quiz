import { readFileSync, writeFileSync } from "node:fs";

export function getScores() {
  try {
    return JSON.parse(readFileSync("./score.json", "utf-8"));
  } catch (err) {
    return [];
  }
}

export function addScore(userName, score) {
  //[ { username: 'julian', points: 1 }, { username: 'maria', points: 2 } ]
  const scores = getScores();
  // update my score
  //let updatedScore = [ { username: 'julian', points: 1 }, { username: 'maria', points: 2 }, {username: "sven", points: 3} ]
  const updatedScore = [...scores, { userName, points: score }];
  // overwrite the score.json file with the updated score
  writeFileSync("score.json", JSON.stringify(updatedScore), "utf8");

  return updatedScore; // retun my updated score
}
