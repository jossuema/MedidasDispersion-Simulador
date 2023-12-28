import React, { useState } from 'react';

interface SpinnerProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

const Spinner: React.FC<SpinnerProps> = ({
    initialValue = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    onChange,
}) => {
  const [value, setValue] = useState(initialValue);

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
