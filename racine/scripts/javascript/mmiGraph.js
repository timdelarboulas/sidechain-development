// Afficher le graph du MMI sur le site
// npm install chart.js

async function mmiChart() {
  await openFiles();

  const ctx = document.getElementById("mmiChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "MMI Price",
          data: [
            { x: mmiDateArray[9], y: mmiPriceArray[9] },
            { x: mmiDateArray[8], y: mmiPriceArray[8] },
            { x: mmiDateArray[7], y: mmiPriceArray[7] },
            { x: mmiDateArray[6], y: mmiPriceArray[6] },
            { x: mmiDateArray[5], y: mmiPriceArray[5] },
            { x: mmiDateArray[4], y: mmiPriceArray[4] },
            { x: mmiDateArray[3], y: mmiPriceArray[3] },
            { x: mmiDateArray[2], y: mmiPriceArray[2] },
            { x: mmiDateArray[1], y: mmiPriceArray[1] },
            { x: mmiDateArray[0], y: mmiPriceArray[0] },
          ],
          fill: true,
          borderColor: "#000000",
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: false,
          text: "MMI World EW (EOD)",
        },
      },
      scales: {
        y: {
          max: 250,
          min: 0,
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

mmiChart();
