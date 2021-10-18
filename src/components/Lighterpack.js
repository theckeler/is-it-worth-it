import GearRow from "./gearRow";
import { RandomNum } from "./randomNum";

const Lighterpack = ({ lighterpack, setFormDeaults }) => {
  const handleClick = (defaults) => {
    console.log("Lighterpack handleClick");
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
                <GearRow gear={gear} setQTY="" />
              </li>
            );
          })
        : ""}
    </>
  );
};

export default Lighterpack;
