"use client";

import { useState } from "react";
import BackgroundFX from "./components/BackgroundFX";

export default function Home() {
  const [calculationResults, setCalculationResults] = useState<number[]>([0]);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center px-6 py-16">
      <BackgroundFX />
      <section className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur-md">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "rgb(var(--accent-1))" }} />
          <span className="opacity-80">Instant pizza value insights</span>
        </div>
        <h1 className="mt-4 text-balance bg-gradient-to-br from-red-300 via-pink-200 to-amber-200 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
          Pizza value calculator
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-base opacity-80 md:text-lg">
          Calculate how much pizza you get for your money.
        </p>
      </section>

      <div className="glass-card w-full rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-md md:p-6">
        <div className="flex flex-col gap-4">
          {calculationResults.map((id: number, idx: number) => {
            return <ValueCalculator key={id} index={idx + 1} />;
          })}
          <div className="mt-2 flex justify-center">
            <button
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-red-400 via-fuchsia-500 to-indigo-500 px-4 py-2 text-white shadow-lg transition active:scale-[0.98]"
              onClick={() => setCalculationResults([...calculationResults, Date.now()])}
            >
              <span className="i-ph-plus-bold transition-transform group-active:scale-90" aria-hidden />
              More calculations
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-xs opacity-60">cm² per € — more is better</footer>
    </main>
  );
}

const ValueCalculator = ({ index }: { index: number }) => {
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
    <section className="rounded-2xl border border-white/12 bg-white/5 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-fuchsia-500 px-2 text-xs font-semibold text-white">
            {index}
          </span>
          <span className="text-sm opacity-80">Calculation</span>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center">
        <form className="flex flex-1 flex-col gap-3 md:flex-row">
          <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
            <span className="text-sm opacity-70">Price</span>
            <div className="relative inline-flex items-center">
              <input
                className="w-24 bg-transparent px-2 text-base outline-none placeholder:opacity-40"
                placeholder=""
                inputMode="decimal"
                type="text"
                value={price}
                onChange={(e) => {
                  handleChange(e.target.value, size);
                }}
                aria-label="Price in euros"
                aria-describedby="price-help"
              />
              <span className="pointer-events-none select-none opacity-60">€</span>
            </div>
          </label>
          <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
            <span className="text-sm opacity-70">Size</span>
            <div className="relative inline-flex items-center">
              <input
                className="w-24 bg-transparent px-2 text-base outline-none placeholder:opacity-40"
                inputMode="decimal"
                type="text"
                value={size}
                onChange={(e) => {
                  handleChange(price, e.target.value);
                }}
                aria-label="Diameter in centimeters"
                aria-describedby="size-help"
              />
              <span className="pointer-events-none select-none opacity-60">cm</span>
            </div>
          </label>
        </form>
        <div className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
          <div className="text-sm opacity-70">Result (cm²/€)</div>
          <output className="min-w-24 text-right text-xl font-semibold tracking-tight">
            {result}
          </output>
        </div>
        <p id="price-help" className="sr-only">Enter price in euros, supports comma or dot.</p>
        <p id="size-help" className="sr-only">Enter pizza diameter in centimeters.</p>
      </div>
    </section>
  );
};