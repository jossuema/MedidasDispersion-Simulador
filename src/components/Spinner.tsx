import React, { useState } from 'react';

/**
 * Propiedades del componente Spinner.
 */
interface SpinnerProps {
  /**
   * El valor inicial del spinner.
   */
  initialValue?: number;
  /**
   * El valor mínimo permitido para el spinner.
   */
  min?: number;
  /**
   * El valor máximo permitido para el spinner.
   */
  max?: number;
  /**
   * El valor de incremento/decremento del spinner.
   */
  step?: number;
  /**
   * Callback function que se llama cuando el valor del spinner cambia.
   * @param value - El nuevo valor del spinner.
   */
  onChange: (value: number) => void;
};

/**
 * El componente Spinner que permite incrementar o decrementar un valor numérico.
 *
 * @component
 * @param {SpinnerProps} props - Las propiedades del componente Spinner.
 * @param {number} props.initialValue - El valor inicial del spinner. Default is 0.
 * @param {number} props.min - El valor mínimo del spinner. Default is Number.MIN_SAFE_INTEGER.
 * @param {number} props.max - El valor máximo del spinner. Default is Number.MAX_SAFE_INTEGER.
 * @param {number} props.step - El valor de incremento/decremento del spinner. Default is 1.
 * @param {(num: number) => void} props.onChange - La función callback que se llama cuando el valor del spinner cambia.
 * @returns {JSX.Element} El componente Spinner.
 */
const Spinner: React.FC<SpinnerProps> = ({
    initialValue = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  /**
   * Actualiza el valor del spinner y llama a la función callback onChange.
   * @param {number} num - El nuevo valor del spinner.
   * @returns {void}
   */
  const handleChange = (num: number) => {
    if (num >= min && num <= max) {
      setValue(num);
      onChange(num);
    }
  };

  return (
    <div className="mx-4 flex flex-row items-center justify-center">
       <button
        onClick={() => handleChange(value - step)}
        className="px-3 py-1 text-lg border-2 border-gray-200 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 h-8 text-white focus:text-black transform transition duration-500"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-16 text-center border-2 border-gray-200 h-8"
        min={min}
        max={max}
        step={step}
      />
      <button
        onClick={() => handleChange(value + step)}
        className="px-1 py-1 text-lg border-2 border-gray-200 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 h-8 text-white focus:text-black transform transition duration-500"
      >
        +
      </button>
    </div>
  );
};

export default Spinner;
