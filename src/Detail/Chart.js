import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import style from '../App.scss';

const Chart = (props) => {
  return(
    <div>
      <LineChart width={props.contWidth} height={props.contWidth * 0.6} data={props.dataToPlot}>
        <XAxis dataKey="name" hide={true} />
        <YAxis domain={[dataMin => (dataMin * 0.99), dataMax => (dataMax * 1.01)]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ask" stroke="#8884d8" activeDot={{r: 8}} dot={false} />
        <Line type="monotone" dataKey="bid" stroke="#82ca9d" dot={false} />
      </LineChart>
    </div>
  );
}

export default Chart;