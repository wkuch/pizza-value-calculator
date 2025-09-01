"use client";

import { useState } from "react";

export default function Home() {
  const [calculationResults, setCalculationResults] = useState<number[]>([0]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-5 text-center text-5xl font-extrabold leading-normal text-gray-800 md:text-[5rem]">
          <span className="text-red-300">Pizza</span> value calculator
        </h1>
        <h2 className="text-1xl mb-3 text-center leading-normal text-gray-600 md:text-[1.5rem]">
          Calculate how much pizza you get for your money
        </h2>
        {calculationResults.map((i: number) => {
          return <ValueCalculator key={i} />;
        })}
        <button
          className="rounded bg-gray-800 p-2 text-white"
          onClick={() => setCalculationResults([...calculationResults, 1])}
        >
          More calculations
        </button>
      </main>
  );
}

const ValueCalculator = () => {
  const pi = 3.14159265359;
  const handleChange = (price: string, size: string) => {
    price = price.replace(",", ".");
    size = size.replace(",", ".");
    setPrice(price);
    setSize(size);
    let result = 0;

    result = (pi * (Number(size) / 2) ** 2) / Number(price);
    if (isNaN(result)) {
      setResult("Please enter only numbers");
    } else {
      setResult(result.toFixed(2));
    }
  };

  const [price, setPrice] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [result, setResult] = useState<string>("");

  return (
    <div className="mb-3 flex w-full flex-row items-center justify-center md:w-3/4 lg:w-1/2">
      <form className="flex basis-1/2 flex-row">
        <label className="p-2">
          Price:
          <input
            className="ml-2 w-12 rounded-lg border border-gray-200 bg-gray-100 p-2"
            placeholder=""
            type="text"
            value={price}
            onChange={(e) => {
              handleChange(e.target.value, size);
            }}
          />
          €
        </label>
        <label className="p-2">
          Size:
          <input
            className="ml-2 w-12 rounded-lg border border-gray-200 bg-gray-100 p-2"
            type="text"
            value={size}
            onChange={(e) => {
              handleChange(price, e.target.value);
            }}
          />
          cm
        </label>
      </form>
      <div className="flex grow basis-1/2 flex-row">
        <div>Result in cm²/€ (more is better): </div>
        <div className="ml-2 w-12 border-b">{result}</div>
      </div>
    </div>
  );
};