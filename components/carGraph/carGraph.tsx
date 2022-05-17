import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
}
  from 'recharts';
import { useAppSelector } from '../../hooks/hooks';

const CarGraph = () => {
  const { data } = useAppSelector((store) => store.car);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;
    let viewed1 = 0;
    let viewed2 = 0;
    let viewed3 = 0;
    let viewed4 = 0;
    let viewed5 = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 2000) {
        count1++;
        if (data[i].viewed) viewed1++;
      }
      if (data[i].price < 4000 && data[i].price > 2000) {
        count2++;
        if (data[i].viewed) viewed2++;
      }
      if (data[i].price < 6000 && data[i].price > 4000) {
        count3++;
        if (data[i].viewed) viewed3++;
      }
      if (data[i].price < 8000 && data[i].price > 6000) {
        count4++;
        if (data[i].viewed) viewed4++;
      }
      if (data[i].price > 8000) {
        count5++;
        if (data[i].viewed) viewed5++;
      }
    }
    setGraphData([
      { name: '0-2000', 'количество машин': count1, 'количество просмотренных машин': viewed1 },
      { name: '2000-4000', 'количество машин': count2, 'количество просмотренных машин': viewed2 },
      { name: '4000-6000', 'количество машин': count3, 'количество просмотренных машин': viewed3 },
      { name: '6000-8000', 'количество машин': count4, 'количество просмотренных машин': viewed4 },
      { name: '8000-10000', 'количество машин': count5, 'количество просмотренных машин': viewed5 },
    ]);
  }, [data]);

  return (
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="количество машин" fill="#8884d8" />
            <Bar dataKey="количество просмотренных машин" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
};

export default CarGraph;
