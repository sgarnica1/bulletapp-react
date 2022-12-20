function EmptyAthleteRow({ message }) {
  return (
    <div className="EmptyAthleteRow AthletesList__athlete ">
      <span className="EmptyAthleteRow__icon"></span>
      {message}
    </div>
  );
}

export { EmptyAthleteRow };
