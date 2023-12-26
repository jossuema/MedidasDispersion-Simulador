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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="mx-4 items-center justify-center">
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-16 text-center border-2 border-gray-200 rounded"
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default Spinner;
