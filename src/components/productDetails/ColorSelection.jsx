function ColorSelection({ title, colors, selectedColor, setSelectedColor }) {
    return (
      <div className="mb-6">
        <h2 className="text-lg mb-4">{title}</h2>
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`cursor-pointer border-2 p-2 rounded-[25px] ${
                selectedColor === color ? "border-[#544e4a] border-2" : "border-[#e9e9e9]"
              }`}
            >
              <img src={color.imageColor} alt={color.name} className="w-16 h-auto m-auto" />
              <p className="text-center">{color.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ColorSelection;