//import { RandomNum } from "./randomNum";
const Form = ({
  submitForm,
  weightSaved,
  dollarsSaved,
  qty,
  formDefaults,
  updateTotals,
}) => {
  // console.log("Form.js", formDefaults);

  return (
    <>
      <form
        id="gear-form"
        onChange={(e) => updateTotals(e)}
        onBlur={(e) => updateTotals(e)}
        onSubmit={(e) => submitForm(e)}
      >
        <ul className="item" id="item-1">
          {/* <li>
            <label htmlFor="qty">Quanity (NOT WORKING YET)</label>
            <input
              name="qty"
              id="qty"
              type="number"
              placeholder="Quanity"
              required
              defaultValue={formDefaults.length ? formDefaults.qty : "1"}
              readOnly
            ></input>
          </li> */}
          <li>
            <label htmlFor="item_type">Category</label>
            <input
              name="Category"
              id="item_type"
              placeholder="Category"
              key={formDefaults.dynamicKey}
              defaultValue={formDefaults ? formDefaults.Category : ""}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="ci">Current Item</label>
            <input
              name="ci"
              id="ci"
              placeholder="Current Item"
              key={formDefaults ? formDefaults.ci : ""}
              defaultValue={formDefaults ? formDefaults.ci : ""}
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
              step=".01"
              key={formDefaults ? formDefaults.ciWeight : ""}
              defaultValue={formDefaults ? formDefaults.ciWeight : ""}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="ci_weight">Current Item Price</label>
            <input
              name="ciPrice"
              id="ci_price"
              type="number"
              placeholder="Current Item Price"
              key={formDefaults ? formDefaults.ciPrice : ""}
              defaultValue={formDefaults ? formDefaults.ciPrice : ""}
              step=".01"
              required
            ></input>
          </li>
          <li>
            <label htmlFor="new">New Item</label>
            <input
              name="new"
              id="new"
              key={formDefaults ? formDefaults.new : ""}
              placeholder="New Item"
              defaultValue=""
              required
            ></input>
          </li>
          <li>
            <label htmlFor="new_weight">New Item Weight (oz)</label>
            <input
              name="newWeight"
              id="new_weight"
              type="number"
              step=".01"
              key={formDefaults ? formDefaults.newWeight : ""}
              placeholder="New Item Weight (oz)"
              required
            ></input>
          </li>
          <li>
            <label htmlFor="new_cost">New Item Cost</label>
            <input
              name="newCost"
              id="new_cost"
              type="number"
              key={formDefaults ? formDefaults.newCost : ""}
              placeholder="New Item Cost"
              required
            ></input>
          </li>
          <li>
            {(weightSaved > 0) & (dollarsSaved > 0) ? (
              <div className="results">
                <strong>This Item:</strong>
                <ul>
                  <li>{weightSaved}oz Saved</li>
                  <li>&#36;{dollarsSaved} Per oz Saved</li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </li>
          <li>
            <input
              type="hidden"
              name="weightSaved"
              key={formDefaults ? formDefaults.weightSaved : ""}
              value={weightSaved}
            ></input>
            <input
              type="hidden"
              name="dollarsSaved"
              key={formDefaults ? formDefaults.dollarsSaved : ""}
              value={dollarsSaved}
            ></input>
            <input type="submit" value="Add Item"></input>
          </li>
        </ul>
      </form>
    </>
  );
};

export default Form;
