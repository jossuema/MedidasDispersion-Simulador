import {FC} from 'react'
import { PieChart, Pie } from 'recharts';


type PastelProps = {
    data: {
        intervalo: number;
        frecuencia: number;
    }[]
}

const Pastel:FC<PastelProps> = ({data}) => {
  return (
    <PieChart width={730} height={250}>
        <Pie data={data} dataKey="frecuencia" nameKey="intervalo" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
    </PieChart>
  )
}

export default Pastel