// MMI Chart 2, for the page about the index

const buttonAboutGraph1week = document.getElementById("mmiAboutGraph1week");
const buttonAboutGraph2weeks = document.getElementById("mmiAboutGraph2weeks");
const buttonAboutGraph1month = document.getElementById("mmiAboutGraph1month");
const buttonMA20 = document.getElementById("mmiMA20");
const buttonMA30 = document.getElementById("mmiMA30");
const buttonMA50 = document.getElementById("mmiMA50");

async function mmiChart2() {
  await openFiles();
  await csvMAfetch();

  maxValue = Math.round(Math.max(...mmiPriceArray)); // get the max value from the array of the MMI's Price
  mmiScalesYMax = Math.round(maxValue / 10) * 10 + 10; // convert maxValue to the nearest multiple of 10 and add a number for more space
  // this permit to have a dynamique max value for the Y axe

  const ctx2 = document.getElementById("mmiChart2").getContext("2d");
  const config2 = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cours (USD)",
          data: [
            { x: mmiDateArray[65], y: mmiPriceArray[65] },
            { x: mmiDateArray[64], y: mmiPriceArray[64] },
            { x: mmiDateArray[63], y: mmiPriceArray[63] },
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
        {
          label: "MM 20",
          data: [{}],
          pointStyle: "line",
          fill: false,
          borderWidth: 3,
          borderCapStyle: "round",
          borderColor: "#78B744", // green
          borderJoinStyle: "round",
          tension: 0.4,
        },
        {
          label: "MM 30",
          data: [{}],
          pointStyle: "line",
          fill: false,
          borderWidth: 3,
          borderCapStyle: "round",
          borderColor: "#FF8300", // orange
          borderJoinStyle: "round",
          tension: 0.4,
        },
        {
          label: "MM 50",
          data: [{}],
          pointStyle: "line",
          fill: false,
          borderWidth: 3,
          borderCapStyle: "round",
          borderColor: "#00A7E1", // blue
          borderJoinStyle: "round",
          tension: 0.4,
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
            display: true,
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 8,
            beginAtZero: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
      },
    },
  };

  const myChart2 = new Chart(ctx2, config2);

  function mmiChartVolatility() {
    maxValue = Math.round(Math.max(...mmiVolatilityArray)); // get the max value from the array of the MMI's Price
    minValue = Math.round(Math.min(...mmiVolatilityArray)); // get the min
    mmiScalesYMax = Math.round(maxValue / 10) * 10 + 3; // convert maxValue to the nearest multiple of 10 and add a number for more space
    mmiScalesYMin = Math.round(minValue / 10) * 10 + 1; // same that mmiScalesYMax
    // this permit to have a dynamique max and min value for the Y axe

    const ctxVolatility = document
      .getElementById("mmiChartVolatility")
      .getContext("2d");
    const config3 = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Volatilité (%)",
            data: [
              { x: mmiDateArray[40], y: mmiVolatilityArray[40] * 100 },
              { x: mmiDateArray[39], y: mmiVolatilityArray[39] * 100 },
              { x: mmiDateArray[38], y: mmiVolatilityArray[38] * 100 },
              { x: mmiDateArray[37], y: mmiVolatilityArray[37] * 100 },
              { x: mmiDateArray[36], y: mmiVolatilityArray[36] * 100 },
              { x: mmiDateArray[35], y: mmiVolatilityArray[35] * 100 },
              { x: mmiDateArray[34], y: mmiVolatilityArray[34] * 100 },
              { x: mmiDateArray[33], y: mmiVolatilityArray[33] * 100 },
              { x: mmiDateArray[32], y: mmiVolatilityArray[32] * 100 },
              { x: mmiDateArray[31], y: mmiVolatilityArray[31] * 100 },
              { x: mmiDateArray[30], y: mmiVolatilityArray[30] * 100 },
              { x: mmiDateArray[29], y: mmiVolatilityArray[29] * 100 },
              { x: mmiDateArray[28], y: mmiVolatilityArray[28] * 100 },
              { x: mmiDateArray[27], y: mmiVolatilityArray[27] * 100 },
              { x: mmiDateArray[26], y: mmiVolatilityArray[26] * 100 },
              { x: mmiDateArray[25], y: mmiVolatilityArray[25] * 100 },
              { x: mmiDateArray[24], y: mmiVolatilityArray[24] * 100 },
              { x: mmiDateArray[23], y: mmiVolatilityArray[23] * 100 },
              { x: mmiDateArray[22], y: mmiVolatilityArray[22] * 100 },
              { x: mmiDateArray[21], y: mmiVolatilityArray[21] * 100 },
              { x: mmiDateArray[20], y: mmiVolatilityArray[20] * 100 },
              { x: mmiDateArray[19], y: mmiVolatilityArray[19] * 100 },
              { x: mmiDateArray[18], y: mmiVolatilityArray[18] * 100 },
              { x: mmiDateArray[17], y: mmiVolatilityArray[17] * 100 },
              { x: mmiDateArray[16], y: mmiVolatilityArray[16] * 100 },
              { x: mmiDateArray[15], y: mmiVolatilityArray[15] * 100 },
              { x: mmiDateArray[14], y: mmiVolatilityArray[14] * 100 },
              { x: mmiDateArray[13], y: mmiVolatilityArray[13] * 100 },
              { x: mmiDateArray[12], y: mmiVolatilityArray[12] * 100 },
              { x: mmiDateArray[11], y: mmiVolatilityArray[11] * 100 },
              { x: mmiDateArray[10], y: mmiVolatilityArray[10] * 100 },
              { x: mmiDateArray[9], y: mmiVolatilityArray[9] * 100 },
              { x: mmiDateArray[8], y: mmiVolatilityArray[8] * 100 },
              { x: mmiDateArray[7], y: mmiVolatilityArray[7] * 100 },
              { x: mmiDateArray[6], y: mmiVolatilityArray[6] * 100 },
              { x: mmiDateArray[5], y: mmiVolatilityArray[5] * 100 },
              { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
              { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
              { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
              { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
              { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
            ],
            borderColor: "#000000",
            backgroundColor: "#78b74477",
            fill: true,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: true,
            position: "top",
            align: "center",
            text: "Volatilité (30 jours)",
          },
        },
        scales: {
          y: {
            max: mmiScalesYMax,
            min: mmiScalesYMin,
            grid: {
              display: true,
            },
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 2,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 3,
              beginAtZero: true,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
      },
    };

    const myChartVolatility = new Chart(ctxVolatility, config3);

    // 5 days graph
    buttonAboutGraph1week.addEventListener("click", () => {
      mmiDataDynArray = mmiPriceArray.slice(0, 5); // get an array with 1 week data to get the max and the min using to display min and max for the Y Axe of the graph
      maxValue = Math.round(Math.max(...mmiDataDynArray));
      mmiScalesYMax = Math.round(maxValue / 10) * 10 + 10; // convert number to the nearest multiple of 10 and add a number for more space

      minValue = Math.round(Math.min(...mmiDataDynArray));
      mmiScalesYMin = Math.round(minValue / 10) * 10 - 20; // convert number to the nearest multiple of 10 and subtract a number for more space

      // update MMI graph
      ((myChart2.data.datasets[0].data = [
        { x: mmiDateArray[4], y: mmiPriceArray[4] },
        { x: mmiDateArray[3], y: mmiPriceArray[3] },
        { x: mmiDateArray[2], y: mmiPriceArray[2] },
        { x: mmiDateArray[1], y: mmiPriceArray[1] },
        { x: mmiDateArray[0], y: mmiPriceArray[0] },
      ]),
      (myChart2.data.datasets[1].data = []),
      (myChart2.data.datasets[2].data = []),
      (myChart2.data.datasets[3].data = []),
      (myChart2.options.scales.y.max = mmiScalesYMax),
      (myChart2.options.scales.y.min = mmiScalesYMin)),
        myChart2.update();

      // update volatility graph
      (myChartVolatility.data.datasets[0].data = [
        { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
        { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
        { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
        { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
        { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
      ]),
        myChartVolatility.update();

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
        arrowDisplay2.style.transform = "rotate(180deg)";
        dynamiqueV.style.backgroundColor = "#78B74477";
      } else {
        // clean classList
        mmiDisplay.classList.remove("PriceUp");
        mmiDisplay.classList.remove("PriceDown");

        // add classList
        mmiDisplay.classList.add("PriceDown");
        arrowDisplay.style.transform = "rotate(0deg)";
        arrowDisplay2.style.transform = "rotate(0deg)";
        dynamiqueV.style.backgroundColor = "#DF362D";
      }
    });
    //--------------------------------------

    // 10 days graph
    buttonAboutGraph2weeks.addEventListener("click", () => {
      mmiDataDynArray = mmiPriceArray.slice(0, 10); // get an array with 2 weeks data to get the max and the min using to display min and max for the Y Axe of the graph
      maxValue = Math.round(Math.max(...mmiDataDynArray));
      mmiScalesYMax = Math.round(maxValue / 10) * 10 + 20; // convert number to the nearest multiple of 10 and add a number for more space

      minValue = Math.round(Math.min(...mmiDataDynArray));
      mmiScalesYMin = Math.round(minValue / 10) * 10 - 30; // convert number to the nearest multiple of 10 and subtract a number for more space

      // update MMI graph
      ((myChart2.data.datasets[0].data = [
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
      (myChart2.data.datasets[1].data = []),
      (myChart2.data.datasets[2].data = []),
      (myChart2.data.datasets[3].data = []),
      (myChart2.options.scales.y.max = mmiScalesYMax),
      (myChart2.options.scales.y.min = mmiScalesYMin)),
        myChart2.update();

      // update volatility graph
      (myChartVolatility.data.datasets[0].data = [
        { x: mmiDateArray[9], y: mmiVolatilityArray[9] * 100 },
        { x: mmiDateArray[8], y: mmiVolatilityArray[8] * 100 },
        { x: mmiDateArray[7], y: mmiVolatilityArray[7] * 100 },
        { x: mmiDateArray[6], y: mmiVolatilityArray[6] * 100 },
        { x: mmiDateArray[5], y: mmiVolatilityArray[5] * 100 },
        { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
        { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
        { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
        { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
        { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
      ]),
        myChartVolatility.update();

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
        arrowDisplay2.style.transform = "rotate(180deg)";
        dynamiqueV.style.backgroundColor = "#78B74477";
      } else {
        // clean classList
        mmiDisplay.classList.remove("PriceUp");
        mmiDisplay.classList.remove("PriceDown");

        // add classList
        mmiDisplay.classList.add("PriceDown");
        arrowDisplay.style.transform = "rotate(0deg)";
        arrowDisplay2.style.transform = "rotate(0deg)";
        dynamiqueV.style.backgroundColor = "#DF362D";
      }
    });
    //--------------------------------------

    // 1 month graph
    buttonAboutGraph1month.addEventListener("click", () => {
      mmiDataDynArray = mmiPriceArray.slice(0, 21); // get an array with 1 month data to get the max and the min using to display min and max for the Y Axe of the graph
      maxValue = Math.round(Math.max(...mmiDataDynArray));
      mmiScalesYMax = Math.round(maxValue / 10) * 10 + 20; // convert number to the nearest multiple of 10 and add a number for more space

      minValue = Math.round(Math.min(...mmiDataDynArray));
      mmiScalesYMin = Math.round(minValue / 10) * 10 - 30; // convert number to the nearest multiple of 10 and subtract a number for more space

      // update MMI graph
      ((myChart2.data.datasets[0].data = [
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
      ]),
      (myChart2.data.datasets[1].data = []),
      (myChart2.data.datasets[2].data = []),
      (myChart2.data.datasets[3].data = []),
      (myChart2.options.scales.y.max = mmiScalesYMax),
      (myChart2.options.scales.y.min = mmiScalesYMin)),
        myChart2.update();

      // update volatility graph
      (myChartVolatility.data.datasets[0].data = [
        { x: mmiDateArray[21], y: mmiVolatilityArray[21] * 100 },
        { x: mmiDateArray[20], y: mmiVolatilityArray[20] * 100 },
        { x: mmiDateArray[19], y: mmiVolatilityArray[19] * 100 },
        { x: mmiDateArray[18], y: mmiVolatilityArray[18] * 100 },
        { x: mmiDateArray[17], y: mmiVolatilityArray[17] * 100 },
        { x: mmiDateArray[16], y: mmiVolatilityArray[16] * 100 },
        { x: mmiDateArray[15], y: mmiVolatilityArray[15] * 100 },
        { x: mmiDateArray[14], y: mmiVolatilityArray[14] * 100 },
        { x: mmiDateArray[13], y: mmiVolatilityArray[13] * 100 },
        { x: mmiDateArray[12], y: mmiVolatilityArray[12] * 100 },
        { x: mmiDateArray[11], y: mmiVolatilityArray[11] * 100 },
        { x: mmiDateArray[10], y: mmiVolatilityArray[10] * 100 },
        { x: mmiDateArray[9], y: mmiVolatilityArray[9] * 100 },
        { x: mmiDateArray[8], y: mmiVolatilityArray[8] * 100 },
        { x: mmiDateArray[7], y: mmiVolatilityArray[7] * 100 },
        { x: mmiDateArray[6], y: mmiVolatilityArray[6] * 100 },
        { x: mmiDateArray[5], y: mmiVolatilityArray[5] * 100 },
        { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
        { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
        { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
        { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
        { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
      ]),
        myChartVolatility.update();

      let variations1month = (
        ((mmiPriceArray[0] - mmiPriceArray[20]) /
          parseFloat(mmiPriceArray[20])) *
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
        arrowDisplay2.style.transform = "rotate(180deg)";
        dynamiqueV.style.backgroundColor = "#78B74477";
      } else {
        // clean classList
        mmiDisplay.classList.remove("PriceUp");
        mmiDisplay.classList.remove("PriceDown");

        // add classList
        mmiDisplay.classList.add("PriceDown");
        arrowDisplay.style.transform = "rotate(0deg)";
        arrowDisplay2.style.transform = "rotate(0deg)";
        dynamiqueV.style.backgroundColor = "#DF362D";
      }
    });

    // Add Moving Average 20-Days line
    buttonMA20.addEventListener("click", () => {
      mmiDataDynArray = mmiPriceArray.slice(0, 28); // get an array with 1 month data to get the max and the min using to display min and max for the Y Axe of the graph
      maxValue = Math.round(Math.max(...mmiDataDynArray));
      mmiScalesYMax = Math.round(maxValue / 10) * 10 + 5; // convert number to the nearest multiple of 10 and add a number for more space

      minValue = Math.round(Math.min(...mmiDataDynArray));
      mmiScalesYMin = Math.round(minValue / 10) * 10 - 10; // convert number to the nearest multiple of 10 and subtract a number for more space

      ((myChart2.data.datasets[0].data = [
        { x: mmiDateArray[65], y: mmiPriceArray[65] },
        { x: mmiDateArray[64], y: mmiPriceArray[64] },
        { x: mmiDateArray[63], y: mmiPriceArray[63] },
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
      ]),
      (myChart2.data.datasets[1].data = [
        { x: mmiDateArray[65], y: movingAverage20Array[65] },
        { x: mmiDateArray[64], y: movingAverage20Array[64] },
        { x: mmiDateArray[63], y: movingAverage20Array[63] },
        { x: mmiDateArray[62], y: movingAverage20Array[62] },
        { x: mmiDateArray[61], y: movingAverage20Array[61] },
        { x: mmiDateArray[60], y: movingAverage20Array[60] },
        { x: mmiDateArray[59], y: movingAverage20Array[59] },
        { x: mmiDateArray[58], y: movingAverage20Array[58] },
        { x: mmiDateArray[57], y: movingAverage20Array[57] },
        { x: mmiDateArray[56], y: movingAverage20Array[56] },
        { x: mmiDateArray[55], y: movingAverage20Array[55] },
        { x: mmiDateArray[54], y: movingAverage20Array[54] },
        { x: mmiDateArray[53], y: movingAverage20Array[53] },
        { x: mmiDateArray[52], y: movingAverage20Array[52] },
        { x: mmiDateArray[51], y: movingAverage20Array[51] },
        { x: mmiDateArray[50], y: movingAverage20Array[50] },
        { x: mmiDateArray[49], y: movingAverage20Array[49] },
        { x: mmiDateArray[48], y: movingAverage20Array[48] },
        { x: mmiDateArray[47], y: movingAverage20Array[47] },
        { x: mmiDateArray[46], y: movingAverage20Array[46] },
        { x: mmiDateArray[45], y: movingAverage20Array[45] },
        { x: mmiDateArray[44], y: movingAverage20Array[44] },
        { x: mmiDateArray[43], y: movingAverage20Array[43] },
        { x: mmiDateArray[42], y: movingAverage20Array[42] },
        { x: mmiDateArray[41], y: movingAverage20Array[41] },
        { x: mmiDateArray[40], y: movingAverage20Array[40] },
        { x: mmiDateArray[39], y: movingAverage20Array[39] },
        { x: mmiDateArray[38], y: movingAverage20Array[38] },
        { x: mmiDateArray[37], y: movingAverage20Array[37] },
        { x: mmiDateArray[36], y: movingAverage20Array[36] },
        { x: mmiDateArray[35], y: movingAverage20Array[35] },
        { x: mmiDateArray[34], y: movingAverage20Array[34] },
        { x: mmiDateArray[33], y: movingAverage20Array[33] },
        { x: mmiDateArray[32], y: movingAverage20Array[32] },
        { x: mmiDateArray[31], y: movingAverage20Array[31] },
        { x: mmiDateArray[30], y: movingAverage20Array[30] },
        { x: mmiDateArray[29], y: movingAverage20Array[29] },
        { x: mmiDateArray[28], y: movingAverage20Array[28] },
        { x: mmiDateArray[27], y: movingAverage20Array[27] },
        { x: mmiDateArray[26], y: movingAverage20Array[26] },
        { x: mmiDateArray[25], y: movingAverage20Array[25] },
        { x: mmiDateArray[24], y: movingAverage20Array[24] },
        { x: mmiDateArray[23], y: movingAverage20Array[23] },
        { x: mmiDateArray[22], y: movingAverage20Array[22] },
        { x: mmiDateArray[21], y: movingAverage20Array[21] },
        { x: mmiDateArray[20], y: movingAverage20Array[20] },
        { x: mmiDateArray[19], y: movingAverage20Array[19] },
        { x: mmiDateArray[18], y: movingAverage20Array[18] },
        { x: mmiDateArray[17], y: movingAverage20Array[17] },
        { x: mmiDateArray[16], y: movingAverage20Array[16] },
        { x: mmiDateArray[15], y: movingAverage20Array[15] },
        { x: mmiDateArray[14], y: movingAverage20Array[14] },
        { x: mmiDateArray[13], y: movingAverage20Array[13] },
        { x: mmiDateArray[12], y: movingAverage20Array[12] },
        { x: mmiDateArray[11], y: movingAverage20Array[11] },
        { x: mmiDateArray[10], y: movingAverage20Array[10] },
        { x: mmiDateArray[9], y: movingAverage20Array[9] },
        { x: mmiDateArray[8], y: movingAverage20Array[8] },
        { x: mmiDateArray[7], y: movingAverage20Array[7] },
        { x: mmiDateArray[6], y: movingAverage20Array[6] },
        { x: mmiDateArray[5], y: movingAverage20Array[5] },
        { x: mmiDateArray[4], y: movingAverage20Array[4] },
        { x: mmiDateArray[3], y: movingAverage20Array[3] },
        { x: mmiDateArray[2], y: movingAverage20Array[2] },
        { x: mmiDateArray[1], y: movingAverage20Array[1] },
        { x: mmiDateArray[0], y: movingAverage20Array[0] },
      ]),
      (myChart2.options.scales.y.max = mmiScalesYMax),
      (myChart2.options.scales.y.min = mmiScalesYMin)),
        myChart2.update();

      // update volatility chart
      (myChartVolatility.data.datasets[0].data = [
        { x: mmiDateArray[21], y: mmiVolatilityArray[21] * 100 },
        { x: mmiDateArray[20], y: mmiVolatilityArray[20] * 100 },
        { x: mmiDateArray[19], y: mmiVolatilityArray[19] * 100 },
        { x: mmiDateArray[18], y: mmiVolatilityArray[18] * 100 },
        { x: mmiDateArray[17], y: mmiVolatilityArray[17] * 100 },
        { x: mmiDateArray[16], y: mmiVolatilityArray[16] * 100 },
        { x: mmiDateArray[15], y: mmiVolatilityArray[15] * 100 },
        { x: mmiDateArray[14], y: mmiVolatilityArray[14] * 100 },
        { x: mmiDateArray[13], y: mmiVolatilityArray[13] * 100 },
        { x: mmiDateArray[12], y: mmiVolatilityArray[12] * 100 },
        { x: mmiDateArray[11], y: mmiVolatilityArray[11] * 100 },
        { x: mmiDateArray[10], y: mmiVolatilityArray[10] * 100 },
        { x: mmiDateArray[9], y: mmiVolatilityArray[9] * 100 },
        { x: mmiDateArray[8], y: mmiVolatilityArray[8] * 100 },
        { x: mmiDateArray[7], y: mmiVolatilityArray[7] * 100 },
        { x: mmiDateArray[6], y: mmiVolatilityArray[6] * 100 },
        { x: mmiDateArray[5], y: mmiVolatilityArray[5] * 100 },
        { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
        { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
        { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
        { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
        { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
      ]),
        myChartVolatility.update();

      // display the variation of the day
      dynamiqueV.textContent = variationPercentageDisplay + " %";
    });

    buttonMA30.addEventListener("click", () => {
      mmiDataDynArray = mmiPriceArray.slice(0, 28); // get an array with 1 month data to get the max and the min using to display min and max for the Y Axe of the graph
      maxValue = Math.round(Math.max(...mmiDataDynArray));
      mmiScalesYMax = Math.round(maxValue / 10) * 10 + 5; // convert number to the nearest multiple of 10 and add a number for more space

      minValue = Math.round(Math.min(...mmiDataDynArray));
      mmiScalesYMin = Math.round(minValue / 10) * 10 - 10; // convert number to the nearest multiple of 10 and subtract a number for more space

      (myChart2.data.datasets[0].data = [
        { x: mmiDateArray[65], y: mmiPriceArray[65] },
        { x: mmiDateArray[64], y: mmiPriceArray[64] },
        { x: mmiDateArray[63], y: mmiPriceArray[63] },
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
      ]),
        (myChart2.data.datasets[2].data = [
          { x: mmiDateArray[65], y: movingAverage30Array[65] },
          { x: mmiDateArray[64], y: movingAverage30Array[64] },
          { x: mmiDateArray[63], y: movingAverage30Array[63] },
          { x: mmiDateArray[62], y: movingAverage30Array[62] },
          { x: mmiDateArray[61], y: movingAverage30Array[61] },
          { x: mmiDateArray[60], y: movingAverage30Array[60] },
          { x: mmiDateArray[59], y: movingAverage30Array[59] },
          { x: mmiDateArray[58], y: movingAverage30Array[58] },
          { x: mmiDateArray[57], y: movingAverage30Array[57] },
          { x: mmiDateArray[56], y: movingAverage30Array[56] },
          { x: mmiDateArray[55], y: movingAverage30Array[55] },
          { x: mmiDateArray[54], y: movingAverage30Array[54] },
          { x: mmiDateArray[53], y: movingAverage30Array[53] },
          { x: mmiDateArray[52], y: movingAverage30Array[52] },
          { x: mmiDateArray[51], y: movingAverage30Array[51] },
          { x: mmiDateArray[50], y: movingAverage30Array[50] },
          { x: mmiDateArray[49], y: movingAverage30Array[49] },
          { x: mmiDateArray[48], y: movingAverage30Array[48] },
          { x: mmiDateArray[47], y: movingAverage30Array[47] },
          { x: mmiDateArray[46], y: movingAverage30Array[46] },
          { x: mmiDateArray[45], y: movingAverage30Array[45] },
          { x: mmiDateArray[44], y: movingAverage30Array[44] },
          { x: mmiDateArray[43], y: movingAverage30Array[43] },
          { x: mmiDateArray[42], y: movingAverage30Array[42] },
          { x: mmiDateArray[41], y: movingAverage30Array[41] },
          { x: mmiDateArray[40], y: movingAverage30Array[40] },
          { x: mmiDateArray[39], y: movingAverage30Array[39] },
          { x: mmiDateArray[38], y: movingAverage30Array[38] },
          { x: mmiDateArray[37], y: movingAverage30Array[37] },
          { x: mmiDateArray[36], y: movingAverage30Array[36] },
          { x: mmiDateArray[35], y: movingAverage30Array[35] },
          { x: mmiDateArray[34], y: movingAverage30Array[34] },
          { x: mmiDateArray[33], y: movingAverage30Array[33] },
          { x: mmiDateArray[32], y: movingAverage30Array[32] },
          { x: mmiDateArray[31], y: movingAverage30Array[31] },
          { x: mmiDateArray[30], y: movingAverage30Array[30] },
          { x: mmiDateArray[29], y: movingAverage30Array[29] },
          { x: mmiDateArray[28], y: movingAverage30Array[28] },
          { x: mmiDateArray[27], y: movingAverage30Array[27] },
          { x: mmiDateArray[26], y: movingAverage30Array[26] },
          { x: mmiDateArray[25], y: movingAverage30Array[25] },
          { x: mmiDateArray[24], y: movingAverage30Array[24] },
          { x: mmiDateArray[23], y: movingAverage30Array[23] },
          { x: mmiDateArray[22], y: movingAverage30Array[22] },
          { x: mmiDateArray[21], y: movingAverage30Array[21] },
          { x: mmiDateArray[20], y: movingAverage30Array[20] },
          { x: mmiDateArray[19], y: movingAverage30Array[19] },
          { x: mmiDateArray[18], y: movingAverage30Array[18] },
          { x: mmiDateArray[17], y: movingAverage30Array[17] },
          { x: mmiDateArray[16], y: movingAverage30Array[16] },
          { x: mmiDateArray[15], y: movingAverage30Array[15] },
          { x: mmiDateArray[14], y: movingAverage30Array[14] },
          { x: mmiDateArray[13], y: movingAverage30Array[13] },
          { x: mmiDateArray[12], y: movingAverage30Array[12] },
          { x: mmiDateArray[11], y: movingAverage30Array[11] },
          { x: mmiDateArray[10], y: movingAverage30Array[10] },
          { x: mmiDateArray[9], y: movingAverage30Array[9] },
          { x: mmiDateArray[8], y: movingAverage30Array[8] },
          { x: mmiDateArray[7], y: movingAverage30Array[7] },
          { x: mmiDateArray[6], y: movingAverage30Array[6] },
          { x: mmiDateArray[5], y: movingAverage30Array[5] },
          { x: mmiDateArray[4], y: movingAverage30Array[4] },
          { x: mmiDateArray[3], y: movingAverage30Array[3] },
          { x: mmiDateArray[2], y: movingAverage30Array[2] },
          { x: mmiDateArray[1], y: movingAverage30Array[1] },
          { x: mmiDateArray[0], y: movingAverage30Array[0] },
        ]),
        (myChart2.options.scales.y.max = mmiScalesYMax),
        (myChart2.options.scales.y.min = mmiScalesYMin),
        myChart2.update();

      // update volatility chart
      (myChartVolatility.data.datasets[0].data = [
        { x: mmiDateArray[21], y: mmiVolatilityArray[21] * 100 },
        { x: mmiDateArray[20], y: mmiVolatilityArray[20] * 100 },
        { x: mmiDateArray[19], y: mmiVolatilityArray[19] * 100 },
        { x: mmiDateArray[18], y: mmiVolatilityArray[18] * 100 },
        { x: mmiDateArray[17], y: mmiVolatilityArray[17] * 100 },
        { x: mmiDateArray[16], y: mmiVolatilityArray[16] * 100 },
        { x: mmiDateArray[15], y: mmiVolatilityArray[15] * 100 },
        { x: mmiDateArray[14], y: mmiVolatilityArray[14] * 100 },
        { x: mmiDateArray[13], y: mmiVolatilityArray[13] * 100 },
        { x: mmiDateArray[12], y: mmiVolatilityArray[12] * 100 },
        { x: mmiDateArray[11], y: mmiVolatilityArray[11] * 100 },
        { x: mmiDateArray[10], y: mmiVolatilityArray[10] * 100 },
        { x: mmiDateArray[9], y: mmiVolatilityArray[9] * 100 },
        { x: mmiDateArray[8], y: mmiVolatilityArray[8] * 100 },
        { x: mmiDateArray[7], y: mmiVolatilityArray[7] * 100 },
        { x: mmiDateArray[6], y: mmiVolatilityArray[6] * 100 },
        { x: mmiDateArray[5], y: mmiVolatilityArray[5] * 100 },
        { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
        { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
        { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
        { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
        { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
      ]),
        myChartVolatility.update();

      // display the variation of the day
      dynamiqueV.textContent = variationPercentageDisplay + " %";
    });

    buttonMA50.addEventListener("click", () => {
      mmiDataDynArray = mmiPriceArray.slice(0, 28); // get an array with 1 month data to get the max and the min using to display min and max for the Y Axe of the graph
      maxValue = Math.round(Math.max(...mmiDataDynArray));
      mmiScalesYMax = Math.round(maxValue / 10) * 10 + 5; // convert number to the nearest multiple of 10 and add a number for more space

      minValue = Math.round(Math.min(...mmiDataDynArray));
      mmiScalesYMin = Math.round(minValue / 10) * 10 - 10; // convert number to the nearest multiple of 10 and subtract a number for more space
      (myChart2.data.datasets[0].data = [
        { x: mmiDateArray[65], y: mmiPriceArray[65] },
        { x: mmiDateArray[64], y: mmiPriceArray[64] },
        { x: mmiDateArray[63], y: mmiPriceArray[63] },
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
      ]),
        (myChart2.data.datasets[3].data = [
          { x: mmiDateArray[65], y: movingAverage50Array[65] },
          { x: mmiDateArray[64], y: movingAverage50Array[64] },
          { x: mmiDateArray[63], y: movingAverage50Array[63] },
          { x: mmiDateArray[62], y: movingAverage50Array[62] },
          { x: mmiDateArray[61], y: movingAverage50Array[61] },
          { x: mmiDateArray[60], y: movingAverage50Array[60] },
          { x: mmiDateArray[59], y: movingAverage50Array[59] },
          { x: mmiDateArray[58], y: movingAverage50Array[58] },
          { x: mmiDateArray[57], y: movingAverage50Array[57] },
          { x: mmiDateArray[56], y: movingAverage50Array[56] },
          { x: mmiDateArray[55], y: movingAverage50Array[55] },
          { x: mmiDateArray[54], y: movingAverage50Array[54] },
          { x: mmiDateArray[53], y: movingAverage50Array[53] },
          { x: mmiDateArray[52], y: movingAverage50Array[52] },
          { x: mmiDateArray[51], y: movingAverage50Array[51] },
          { x: mmiDateArray[50], y: movingAverage50Array[50] },
          { x: mmiDateArray[49], y: movingAverage50Array[49] },
          { x: mmiDateArray[48], y: movingAverage50Array[48] },
          { x: mmiDateArray[47], y: movingAverage50Array[47] },
          { x: mmiDateArray[46], y: movingAverage50Array[46] },
          { x: mmiDateArray[45], y: movingAverage50Array[45] },
          { x: mmiDateArray[44], y: movingAverage50Array[44] },
          { x: mmiDateArray[43], y: movingAverage50Array[43] },
          { x: mmiDateArray[42], y: movingAverage50Array[42] },
          { x: mmiDateArray[41], y: movingAverage50Array[41] },
          { x: mmiDateArray[40], y: movingAverage50Array[40] },
          { x: mmiDateArray[39], y: movingAverage50Array[39] },
          { x: mmiDateArray[38], y: movingAverage50Array[38] },
          { x: mmiDateArray[37], y: movingAverage50Array[37] },
          { x: mmiDateArray[36], y: movingAverage50Array[36] },
          { x: mmiDateArray[35], y: movingAverage50Array[35] },
          { x: mmiDateArray[34], y: movingAverage50Array[34] },
          { x: mmiDateArray[33], y: movingAverage50Array[33] },
          { x: mmiDateArray[32], y: movingAverage50Array[32] },
          { x: mmiDateArray[31], y: movingAverage50Array[31] },
          { x: mmiDateArray[30], y: movingAverage50Array[30] },
          { x: mmiDateArray[29], y: movingAverage50Array[29] },
          { x: mmiDateArray[28], y: movingAverage50Array[28] },
          { x: mmiDateArray[27], y: movingAverage50Array[27] },
          { x: mmiDateArray[26], y: movingAverage50Array[26] },
          { x: mmiDateArray[25], y: movingAverage50Array[25] },
          { x: mmiDateArray[24], y: movingAverage50Array[24] },
          { x: mmiDateArray[23], y: movingAverage50Array[23] },
          { x: mmiDateArray[22], y: movingAverage50Array[22] },
          { x: mmiDateArray[21], y: movingAverage50Array[21] },
          { x: mmiDateArray[20], y: movingAverage50Array[20] },
          { x: mmiDateArray[19], y: movingAverage50Array[19] },
          { x: mmiDateArray[18], y: movingAverage50Array[18] },
          { x: mmiDateArray[17], y: movingAverage50Array[17] },
          { x: mmiDateArray[16], y: movingAverage50Array[16] },
          { x: mmiDateArray[15], y: movingAverage50Array[15] },
          { x: mmiDateArray[14], y: movingAverage50Array[14] },
          { x: mmiDateArray[13], y: movingAverage50Array[13] },
          { x: mmiDateArray[12], y: movingAverage50Array[12] },
          { x: mmiDateArray[11], y: movingAverage50Array[11] },
          { x: mmiDateArray[10], y: movingAverage50Array[10] },
          { x: mmiDateArray[9], y: movingAverage50Array[9] },
          { x: mmiDateArray[8], y: movingAverage50Array[8] },
          { x: mmiDateArray[7], y: movingAverage50Array[7] },
          { x: mmiDateArray[6], y: movingAverage50Array[6] },
          { x: mmiDateArray[5], y: movingAverage50Array[5] },
          { x: mmiDateArray[4], y: movingAverage50Array[4] },
          { x: mmiDateArray[3], y: movingAverage50Array[3] },
          { x: mmiDateArray[2], y: movingAverage50Array[2] },
          { x: mmiDateArray[1], y: movingAverage50Array[1] },
          { x: mmiDateArray[0], y: movingAverage50Array[0] },
        ]),
        (myChart2.options.scales.y.max = mmiScalesYMax),
        (myChart2.options.scales.y.min = mmiScalesYMin),
        myChart2.update();

      // update volatility chart
      (myChartVolatility.data.datasets[0].data = [
        { x: mmiDateArray[21], y: mmiVolatilityArray[21] * 100 },
        { x: mmiDateArray[20], y: mmiVolatilityArray[20] * 100 },
        { x: mmiDateArray[19], y: mmiVolatilityArray[19] * 100 },
        { x: mmiDateArray[18], y: mmiVolatilityArray[18] * 100 },
        { x: mmiDateArray[17], y: mmiVolatilityArray[17] * 100 },
        { x: mmiDateArray[16], y: mmiVolatilityArray[16] * 100 },
        { x: mmiDateArray[15], y: mmiVolatilityArray[15] * 100 },
        { x: mmiDateArray[14], y: mmiVolatilityArray[14] * 100 },
        { x: mmiDateArray[13], y: mmiVolatilityArray[13] * 100 },
        { x: mmiDateArray[12], y: mmiVolatilityArray[12] * 100 },
        { x: mmiDateArray[11], y: mmiVolatilityArray[11] * 100 },
        { x: mmiDateArray[10], y: mmiVolatilityArray[10] * 100 },
        { x: mmiDateArray[9], y: mmiVolatilityArray[9] * 100 },
        { x: mmiDateArray[8], y: mmiVolatilityArray[8] * 100 },
        { x: mmiDateArray[7], y: mmiVolatilityArray[7] * 100 },
        { x: mmiDateArray[6], y: mmiVolatilityArray[6] * 100 },
        { x: mmiDateArray[5], y: mmiVolatilityArray[5] * 100 },
        { x: mmiDateArray[4], y: mmiVolatilityArray[4] * 100 },
        { x: mmiDateArray[3], y: mmiVolatilityArray[3] * 100 },
        { x: mmiDateArray[2], y: mmiVolatilityArray[2] * 100 },
        { x: mmiDateArray[1], y: mmiVolatilityArray[1] * 100 },
        { x: mmiDateArray[0], y: mmiVolatilityArray[0] * 100 },
      ]),
        myChartVolatility.update();

      // display the variation of the day
      dynamiqueV.textContent = variationPercentageDisplay + " %";
    });
  }
  mmiChartVolatility(); // graph for volatility
}

mmiChart2();
