const ErrorInput = ({ errorMessage, show }) => {
  return <div className={`ErrorInput ${show && "show"}`}>{errorMessage}</div>;
};

export { ErrorInput };
