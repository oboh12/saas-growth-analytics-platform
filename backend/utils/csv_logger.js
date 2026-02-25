```js
import fs from "fs";

const CSV_FILE = "prediction_log.csv";

export function logCSV(game, date, predicted, actual, confidence, score) {
  const header =
    "date,game,predicted_numbers,actual_numbers,confidence,score\n";

  const line = `${date},${game},"${predicted.join(
    " "
  )}","${actual.join(" ")}",${confidence},${score}\n`;

  if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, header);
  }

  fs.appendFileSync(CSV_FILE, line);
  console.log("📁 Logged accuracy to prediction_log.csv");
}
```