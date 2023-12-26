import Spinner from "./components/Spinner"
import  Table  from "./components/Table"
import { useState } from "react"
import Histograma from "./components/Histograma"


interface RowData {
  id: number;
  field1: string;
  field2: string;
  field3: string;
}

const arrayHistograma = (data: RowData[]) => {
  return data.map(row => {
    return {
      "intervalo": ((Number(row.field2) - Number(row.field1))/2.0),
      "frecuencia": Number(row.field3)
    }
  })
}

function App() {
  const [rows, setRows] = useState<number>(5);
  const [data, setData] = useState<RowData[]>([]);
  const [infoHistograma, setInfoHistograma] = useState<{intervalo: number;frecuencia: number}[]>([]);

  const Graficar = () => {
    event?.preventDefault();
    if (validateData()) {
      const info = arrayHistograma(data);
      setInfoHistograma(info);
      console.log(info);
    }
  }

  const validateData = () => {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (isNaN(Number(row.field1)) || isNaN(Number(row.field2)) || isNaN(Number(row.field3))) {
        alert('Todos los campos deben ser números');
        return false;
      }
      if (Number(row.field1) >= Number(row.field2)) {
        alert('Los intervalos 1 deben ser menor que los intervalos 2');
        return false;
      }
      if (i > 0 && Number(data[i - 1].field2) !== Number(row.field1)) {
        alert('El intervalo final de una fila previa debe ser igual al inicio del intervalo de la siguiente fila');
        return false;
      }
    }
    return true;
  }

  return (
    <div className="bg-black h-screen flex flex-row">
      <div className="bg-slate-800 w-1/3 h-screen flex flex-col justify-between">
        <div className="h-1/6 bg-green-700 flex justify-center items-center">
          <h1 className="text-7xl font-medium text-white">SIMULADOR</h1>
        </div>
        <div className=" bg-slate-900 flex flex- p-4 mb-auto">
          <label className="text-white text-2xl">Seleccione el numero de rangos</label>
          <Spinner initialValue={rows} min={0} max={8} step={1} onChange={setRows}/>
        </div>
        <Table rowsNumber={Array.from({ length: rows }, (_, index) => index + 1)} onData={setData}/>
        <div>
          <button onClick={Graficar} className="bg-green-700 text-white text-2xl font-medium w-full h-20 mt-auto">Graficar</button>
        </div>
      </div>
      <div className="bg-slate-900 w-1/3 h-screen">
        {(infoHistograma.length > 0) && <Histograma data={infoHistograma}/>}
      </div>
      <div className="bg-slate-800 w-1/3 h-screen flex flex-col">
        <div className="h-1/6 bg-green-700 flex justify-center items-center">
          <h1 className="text-7xl font-medium text-white">ESTADO</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
            <label className="text-white text-2xl">Rango:</label>
            <label className="text-white text-2xl">Varianza:</label>
            <label className="text-white text-2xl">Desviacion:</label>
          </div>
      </div>
    </div>
  )
}



export default App
