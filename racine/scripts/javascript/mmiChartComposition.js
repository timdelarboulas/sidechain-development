// circle chart to display the composition of mmi

async function mmiChartComposition() {
  await openMMITables();

  const ctx3 = document.getElementById("mmiComposition").getContext("2d");
  const config4 = {
    type: "doughnut",
    data: {
      labels: [
        result[0].MNEMO,
        result[1].MNEMO,
        result[2].MNEMO,
        result[3].MNEMO,
        result[4].MNEMO,
        result[5].MNEMO,
        result[6].MNEMO,
        result[7].MNEMO,
        result[8].MNEMO,
        result[9].MNEMO,
      ],
      datasets: [
        {
          label: "Composition",
          data: [
            result[0].Price,
            result[1].Price,
            result[2].Price,
            result[3].Price,
            result[4].Price,
            result[5].Price,
            result[6].Price,
            result[7].Price,
            result[8].Price,
            result[9].Price,
          ],
          backgroundColor: ["#B7AC44", "#FF8300", "#FF4500", "#DF362D"],
        },
      ],
    },
  };
  const myChart3 = new Chart(ctx3, config4);
}

mmiChartComposition();
