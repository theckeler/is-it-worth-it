import React, { useEffect, useState } from "react";
import "./App.min.css";

const App = () => {
  const [ciWeight, setCiWeight] = useState(0);
  const [newWeight, setNewWeight] = useState(0);
  const [newCost, setNewCost] = useState(0);

  const [weightSaved, setWeightSaved] = useState(0);
  const [dollarsSaved, setDollarsSaved] = useState(0);

  const [totalCost, setTotalCost] = useState(0);
  const [totalWS, setTotalWS] = useState(0);
  const [totalDollars, setTotalDollars] = useState(0);

  const [backpack, setBackpack] = useState([]);

  useEffect(() => {
    let weightPerOz = 0;
    let weightCal = 0;

    if ((ciWeight > 0) & (newWeight > 0)) {
      weightCal = ciWeight - newWeight;
      setWeightSaved(parseFloat(weightCal).toFixed(2));
    }

    if ((ciWeight > 0) & (newCost > 0)) {
      weightPerOz = parseFloat(newCost / newWeight).toFixed(2);
      setDollarsSaved(weightPerOz);
    }
  }, [ciWeight, newWeight, newCost]);

  const submitForm = (form) => {
    form.preventDefault();
    let item = {};

    const formInput = document.querySelectorAll("input:not(.total)");
    formInput.forEach((input) => {
      if (input.value) {
        item[input.name] = input.value;
      }
    });

    let gears = [item];
    setBackpack((prevState) => [...prevState, ...gears]);

    //document.cookie = "Waiting";
  };

  const handleClick = (i) => {
    const spliceMe = [...backpack];
    spliceMe.splice(i, 1);
    setBackpack(spliceMe);
  };

  useEffect(() => {
    //console.log("backpack", backpack);
    let totalCost = 0,
      totalWeight = 0,
      totalDollars = 0;

    backpack.forEach((gear) => {
      totalCost = Number(totalCost) + Number(gear.newCost);
      totalWeight = Number(totalWeight) + Number(gear.weightSaved);
      totalDollars = Number(totalDollars) + Number(gear.dollarsSaved);
    });

    setTotalCost(totalCost);
    setTotalWS(totalWeight);
    setTotalDollars(parseFloat(totalDollars).toFixed(2));
  }, [backpack]);

  return (
    <>
      <header>
        <h1>Backpacking Gear Upgrades:</h1>
      </header>

      <main>
        <form id="gear-form" onSubmit={(e) => submitForm(e)}>
          <ul className="item" id="item-1">
            <li>
              <label htmlFor="item_type">Item Type</label>
              <input
                name="itemType"
                id="item_type"
                placeholder="Item Type"
                required
              ></input>
            </li>
            <li>
              <label htmlFor="ci">Current Item</label>
              <input
                name="ci"
                id="ci"
                placeholder="Current Item"
                required
              ></input>
            </li>
            <li>
              <label htmlFor="ci_weight">Current Item Weight (oz)</label>
              <input
                name="ciWeight"
                id="ci_weight"
                type="number"
                placeholder="Current Item Weight (oz)"
                onChange={(e) => setCiWeight(e.target.value)}
                step=".01"
                required
              ></input>
            </li>
            <li>
              <label htmlFor="new">New Item</label>
              <input name="new" id="new" placeholder="New Item"></input>
            </li>
            <li>
              <label htmlFor="new_weight">New Item Weight (oz)</label>
              <input
                name="newWeight"
                id="new_weight"
                type="number"
                step=".01"
                placeholder="New Item Weight (oz)"
                required
                onChange={(e) => setNewWeight(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="new_cost">New Item Cost</label>
              <input
                name="newCost"
                id="new_cost"
                type="number"
                placeholder="New Item Cost"
                required
                onChange={(e) => setNewCost(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                type="hidden"
                name="weightSaved"
                value={weightSaved}
              ></input>
              <input
                type="hidden"
                name="dollarsSaved"
                value={dollarsSaved}
              ></input>
              <button>Add</button>
            </li>
          </ul>
        </form>

        <div className="totaled">
          <ul className="totaled-list" id="totaledList">
            <li>
              <ul className="row top">
                <li>Item Type</li>
                <li>Current Item</li>
                <li>Current Item Weight</li>
                <li>New Item</li>
                <li>New Weight</li>
                <li>New Cost</li>
                <li>Weight Saved</li>
                <li>Dollars Per Saved</li>
                <li></li>
              </ul>
            </li>
            {backpack.map((gear, i) => {
              return (
                <li
                  key={Math.floor(100000000 + Math.random() * 900000000)}
                  id={`row-${i}`}
                >
                  <button onClick={(e) => handleClick(i)}>&#x2715;</button>
                  <ul className="row">
                    <li>
                      <strong>{gear.itemType}</strong>
                    </li>
                    <li>{gear.ci}</li>
                    <li>{gear.ciWeight}</li>
                    <li>{gear.new}</li>
                    <li>{gear.newWeight}oz</li>
                    <li>${gear.newCost}</li>
                    <li>{gear.weightSaved}oz</li>
                    <li>{gear.dollarsSaved}oz</li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <footer>
        {(weightSaved > 0) & (dollarsSaved > 0) ? (
          <div className="results">
            <ul>
              <li>Item: {weightSaved}oz Saved</li>
              <li>Item: &#36;{dollarsSaved} Per oz Saved</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        {(totalCost > 0) & (totalWS > 0) & (totalDollars > 0) ? (
          <div className="totals" id="total">
            <ul>
              <li>Total &#36;{totalCost}</li>
              <li>Saved {totalWS}oz</li>
              <li>&#36;{totalDollars} Per oz</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </footer>
    </>
  );
};

export default App;
