// Afficher le graph du MMI sur le site
// npm install chart.js

const button1week = document.getElementById("mmiGraph1week");
const button2weeks = document.getElementById("mmiGraph2weeks");
const button1month = document.getElementById("mmiGraph1month");
let mmiDataDynArray = []; // dynamique array using with graph's buttons option
let maxValue = 0; // using to get the max value of an array/list
let minValue = 0; // using to get the min value of an array/list
let mmiScalesYMax = 0;
let mmiScalesYMin = 0;

async function mmiChart() {
  await openFiles();

  maxValue = Math.round(Math.max(...mmiPriceArray)); // get the max value from the array of the MMI's Price
  mmiScalesYMax = Math.round(maxValue / 10) * 10 + 10; // convert maxValue to the nearest multiple of 10 and add a number for more space
  // this permit to have a dynamique max value for the Y axe

  const ctx = document.getElementById("mmiChart").getContext("2d");
  const config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cours",
          data: [
            { x: mmiDateArray[62], y: mmiPriceArray[62] },
            { x: mmiDateArray[61], y: mmiPriceArray[61] },
            { x: mmiDateArray[60], y: mmiPriceArray[60] },
            { x: mmiDateArray[59], y: mmiPriceArray[59] },
            { x: mmiDateArray[58], y: mmiPriceArray[58] },
            { x: mmiDateArray[57], y: mmiPriceArray[57] },
            { x: mmiDateArray[56], y: mmiPriceArray[56] },
            { x: mmiDateArray[55], y: mmiPriceArray[55] },
            { x: mmiDateArray[54], y: mmiPriceArray[54] },
            { x: mmiDateArray[53], y: mmiPriceArray[53] },
            { x: mmiDateArray[52], y: mmiPriceArray[52] },
            { x: mmiDateArray[51], y: mmiPriceArray[51] },
            { x: mmiDateArray[50], y: mmiPriceArray[50] },
            { x: mmiDateArray[49], y: mmiPriceArray[49] },
            { x: mmiDateArray[48], y: mmiPriceArray[48] },
            { x: mmiDateArray[47], y: mmiPriceArray[47] },
            { x: mmiDateArray[46], y: mmiPriceArray[46] },
            { x: mmiDateArray[45], y: mmiPriceArray[45] },
            { x: mmiDateArray[44], y: mmiPriceArray[44] },
            { x: mmiDateArray[43], y: mmiPriceArray[43] },
            { x: mmiDateArray[42], y: mmiPriceArray[42] },
            { x: mmiDateArray[41], y: mmiPriceArray[41] },
            { x: mmiDateArray[40], y: mmiPriceArray[40] },
            { x: mmiDateArray[39], y: mmiPriceArray[39] },
            { x: mmiDateArray[38], y: mmiPriceArray[38] },
            { x: mmiDateArray[37], y: mmiPriceArray[37] },
            { x: mmiDateArray[36], y: mmiPriceArray[36] },
            { x: mmiDateArray[35], y: mmiPriceArray[35] },
            { x: mmiDateArray[34], y: mmiPriceArray[34] },
            { x: mmiDateArray[33], y: mmiPriceArray[33] },
            { x: mmiDateArray[32], y: mmiPriceArray[32] },
            { x: mmiDateArray[31], y: mmiPriceArray[31] },
            { x: mmiDateArray[30], y: mmiPriceArray[30] },
            { x: mmiDateArray[29], y: mmiPriceArray[29] },
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
          max: mmiScalesYMax,
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
            maxTicksLimit: 6,
            beginAtZero: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, config);

  // 5 days graph
  button1week.addEventListener("click", () => {
    mmiDataDynArray = mmiPriceArray.slice(0, 5); // get an array with 1 week data to get the max and the min using to display min and max for the Y Axe of the graph
    maxValue = Math.round(Math.max(...mmiDataDynArray));
    mmiScalesYMax = Math.round(maxValue / 10) * 10 + 10; // convert number to the nearest multiple of 10 and add a number for more space

    minValue = Math.round(Math.min(...mmiDataDynArray));
    mmiScalesYMin = Math.round(minValue / 10) * 10 - 20; // convert number to the nearest multiple of 10 and subtract a number for more space

    ((myChart.data.datasets[0].data = [
      { x: mmiDateArray[4], y: mmiPriceArray[4] },
      { x: mmiDateArray[3], y: mmiPriceArray[3] },
      { x: mmiDateArray[2], y: mmiPriceArray[2] },
      { x: mmiDateArray[1], y: mmiPriceArray[1] },
      { x: mmiDateArray[0], y: mmiPriceArray[0] },
    ]),
    (myChart.options.scales.y.max = mmiScalesYMax),
    (myChart.options.scales.y.min = mmiScalesYMin)),
      myChart.update();
    let variations5days = (
      ((mmiPriceArray[0] - mmiPriceArray[4]) / parseFloat(mmiPriceArray[4])) *
      100
    ).toFixed(2);

    // dynamique variation
    dynamiqueV.textContent = variations5days.replace(".", ",") + " %";

    if (variations5days > 0) {
      // clean classList
      mmiDisplay.classList.remove("PriceUp");
      mmiDisplay.classList.remove("PriceDown");

      // add classList
      mmiDisplay.classList.add("PriceUp");
      arrowDisplay.style.transform = "rotate(180deg)";
      dynamiqueV.style.backgroundColor = "#78B74477";
    } else {
      // clean classList
      mmiDisplay.classList.remove("PriceUp");
      mmiDisplay.classList.remove("PriceDown");

      // add classList
      mmiDisplay.classList.add("PriceDown");
      arrowDisplay.style.transform = "rotate(0deg)";
      dynamiqueV.style.backgroundColor = "#DF362D";
    }
  });
  //--------------------------------------

  // 10 days graph
  button2weeks.addEventListener("click", () => {
    mmiDataDynArray = mmiPriceArray.slice(0, 10); // get an array with 2 weeks data to get the max and the min using to display min and max for the Y Axe of the graph
    maxValue = Math.round(Math.max(...mmiDataDynArray));
    mmiScalesYMax = Math.round(maxValue / 10) * 10 + 20; // convert number to the nearest multiple of 10 and add a number for more space

    minValue = Math.round(Math.min(...mmiDataDynArray));
    mmiScalesYMin = Math.round(minValue / 10) * 10 - 30; // convert number to the nearest multiple of 10 and subtract a number for more space

    ((myChart.data.datasets[0].data = [
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
    ]),
    (myChart.options.scales.y.max = mmiScalesYMax),
    (myChart.options.scales.y.min = mmiScalesYMin)),
      myChart.update();
    let variations10days = (
      ((mmiPriceArray[0] - mmiPriceArray[9]) / parseFloat(mmiPriceArray[9])) *
      100
    ).toFixed(2);

    // dynamique variation
    dynamiqueV.textContent = variations10days.replace(".", ",") + " %";

    if (variations10days > 0) {
      // clean classList
      mmiDisplay.classList.remove("PriceUp");
      mmiDisplay.classList.remove("PriceDown");

      // add classList
      mmiDisplay.classList.add("PriceUp");
      arrowDisplay.style.transform = "rotate(180deg)";
      dynamiqueV.style.backgroundColor = "#78B74477";
    } else {
      // clean classList
      mmiDisplay.classList.remove("PriceUp");
      mmiDisplay.classList.remove("PriceDown");

      // add classList
      mmiDisplay.classList.add("PriceDown");
      arrowDisplay.style.transform = "rotate(0deg)";
      dynamiqueV.style.backgroundColor = "#DF362D";
    }
  });
  //--------------------------------------

  // 1 month graph
  button1month.addEventListener("click", () => {
    mmiDataDynArray = mmiPriceArray.slice(0, 21); // get an array with 1 month data to get the max and the min using to display min and max for the Y Axe of the graph
    maxValue = Math.round(Math.max(...mmiDataDynArray));
    mmiScalesYMax = Math.round(maxValue / 10) * 10 + 20; // convert number to the nearest multiple of 10 and add a number for more space

    minValue = Math.round(Math.min(...mmiDataDynArray));
    mmiScalesYMin = Math.round(minValue / 10) * 10 - 30; // convert number to the nearest multiple of 10 and subtract a number for more space

    ((myChart.data.datasets[0].data = [
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
    ]),
    (myChart.options.scales.y.max = mmiScalesYMax),
    (myChart.options.scales.y.min = mmiScalesYMin)),
      myChart.update();
    let variations1month = (
      ((mmiPriceArray[0] - mmiPriceArray[20]) / parseFloat(mmiPriceArray[20])) *
      100
    ).toFixed(2);

    // dynamique variation
    dynamiqueV.textContent = variations1month.replace(".", ",") + " %";

    if (variations1month > 0) {
      // clean classList
      mmiDisplay.classList.remove("PriceUp");
      mmiDisplay.classList.remove("PriceDown");

      // add classList
      mmiDisplay.classList.add("PriceUp");
      arrowDisplay.style.transform = "rotate(180deg)";
      dynamiqueV.style.backgroundColor = "#78B74477";
    } else {
      // clean classList
      mmiDisplay.classList.remove("PriceUp");
      mmiDisplay.classList.remove("PriceDown");

      // add classList
      mmiDisplay.classList.add("PriceDown");
      arrowDisplay.style.transform = "rotate(0deg)";
      dynamiqueV.style.backgroundColor = "#DF362D";
    }
  });
}

mmiChart();
