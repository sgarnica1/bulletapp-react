import React from "react";

// IMG
import BirthdayCake from "../../assets/img/birthday-cake.png";

const BirthdayCelebrationWidget = ({ user }) => {
  const user2 = {
    first_name: "Sergio",
  };
  return (
    <article className="BirthdayCelebrationWidget">
      <div className="BirthdayCelebrationWidget__info">
        <h2 className="BirthdayCelebrationWidget__title">¡Feliz Cumpleaños!</h2>
        <p className="BirthdayCelebrationWidget__description">
          Toda la familia Bullet te desea el mejor de los cumpleaños
          {user2.first_name}.
        </p>
        {/* <p className="BirthdayCelebrationWidget__extra">
          No olvides pasar a la recepción por tus burpees de regalo.
        </p> */}
      </div>
      <img
        src={BirthdayCake}
        alt="Birthday Cake Drawing"
        className="BirthdayCelebrationWidget__img"
      />
    </article>
  );
};

export { BirthdayCelebrationWidget };
