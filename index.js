import chalk from "chalk";
import { getQuestions } from "./utils/question.js";
import rs from "readline-sync";
import { addScore, getScores } from "./utils/scores.js";

const test = "hello";

function rainbow(logString) {
  const rainbowColors = ["red", "yellow", "green", "blue", "magenta", "cyan"];
  const letters = logString.split("");

  let rainbowString = "";
  letters.forEach((letter) => {
    const char =
      chalk[rainbowColors[Math.floor(Math.random() * rainbowColors.length)]](
        letter
      );
    rainbowString += char;
  });
  console.log(rainbowString);
}
rainbow(test);

function playGame() {
  let score = 0; // answer is correct +2 answer is not correct -1

  console.log(chalk.blue.bold("Welcome to the Quiz!"));

  let userName = rs.question("Whats ur name? ");
  while (!userName.trim()) {
    console.log(chalk.red("Please enter a valid name!"));
    userName = rs.question("tell me ur name please");
  }
  console.log(chalk.blue.bold(`Welcome ${userName}! Want to play a game?`));

  const questions = getQuestions();
  for (const { question, answer } of questions) {
    const userAnswer = rs.question(question);
    //can go for tenary operator
    if (userAnswer.trim().toLowerCase() !== answer.trim().toLowerCase()) {
      //score <= 0 ? (score = 0) : (score -= 1);

      console.log(
        chalk.red(`${userAnswer} is wrong! The right answer would be:`)
      );
      console.log(chalk.green(answer));
    } else {
      score += 2;
      console.log(chalk.green(`${userAnswer} is correct!`));
    }
  }

  console.log(chalk.blue.bold(`Your score is ${score <= 0 ? 0 : score}`));
  const updatedScoreList = addScore(userName, score);
  console.log(updatedScoreList);

  function Score(userName, points) {
    this.userName = userName;
    this.points = points;
  }

  console.table(
    updatedScoreList.map((score) => new Score(score.userName, score.points))
  );
}

playGame();
