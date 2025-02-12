function DimensionsInput({ width, height, constraints, setWidth, setHeight, error }) {
    return (
      <div className="mb-6 relative">
        <div className="flex gap-4">
          <div className="w-1/2">
              <h2 className="text-lg mb-4">Szerokość [mm]:</h2>
              <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              // placeholder={`Szerokość [${constraints.width.min}-${constraints.width.max}] mm`}
              className="w-full p-4 border rounded-[50px] text-[#544e4a] bg-[#e9e9e9] outline-none"
              min={constraints.width.min}
              max={constraints.width.max}
              />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg mb-4">Wysokość [mm]:</h2>
            <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            // placeholder={`Wysokość [${constraints.height.min}-${constraints.height.max}] mm`}
            className="w-full p-4 border rounded-[50px] text-[#544e4a] bg-[#e9e9e9] outline-none"
            min={constraints.height.min}
            max={constraints.height.max}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
}

export default DimensionsInput;