import GearRow from "./GearRow";
import { RandomNum } from "./RandomNum";

const Lighterpack = ({ lighterpack, setFormDeaults }) => {
  const handleClick = (defaults) => {
    //console.log("Lighterpack handleClick");
    defaults["dynamicKey"] = RandomNum();
    setFormDeaults(defaults);
  };

  return (
    <>
      {lighterpack.length > 0
        ? lighterpack.map((gear, i) => {
            return (
              <li key={RandomNum()}>
                <span className="row row-1">
                  <button
                    className="add square"
                    onMouseDown={(e) => handleClick(lighterpack[i])}
                  >
                    &#43;
                  </button>
                </span>
                <GearRow gear={gear} removeNewGear="1" setQTY="" />
              </li>
            );
          })
        : ""}
    </>
  );
};

export default Lighterpack;
