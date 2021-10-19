import React, { useEffect, useState } from "react";
import Totaled from "./components/Totaled";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Lighterpack from "./components/Lighterpack";
import CSVReader from "react-csv-reader";
//import { RandomNum } from "./components/randomNum";

import "./App.min.css";

const App = () => {
  const [qty, setQTY] = useState(1);

  const [weightSaved, setWeightSaved] = useState(0);
  const [dollarsSaved, setDollarsSaved] = useState(0);

  const [totalCost, setTotalCost] = useState(0);
  const [totalWS, setTotalWS] = useState(0);
  const [totalDollars, setTotalDollars] = useState(0);

  const [backpack, setBackpack] = useState([]);
  const [lighterpack, setLighterpack] = useState([]);

  const [formToggle, setFormToggle] = useState(true);
  const [formDefaults, setFormDeaults] = useState([]);
  const [formInputs, setFormInputs] = useState([]);

  const updateTotals = (e) => {
    //console.log("updateTotals");
    let formValues = {};
    document
      .querySelector("#gear-form")
      .querySelectorAll("input")
      .forEach(function (element, i) {
        formValues[element.name] = element.value;
      });
    setFormInputs(formValues);
  };

  useEffect(() => {
    if ((formInputs.ciWeight > 0) & (formInputs.newWeight > 0)) {
      setWeightSaved(
        parseFloat(formInputs.ciWeight - formInputs.newWeight).toFixed(2)
      );
    }

    if ((formInputs.ciWeight > 0) & (formInputs.newCost > 0)) {
      setDollarsSaved(
        parseFloat(formInputs.newCost / formInputs.newWeight).toFixed(2)
      );
    }
  }, [formInputs]);

  const submitForm = (form) => {
    // console.log("submitForm");
    form.preventDefault();
    setFormDeaults([]);
    setWeightSaved(0);
    setDollarsSaved(0);
    let item = {};
    const formInput = document.querySelectorAll("input:not(.total)");
    formInput.forEach((input) => {
      if (input.value) {
        item[input.name] = input.value;
      }
    });
    let gears = [item];
    setBackpack((prevState) => [...prevState, ...gears]);
    document.querySelector("#gear-form").reset();

    //document.cookie = "Waiting";
  };

  useEffect(() => {
    //console.log("useEffect formDefaults", formDefaults);
    if (formDefaults.ci) {
      setWeightSaved(0);
      setDollarsSaved(0);
      setFormToggle(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [formDefaults]);

  useEffect(() => {
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

  const importCSV = (gear, fileInfo, originalFile) => {
    gear.splice(0, 1);
    let newGear = gear.map(function (item, i) {
      let newObject = {};
      newObject["Category"] = item[1];
      newObject["ci"] = item[0];
      newObject["ciWeight"] = item[4];
      newObject["ciPrice"] = item[7];
      newObject["qty"] = item[3] > 0 ? item[3] : "1";
      newObject["unit"] = item[5];
      return newObject;
    });
    setFormToggle(false);
    setLighterpack(newGear);
  };

  // console.log(backpack);
  return (
    <>
      <header>
        <h1>Backpacking Gear Upgrades:</h1>
        <ul className="buttons">
          <li>
            {lighterpack.length ? (
              ""
            ) : (
              <CSVReader
                label="Upload Lighterpack CSV"
                onFileLoaded={(data, fileInfo, originalFile) =>
                  importCSV(data, fileInfo, originalFile)
                }
              />
            )}
          </li>
          <li>
            {backpack.length ? (
              <button
                onClick={(e) => {
                  setFormToggle(!formToggle);
                }}
              >
                {`${formToggle ? "Close" : "Open"} Form`}
              </button>
            ) : (
              ""
            )}
          </li>
        </ul>
      </header>

      <main>
        <section className="section-1">
          {formToggle ? (
            <>
              <h2>Add Gear</h2>
              <Form
                qty={qty}
                weightSaved={weightSaved}
                dollarsSaved={dollarsSaved}
                formDefaults={formDefaults}
                submitForm={submitForm}
                updateTotals={updateTotals}
              />
            </>
          ) : (
            ""
          )}

          <div className="totaled">
            <ul className="list">
              <Totaled
                backpack={backpack}
                setBackpack={setBackpack}
                setQTY={setQTY}
              />
            </ul>
          </div>
        </section>

        <section className="section-2">
          {lighterpack.length ? (
            <>
              <h2>Your Lighterpack Items:</h2>
              <div className="lighterpack">
                <ul className="list">
                  <Lighterpack
                    lighterpack={lighterpack}
                    setLighterpack={setLighterpack}
                    setFormToggle={setFormToggle}
                    setFormDeaults={setFormDeaults}
                  />
                </ul>
              </div>
            </>
          ) : (
            ""
          )}
        </section>
      </main>

      <footer>
        <Footer
          weightSaved={weightSaved}
          dollarsSaved={dollarsSaved}
          totalCost={totalCost}
          totalWS={totalWS}
          totalDollars={totalDollars}
          formToggle={formToggle}
        />
      </footer>
    </>
  );
};

export default App;
