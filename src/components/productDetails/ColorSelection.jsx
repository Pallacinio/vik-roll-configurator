function ColorSelection({ title, colors, selectedColor, setSelectedColor }) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`cursor-pointer border p-2 rounded-lg ${
                selectedColor === color ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img src={color.imageColor} alt={color.name} className="w-16 h-auto" />
              <p className="text-center">{color.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ColorSelection;