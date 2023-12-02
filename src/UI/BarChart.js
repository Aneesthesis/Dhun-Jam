import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function BarChart(props) {
  const data = {
    labels: Object.keys(props.data),
    datasets: [
      {
        label: "",
        data: Object.values(props.data),
        backgroundColor: "#F0C3F1",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          drawBorder: true,
          borderColor: "#FFFFFF",
          drawOnChartArea: false,
        },
        bar: {
          categorySpacing: 0.2,
        },
      },
      y: {
        ticks: {
          color: "transparent",
        },
        grid: {
          drawBorder: true,
          borderColor: "#FFFFFF",
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative flex gap-x-2 " style={{ width: "600px" }}>
      <div className="text-white absolute top-2 text-3xl">&#8377;</div>
      <Bar data={data} options={chartOptions} />
    </div>
  );
}

export default BarChart;
