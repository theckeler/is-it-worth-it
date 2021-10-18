const Footer = ({
  weightSaved,
  dollarsSaved,
  totalCost,
  totalWS,
  totalDollars,
  formToggle,
}) => {
  return (
    <>
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
    </>
  );
};

export default Footer;
