import React from "react";
import { useLocation, matchPath } from "react-router-dom";

function Progressbar() {
  const location = useLocation();

  // Definicja kroków z dynamicznymi ścieżkami
  const steps = [
    { path: "/products", label: "Etap 1", instrucionLabel: "Wybierz rodzaj tkaniny" },
    { path: "/products/:productId", label: "Etap 2", instrucionLabel: "Wybierz kolor tkaniny" },
    { path: "/product/details", label: "Etap 3", instrucionLabel: "Skonfiguruj swoją roletę" },
  ];

  // Logika aktywnego kroku
  const getActiveStep = () => {
    for (let i = 0; i < steps.length; i++) {
      if (matchPath(steps[i].path, location.pathname)) {
        return i + 1; // Indeksy zaczynają się od 0, więc dodajemy 1
      }
    }
    return 1; 
  };

  const activeStep = getActiveStep();

  const progressWidth = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-10/12 m-auto md:w-full my-4">
      <div className="relative flex justify-between items-center w-full rounded-full bg-white border-2 border-[#544e4a]">
        {/* Dynamiczne tło */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-[#ececec]"
          style={{ width: `${progressWidth}%` }}
        ></div>

        {/* Kroki */}
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-24 h-10 md:w-40 md:h-14 z-10 flex items-center justify-center rounded-full uppercase
                ${index + 1 === activeStep ? "bg-[#544e4a] text-white" : "bg-unsent text-white"}`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>

      <div className={`w-full flex ${
        activeStep === 1 
        ? "md:justify-start"
        :activeStep === 2
        ? "justify-center"
        : "justify-end"
      }`}>
        <div
          className={`w-full md:w-1/3 mt-4 text-lg uppercase text-[#544e4a] text-center border-b-2 border-b-[#bbb3ad] ${
            activeStep === 1
            ? "md:text-left"
            : activeStep === 2
            ? "md:text-center"
            : "md:text-right"
          }`}
          >
          {steps[activeStep - 1].instrucionLabel}
        </div>
      </div>

    </div>
  );
}

export default Progressbar;