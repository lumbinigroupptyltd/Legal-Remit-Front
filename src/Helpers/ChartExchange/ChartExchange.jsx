import React from "react";
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
// import ChartJS from 'chart.js/auto';

// ChartJS.register(
//   ChartJS.CategoryScale,
//   ChartJS.LinearScale,
//   ChartJS.PointElement,
//   ChartJS.LineElement,
//   ChartJS.Title,
//   ChartJS.Tooltip,
//   ChartJS.Legend
// );

// export const options = {
//   responsive: true,
//   interaction: {
//     mode: 'index',
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart - Multi Axis',
//     },
//   },
//   scales: {
//     y: {
//       type: 'linear',
//       display: true,
//       position: 'left',
//     },
//     y1: {
//       type: 'linear',
//       display: true,
//       position: 'right',
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       yAxisID: 'y',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       yAxisID: 'y1',
//     },
//   ],
// };

// export default function ChartExchange() {
//   return <Line options={options} data={data} />;
// }


const data = {
  labels: ["1 Nov 2022", "1 Dec 2022", "1 Jan 2022", "Today"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 25, 41],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "#AA2AE1",
      pointRadius:2
    },
    {
      label: "Second dataset",
      data: [33,44, 33, 21],
      fill: false,
      borderColor: "#FBD04C",
      pointRadius:2
    }
  ],
};

const legend = {
  display: false,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};

const options = {
  backgroundColor: 'lightblue',
  maintainAspectRatio: false,
  responsive:true,
  title: {
    display: false,
    text: "Chart Title"
  },

    scales: {
      xAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
         fontColor: '#2c2c2c', // X-Axis font color
          fontStyle: 'bold',   
        }
          
      }],
      yAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            display: false
        }
      }],
      pointLabels :{
        fontStyle: "bold",
     }
  
  }
};

export default function ChartExchange() {
  return (
    <div className="App">
      <Line className="chartMain"  width={500} height={300} data={data} legend={legend} options={options} />
    </div>
  );
}
