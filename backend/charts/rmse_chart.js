```js
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs";

const width = 900;
const height = 500;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

export async function generateRMSEChart(rmseArray) {
  const labels = rmseArray.map((_, i) => `Run ${i + 1}`);

  const image = await chartJSNodeCanvas.renderToBuffer({
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "RMSE Trend",
          data: rmseArray,
          fill: false,
          borderWidth: 2,
        },
      ],
    },
  });

  fs.writeFileSync("rmse_trend.png", image);
  console.log("📊 RMSE chart saved as rmse_trend.png");
}
```