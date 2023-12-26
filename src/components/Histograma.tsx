import React, { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from 'recharts';

type HistogramaProps = {
    data: {
        intervalo: number;
        frecuencia: number;
    }[]
}

const Histograma: FC<HistogramaProps> = ({data}) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="intervalo" />
      <YAxis />
      <Tooltip/>
      <Legend/>
      <Bar dataKey="frecuencia" fill="#8884d8" />
    </BarChart>
  )
}

export default Histograma