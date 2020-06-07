import React from 'react';
import {Line} from 'react-chartjs-2';



export default function TimeLine({chartData}){
    const data = {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Timeline',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            height:300,
            borderDashOffset: 1,
            borderJoinStyle: 'bevel',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartData.data
          }
        ]
      };
    return (
        <div className="timeline-wrapper">
          <Line data={data} height={100} />
        </div>
      );
}