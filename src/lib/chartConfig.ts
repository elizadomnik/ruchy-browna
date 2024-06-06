/**
 * Konfiguracja wykresu odpowiedzialna za wyswietlanie szczegolowych danych dla punktow x i y.
 */

export const chartConfig = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      title: {
        display: true,
        text: "X",
      },
    },
    y: {
      type: "linear",
      title: {
        display: true,
        text: "Y",
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: function (context: any) {
          let label = `Krok nr. ${
            context.dataset.data[context.dataIndex].index
          }: `;

          if (context.parsed.x !== null && context.parsed.y !== null) {
            label += `x: ${context.parsed.x.toFixed(
              2
            )}, y: ${context.parsed.y.toFixed(2)}`;
          }
          return label;
        },
      },
    },
  },
};
