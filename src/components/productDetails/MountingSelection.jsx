import { motion } from "framer-motion";
import Bezinwazyjne from "../../assets/other/bezinwazyjne.png";
import Inwazyjne from "../../assets/other/inwazyjne.png";
import markDone from "../../assets/icons/mark-done.png"

function MountingSelection({ mountingType, setMountingType }) {

    return (
      <div className="mb-6">
        <h2 className="text-lg mb-4">Montaż</h2>
        <div className="flex gap-8 flex-wrap">
          {[
            { type: "nonInvasive", label: "Bezinwazyjny", desc: "System bez wkręcania w okno" , img: Bezinwazyjne },
            { type: "invasive", label: "Inwazyjny", desc: "System wkręcamy w ramę okienną" , img: Inwazyjne },
          ].map(({ type, label, desc, img }) => (
            <div
              key={type}
              onClick={() => setMountingType(type)}
              className={`cursor-pointer p-4 border rounded-[25px] flex-1 relative ${
                mountingType === type ? "border-[#544e4a] border-2" : "border-gray-300"
              }`}
            >
              <img src={img} alt={label} className="w-auto m-auto mb-2" />
              <p className="text-center font-bold uppercase">{label}</p>
              <p className="text-center text-xs tracking-tighter">{desc}</p>

              {mountingType === type && (
                <motion.img
                src={markDone}
                alt="Selected"
                className="absolute top-2 right-2 w-6 h-6"
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}  
              />              )}
            </div>
          ))}
        </div>
      </div>
    );
}

export default MountingSelection;