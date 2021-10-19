const GearRow = ({ gear, setQTY, removeNewGear }) => {
  return (
    <>
      <ul className="row row-2">
        <li>
          <strong>{gear.Category}</strong>
        </li>
        {/* <li>
          <label>Quanity</label>
          <input
            name="qty"
            id="qty"
            type="number"
            placeholder="Quanity"
            required
            defaultValue={gear.qty}
            disabled
            onChange={(e) => setQTY(e.target.value)}
          ></input>
        </li> */}
        <li>
          <strong>Current Gear</strong>
          <ul className="columns">
            <li>{gear.ci}</li>
            <li>{gear.ciWeight}oz</li>
            <li>&#36;{gear.ciPrice}</li>
          </ul>
        </li>
        {!removeNewGear ? (
          <>
            <li>
              <strong>New Gear</strong>
              <ul className="columns">
                <li>{gear.new}</li>
                <li>{gear.newWeight}oz</li>
                <li>&#36;{gear.newCost}</li>
              </ul>
            </li>
            <li className="saved">
              <strong>Weight Saved:</strong> {gear.weightSaved}oz
            </li>
            <li>
              <strong>Cash Saved:</strong> &#36;{gear.dollarsSaved}
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </>
  );
};

export default GearRow;
