import { RowData } from "../types/RowData";
  
export const calcularRango = (data: RowData[]):number => {
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
  
export const calcularVarianza = (data: RowData[]):number => {
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
  
export const calcularDesviacion = (data: RowData[]):number => {
    return Math.sqrt(calcularVarianza(data));
}