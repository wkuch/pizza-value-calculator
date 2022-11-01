import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [calculationResults, setCalculationResults] = useState<number[]>([]);

  return (
    <>
      <Head>
        <title>Pizza value calculator</title>
        <meta
          name="description"
          content="Small web app to compare value of different pizza sizes. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          <span className="text-red-300">Pizza</span> value calculator
        </h1>
        <div className="mt-3 pt-3 text-center">
          {calculationResults.map((result) => {
            return <ValueCalculator />;
          })}
        </div>
        <button
          className="rounded bg-gray-800 p-2 text-white"
          onClick={() => setCalculationResults([...calculationResults, 3])}
        >
          More Pizza
        </button>
      </main>
    </>
  );
};

export default Home;

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
      setResult(result.toFixed(2) + " cm²/€ (more is better)");
    }
  };

  const [price, setPrice] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [result, setResult] = useState<string>("");

  return (
    <section className="mb-3 flex flex-row">
      <form className="basis-3/4">
        <label className="p-2">
          Price:
          <input
            className="ml-2 rounded bg-gray-200 p-2"
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
            className="ml-2 rounded bg-gray-200 p-2"
            type="text"
            value={size}
            onChange={(e) => {
              handleChange(price, e.target.value);
            }}
          />
          cm
        </label>
      </form>
      <div className="basis-1/4">Result: {result}</div>
    </section>
  );
};
