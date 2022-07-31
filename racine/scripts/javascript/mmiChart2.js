// MMI Chart 2, for the page about the index
async function mmiChart2() {
  await openFiles();

  maxValue = Math.round(Math.max(...mmiPriceArray)); // get the max value from the array of the MMI's Price
  mmiScalesYMax = Math.round(maxValue / 10) * 10 + 20; // convert maxValue to the nearest multiple of 10 and add a number for more space
  // this permit to have a dynamique max value for the Y axe

  const ctx2 = document.getElementById("mmiChart2").getContext("2d");
  const config2 = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cours",
          data: [
            { x: mmiDateArray[28], y: mmiPriceArray[28] },
            { x: mmiDateArray[27], y: mmiPriceArray[27] },
            { x: mmiDateArray[26], y: mmiPriceArray[26] },
            { x: mmiDateArray[25], y: mmiPriceArray[25] },
            { x: mmiDateArray[24], y: mmiPriceArray[24] },
            { x: mmiDateArray[23], y: mmiPriceArray[23] },
            { x: mmiDateArray[22], y: mmiPriceArray[22] },
            { x: mmiDateArray[21], y: mmiPriceArray[21] },
            { x: mmiDateArray[20], y: mmiPriceArray[20] },
            { x: mmiDateArray[19], y: mmiPriceArray[19] },
            { x: mmiDateArray[18], y: mmiPriceArray[18] },
            { x: mmiDateArray[17], y: mmiPriceArray[17] },
            { x: mmiDateArray[16], y: mmiPriceArray[16] },
            { x: mmiDateArray[15], y: mmiPriceArray[15] },
            { x: mmiDateArray[14], y: mmiPriceArray[14] },
            { x: mmiDateArray[13], y: mmiPriceArray[13] },
            { x: mmiDateArray[12], y: mmiPriceArray[12] },
            { x: mmiDateArray[11], y: mmiPriceArray[11] },
            { x: mmiDateArray[10], y: mmiPriceArray[10] },
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
          max: 50,
          min: 0,
          grid: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 8,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
            beginAtZero: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
      },
    },
  };

  const myChart2 = new Chart(ctx2, config2);
}

mmiChart2();
