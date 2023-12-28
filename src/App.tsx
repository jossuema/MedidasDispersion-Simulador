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
      "intervalo": ((Number(row.field2) + Number(row.field1))/2.0),
      "frecuencia": Number(row.field3)
    }
  })
}

const calcularRango = (data: RowData[]):number => {
  return numeroMayor(data) - numeroMenor(data);
}

const numeroMenor = (data: RowData[]):number => {
  let menor = Number(data[0].field1);
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (Number(row.field1) < menor) {
      menor = Number(row.field1);
    }
  }
  return menor;
}

const numeroMayor = (data: RowData[]):number => {
  let mayor = Number(data[0].field2);
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (Number(row.field2) > mayor) {
      mayor = Number(row.field2);
    }
  }
  return mayor;
}

const calcularVarianza = (data: RowData[]):number => {
  let suma = 0.0;
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const xi = ((Number(row.field1) + Number(row.field2))/2.0);
    const fi = Number(row.field3);
    suma += xi * fi;
  }
  let n = 0.0;
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    n += Number(row.field3);
  }
  const u = suma / n;
  suma = 0.0;
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const xi = ((Number(row.field1) + Number(row.field2))/2.0);
    suma += (Math.pow((xi - u), 2)) * Number(row.field3); 
  }
  return suma / n - 1;
}

const calcularDesviacion = (data: RowData[]):number => {
  return Math.sqrt(calcularVarianza(data));
}

function App() {
  const [rows, setRows] = useState<number>(5);
  const [data, setData] = useState<RowData[]>([]);
  const [infoHistograma, setInfoHistograma] = useState<{intervalo: number;frecuencia: number}[]>([]);
  const [rango, setRango] = useState<number>();
  const [varianza, setVarianza] = useState<number>();
  const [desviacion, setDesviacion] = useState<number>();

  const Graficar = () => {
    event?.preventDefault();
    if (validateData()) {
      const info = arrayHistograma(data);
      setInfoHistograma(info);
      setRango(calcularRango(data));
      setVarianza(calcularVarianza(data));
      setDesviacion(calcularDesviacion(data));
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
    <div className="bg-black md:h-screen flex flex-col md:flex-row">
      <div className="bg-slate-800 md:w-1/3 md:h-screen flex flex-col justify-between">
        <div className="h-1/6 bg-green-700 flex justify-center items-center">
          <h1 className="text-6xl font-medium text-white">SIMULADOR</h1>
        </div>
        <div className=" bg-slate-900 flex flex- p-4 mb-auto">
          <label className="text-white text-2xl">Seleccione el numero de rangos</label>
          <Spinner initialValue={rows} min={0} max={8} step={1} onChange={setRows}/>
        </div>
        <Table rowsNumber={Array.from({ length: rows }, (_, index) => index + 1)} onData={setData}/>
        <div className="pb-5 md:pb-0"> 
          <button onClick={Graficar} className="bg-green-700 text-white text-2xl font-medium w-full h-20 mt-auto">Graficar</button>
        </div>
      </div>
      <div className="bg-slate-900 md:w-1/3 md:h-screen justify-center items-center flex">
        {(infoHistograma.length > 0) && <Histograma data={infoHistograma}/>}
      </div>
      <div className="bg-slate-800 md:w-1/3 md:h-screen flex flex-col">
        <div className="h-1/6 bg-green-700 flex justify-center items-center">
          <h1 className="text-7xl font-medium text-white">ESTADO</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
            <label className="text-white text-2xl">Rango: {rango}</label>
            <label className="text-white text-2xl">Varianza: {varianza}</label>
            <label className="text-white text-2xl">Desviacion: {desviacion}</label>
          </div>
      </div>
    </div>
  )
}



export default App
