import Bezinwazyjne from "../../assets/other/bezinwazyjne.png";
import Inwazyjne from "../../assets/other/inwazyjne.png";

function MountingSelection({ mountingType, setMountingType }) {

    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Montaż</h2>
        <div className="flex gap-8 flex-wrap">
          {[
            { type: "nonInvasive", label: "Bezinwazyjny", img: Bezinwazyjne },
            { type: "invasive", label: "Inwazyjny", img: Inwazyjne },
          ].map(({ type, label, img }) => (
            <div
              key={type}
              onClick={() => setMountingType(type)}
              className={`cursor-pointer p-4 border rounded-lg ${
                mountingType === type ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img src={img} alt={label} className="w-auto m-auto mb-2" />
              <p className="text-center font-bold uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default MountingSelection;