import GearRow from "./gearRow";
import { RandomNum } from "./randomNum";

const Totaled = ({ backpack, setBackpack, setQTY }) => {
  const handleClick = (i) => {
    const spliceMe = [...backpack];
    spliceMe.splice(i, 1);
    setBackpack(spliceMe);
  };

  return (
    <>
      {backpack.map((gear, i) => {
        return (
          <li key={RandomNum()} id={`row-${i}`}>
            <span className="row row-1">
              <button className="square" onMouseDown={(e) => handleClick(i)}>
                &#x2715;
              </button>
            </span>
            <GearRow gear={gear} setQTY={setQTY} />
          </li>
        );
      })}
    </>
  );
};

export default Totaled;
