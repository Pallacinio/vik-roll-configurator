function DimensionsInput({ width, height, constraints, setWidth, setHeight, error }) {
    return (
      <div className="mb-6 relative">
        <h2 className="text-xl font-bold mb-4">Wymiary</h2>
        <div className="flex gap-4">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder={`Szerokość [${constraints.width.min}-${constraints.width.max}] mm`}
            className="p-2 border rounded-md"
            min={constraints.width.min}
            max={constraints.width.max}
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={`Wysokość [${constraints.height.min}-${constraints.height.max}] mm`}
            className="p-2 border rounded-md"
            min={constraints.height.min}
            max={constraints.height.max}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
}

export default DimensionsInput;