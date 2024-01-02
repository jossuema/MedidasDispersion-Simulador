import { RowData } from "../types/RowData";
  
/**
 * Calcula el rango de un conjunto de datos.
 * 
 * @param data - El array de objetos RowData.
 * @returns El rango.
 */
export const calcularRango = (data: RowData[]): number => {
    return numeroMayor(data) - numeroMenor(data);
}
  
/**
 * Encuentra el número más pequeño en un array de objetos RowData mediante el rango de inicio.
 * @param data - El array de objetos RowData.
 * @returns El número más pequeño.
 */
const numeroMenor = (data: RowData[]): number => {
    let menor = Number(data[0].intervaloInicio);
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (Number(row.intervaloInicio) < menor) {
            menor = Number(row.intervaloInicio);
        }
    }
    return menor;
}
  
/**
 * Encuentra el número más grande en un array de objetos RowData mediante el rango de fin.
 * 
 * @param data - El array de objetos RowData.
 * @returns El número más grande.
 */
const numeroMayor = (data: RowData[]): number => {
    let mayor = Number(data[0].intervaloFin);
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (Number(row.intervaloFin) > mayor) {
            mayor = Number(row.intervaloFin);
        }
    }
    return mayor;
}
  
/**
 * Calcula la varianza de un conjunto de datos.
 * 
 * @param data - El array de objetos RowData.
 * @returns La varianza.
 */
export const calcularVarianza = (data: RowData[]): number => {
    let suma = 0.0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const xi = ((Number(row.intervaloInicio) + Number(row.intervaloFin))/2.0);
        const fi = Number(row.frecuencia);
        suma += xi * fi;
    }
    let n = 0.0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        n += Number(row.frecuencia);
    }
    const u = suma / n;
    suma = 0.0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const xi = ((Number(row.intervaloInicio) + Number(row.intervaloFin))/2.0);
        suma += (Math.pow((xi - u), 2)) * Number(row.frecuencia); 
    }
    return suma / n - 1;
}
  
/**
 * Calcula la desviación estándar de un conjunto de datos.
 * 
 * @param data un array de objetos RowData.
 * @returns la desviación estándar.
 */
export const calcularDesviacion = (data: RowData[]): number => {
    return Math.sqrt(calcularVarianza(data));
}